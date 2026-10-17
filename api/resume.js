const jwt = require('jsonwebtoken');
const https = require('https');

const MAX_RESUME_BYTES = 3 * 1024 * 1024;
function parseCookies(cookieHeader) {
  if (!cookieHeader) return {};
  return Object.fromEntries(cookieHeader.split('; ').map((cookie) => cookie.split('=')));
}

function isAuthenticated(req) {
  const token = parseCookies(req.headers.cookie || '').mi_auth;
  const jwtSecret = process.env.JWT_SECRET;
  if (!token || !jwtSecret) return false;
  try {
    jwt.verify(token, jwtSecret);
    return true;
  } catch {
    return false;
  }
}

function dispatchResumeUpdate(res, update) {
  const githubRepo = process.env.GITHUB_REPO;
  const githubPat = process.env.GITHUB_PAT;
  if (!githubRepo || !githubPat) {
    return res.status(500).json({ error: 'Integrasi GitHub belum dikonfigurasi.' });
  }

  const [owner, repo] = githubRepo.split('/');
  if (!owner || !repo) {
    return res.status(500).json({ error: 'Format GITHUB_REPO tidak valid.' });
  }

  const body = JSON.stringify({
    event_type: 'update-resume',
    client_payload: { resume: update },
  });
  const request = https.request(
    `https://api.github.com/repos/${owner}/${repo}/dispatches`,
    {
      method: 'POST',
      headers: {
        'User-Agent': 'mi1309-admin',
        Accept: 'application/vnd.github+json',
        Authorization: `token ${githubPat}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    },
    (response) => {
      if (response.statusCode >= 200 && response.statusCode < 300) {
        return res.json({ success: true, dispatched: true });
      }
      let responseBody = '';
      response.on('data', (chunk) => {
        responseBody += chunk;
      });
      response.on('end', () => {
        res.status(500).json({
          error: 'Pembaruan resume gagal dikirim ke GitHub.',
          details: responseBody,
        });
      });
    },
  );
  request.on('error', (error) => {
    res.status(500).json({
      error: 'Tidak dapat menghubungi GitHub.',
      details: error.message,
    });
  });
  request.end(body);
}

module.exports = (req, res) => {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'GET') {
    try {
      const resume = require('../data/resume.json');
      return res.status(200).json(resume);
    } catch (error) {
      return res.status(500).json({ error: 'Status resume tidak dapat dibaca.' });
    }
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'Metode tidak diizinkan.' });
  }

  if (!isAuthenticated(req)) {
    return res.status(401).json({ error: 'Sesi admin tidak valid atau sudah berakhir.' });
  }

  const { action, content } = req.body || {};
  if (action === 'delete') {
    return dispatchResumeUpdate(res, { action: 'delete' });
  }
  if (action !== 'upload' || typeof content !== 'string') {
    return res.status(400).json({ error: 'Pilih berkas PDF untuk diunggah.' });
  }

  if (!/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(content)) {
    return res.status(400).json({ error: 'Data berkas PDF tidak valid.' });
  }
  const pdf = Buffer.from(content, 'base64');
  if (pdf.length > MAX_RESUME_BYTES) {
    return res.status(413).json({ error: 'Ukuran PDF maksimal 3 MB.' });
  }
  if (!pdf.subarray(0, 5).equals(Buffer.from('%PDF-'))) {
    return res.status(400).json({ error: 'Berkas yang dipilih bukan PDF yang valid.' });
  }

  return dispatchResumeUpdate(res, {
    action: 'upload',
    content: pdf.toString('base64'),
  });
};

module.exports.config = {
  api: {
    bodyParser: {
      sizeLimit: '4.5mb',
    },
  },
};
