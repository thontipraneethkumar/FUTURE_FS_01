// netlify/functions/contact.js
// Netlify Function — handles POST requests submitted from the contact form.
// Netlify exposes this at /.netlify/functions/contact; the redirect in
// netlify.toml maps /api/contact to this same function so the frontend
// code doesn't need to know which host it's deployed on.

const { sendContactEmail } = require('../../lib/sendContactEmail');

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { Allow: 'POST' },
      body: JSON.stringify({ error: 'Method not allowed.' })
    };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    await sendContactEmail(body);
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: true })
    };
  } catch (err) {
    const statusCode = err.statusCode || 500;
    return {
      statusCode,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message || 'Something went wrong.' })
    };
  }
};
