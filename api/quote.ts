/**
 * POST /api/quote  →  { ok: true }
 * Body: { name, email, phone, projectType, budget, description }
 *
 * ⚠️ LEAD DELIVERY. Configure this before launch and send a real test submission.
 *
 * Behaviour by design: with no email provider configured this returns 503, so the
 * form shows "call us instead" rather than a false success. A form that silently
 * swallows leads is worse than no form.
 *
 * Env:
 *   RESEND_API_KEY   an API key from resend.com (or swap for any provider)
 *   QUOTE_TO_EMAIL   where leads should land
 *   QUOTE_FROM_EMAIL a verified sender on your domain
 */

interface QuotePayload {
  name?: string;
  email?: string;
  phone?: string;
  projectType?: string;
  budget?: string;
  description?: string;
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({error: 'Method not allowed'});
    return;
  }

  const body: QuotePayload = req.body || {};
  const name = String(body.name || '').trim().slice(0, 200);
  const email = String(body.email || '').trim().slice(0, 200);
  const description = String(body.description || '').trim().slice(0, 5000);

  if (!name || !email || !description || !email.includes('@')) {
    res.status(400).json({error: 'Missing or invalid fields'});
    return;
  }

  const phone = String(body.phone || '').trim().slice(0, 60);
  const projectType = String(body.projectType || '').trim().slice(0, 100);
  const budget = String(body.budget || '').trim().slice(0, 100);

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.QUOTE_TO_EMAIL;
  const from = process.env.QUOTE_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    console.error(
      'QUOTE FORM NOT CONFIGURED — lead dropped. Set RESEND_API_KEY, QUOTE_TO_EMAIL, ' +
        'QUOTE_FROM_EMAIL, or switch Contact.tsx to the WhatsApp deep link.',
      {name, email, phone, projectType, budget},
    );
    res.status(503).json({error: 'Quote form is not configured'});
    return;
  }

  const html = `
    <h2>New quote request</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(phone) || '—'}</p>
    <p><strong>Project type:</strong> ${escapeHtml(projectType)}</p>
    <p><strong>Project size:</strong> ${escapeHtml(budget)}</p>
    <hr />
    <p style="white-space:pre-line">${escapeHtml(description)}</p>
  `;

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Quote request — ${name}`,
        html,
      }),
    });

    if (!r.ok) {
      console.error('Email provider rejected the send:', r.status, await r.text());
      res.status(502).json({error: 'Could not send the request'});
      return;
    }

    res.status(200).json({ok: true});
  } catch (err: any) {
    console.error('Quote send failed:', err?.message || err);
    res.status(502).json({error: 'Could not send the request'});
  }
}
