const jwt = require('jsonwebtoken');
const https = require('https');

function parseCookies(cookieHeader) {
  if (!cookieHeader) return {};
  return Object.fromEntries(cookieHeader.split('; ').map(c => c.split('=')));
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();
  const cookies = parseCookies(req.headers.cookie || '');
  const token = cookies.mi_auth;
  const jwtSecret = process.env.JWT_SECRET;
  if (!token || !jwtSecret) return res.status(401).json({ error: 'Unauthorized' });
  try {
    jwt.verify(token, jwtSecret);
  } catch (e) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  const data = req.body;
  if (!data) return res.status(400).json({ error: 'No data' });

  const githubRepo = process.env.GITHUB_REPO;
  const githubPat = process.env.GITHUB_PAT;
  if (githubRepo && githubPat) {
    const payload = { archive: data };
    const [owner, repo] = githubRepo.split('/');
    const url = `https://api.github.com/repos/${owner}/${repo}/dispatches`;
    const body = JSON.stringify({ event_type: 'update-archive', client_payload: payload });
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

  // If no GitHub integration, return error because serverless cannot write repo files persistently
  return res.status(500).json({ error: 'No GitHub integration configured' });
};
