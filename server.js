require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const helmet = require('helmet');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_ROUTE = process.env.ADMIN_ROUTE || 'hidden-admin-route';

app.use(helmet());
app.use(express.json());

app.use(session({
  name: 'mi_sid',
  secret: process.env.SESSION_SECRET || 'change-this-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false, // set true when using HTTPS
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 // 1 hour
  }
}));

// Protect admin files from static serving. Serve other static files normally.
const publicRoot = path.join(__dirname);
app.use((req, res, next) => {
  if (req.path.startsWith('/admin')) return next();
  express.static(publicRoot)(req, res, next);
});

// Helper: check authenticated
function requireAuth(req, res, next) {
  if (req.session && req.session.authenticated) return next();
  return res.status(401).json({ error: 'Unauthorized' });
}

// API: public archive
const archivePath = path.join(__dirname, 'data', 'archive.json');
app.get('/api/archive', (req, res) => {
  fs.readFile(archivePath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read archive' });
    try {
      const json = JSON.parse(data);
      res.json(json);
    } catch (e) {
      res.status(500).json({ error: 'Invalid archive data' });
    }
  });
});

// Admin login endpoint (client must access the hidden admin URL to reach login page)
app.post('/api/admin/login', async (req, res) => {
  const { password } = req.body || {};
  if (!password) return res.status(400).json({ error: 'Password required' });
  try {
    const hash = process.env.ADMIN_PASSWORD_HASH;
    if (!hash) return res.status(500).json({ error: 'Server not configured' });
    const ok = await bcrypt.compare(password, hash);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
    req.session.authenticated = true;
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// Update archive (authenticated)
app.post('/api/admin/archive', requireAuth, (req, res) => {
  const data = req.body;
  if (!data) return res.status(400).json({ error: 'No data' });
  try {
    // If GITHUB_REPO and GITHUB_PAT are provided, dispatch to GitHub Actions
    const githubRepo = process.env.GITHUB_REPO; // owner/repo
    const githubPat = process.env.GITHUB_PAT;
    if (githubRepo && githubPat) {
      // send repository_dispatch with payload
      const payload = { archive: data };
      const [owner, repo] = githubRepo.split('/');
      const url = `https://api.github.com/repos/${owner}/${repo}/dispatches`;
      const body = JSON.stringify({ event_type: 'update-archive', client_payload: payload });
      const https = require('https');
      const options = {
        method: 'POST',
        headers: {
          'User-Agent': 'mi1309-admin',
          'Accept': 'application/vnd.github+json',
          'Authorization': `token ${githubPat}`,
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(body)
        }
      };
      const reqGit = https.request(url, options, (r) => {
        if (r.statusCode >= 200 && r.statusCode < 300) {
          res.json({ success: true, dispatched: true });
        } else {
          let chunks = '';
          r.on('data', (c) => chunks += c);
          r.on('end', () => res.status(500).json({ error: 'GitHub dispatch failed', details: chunks }));
        }
      });
      reqGit.on('error', (e) => res.status(500).json({ error: 'Dispatch error', details: e.message }));
      reqGit.write(body);
      reqGit.end();
      return;
    }

    // Fallback: write local file
    const dir = path.dirname(archivePath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(archivePath, JSON.stringify(data, null, 2), 'utf8');
    res.json({ success: true, dispatched: false });
  } catch (e) {
    res.status(500).json({ error: 'Failed to save' });
  }
});

// Serve admin login and project pages only under the hidden admin route
app.get(`/admin/${ADMIN_ROUTE}/login`, (req, res) => {
  res.sendFile(path.join(__dirname, 'admin', 'login.html'));
});

app.get(`/admin/${ADMIN_ROUTE}/project`, (req, res) => {
  if (!req.session || !req.session.authenticated) {
    return res.redirect(`/admin/${ADMIN_ROUTE}/login`);
  }
  res.sendFile(path.join(__dirname, 'admin', 'project', 'index.html'));
});

// Logout
app.post('/api/admin/logout', (req, res) => {
  req.session.destroy(() => {
    res.json({ success: true });
  });
});

app.listen(PORT, () => {
  console.log(`Admin server running on http://localhost:${PORT}`);
  console.log(`Hidden admin route: /admin/${ADMIN_ROUTE}/project`);
});
