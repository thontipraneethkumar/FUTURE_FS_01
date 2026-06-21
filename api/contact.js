// api/contact.js
// Vercel serverless function — handles POST /api/contact
// Deployed automatically by Vercel because it lives in the /api folder.

const { sendContactEmail } = require('../lib/sendContactEmail');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    await sendContactEmail(body);
    return res.status(200).json({ ok: true });
  } catch (err) {
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({ error: err.message || 'Something went wrong.' });
  }
};
