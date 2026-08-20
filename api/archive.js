const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  if (req.method !== 'GET') return res.status(405).end();
  const archivePath = path.join(process.cwd(), 'data', 'archive.json');
  try {
    const data = fs.readFileSync(archivePath, 'utf8');
    return res.setHeader('Content-Type', 'application/json').status(200).send(data);
  } catch (e) {
    return res.status(200).json([]);
  }
};
