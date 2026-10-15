module.exports = (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();

  const secureFlag = process.env.VERCEL_ENV === 'production' ? 'Secure; ' : '';
  res.setHeader(
    'Set-Cookie',
    `mi_auth=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax; ${secureFlag}`,
  );
  return res.json({ success: true });
};