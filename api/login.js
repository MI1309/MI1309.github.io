const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();
  const { password } = req.body || {};
  if (!password) return res.status(400).json({ error: 'Password required' });
  const hash = process.env.ADMIN_PASSWORD_HASH;
  const jwtSecret = process.env.JWT_SECRET;
  if (!hash || !jwtSecret) return res.status(500).json({ error: 'Server not configured' });
  try {
    const ok = await bcrypt.compare(password, hash);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ admin: true }, jwtSecret, { expiresIn: '1h' });
    const secureFlag = (process.env.VERCEL_ENV === 'production') ? 'Secure; ' : '';
    res.setHeader('Set-Cookie', `mi_auth=${token}; HttpOnly; Path=/; Max-Age=3600; SameSite=Lax; ${secureFlag}`);
    return res.json({ success: true });
  } catch (e) {
    return res.status(500).json({ error: 'Login failed' });
  }
};
