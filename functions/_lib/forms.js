/**
 * Shared form handling for /api/contact and /api/join.
 *
 * Spam defences, in order:
 *   1. Honeypot  – an off-screen "website" field people never see; bots fill it.
 *   2. Time trap – forms.js stamps the page-load time; real people take more
 *                  than a few seconds, scripts post instantly or with no stamp.
 *   3. Turnstile – Cloudflare's invisible challenge (enforced once
 *                  TURNSTILE_SECRET is set on the Pages project).
 *   4. Content   – Cyrillic/CJK text, or a message stuffed with links.
 *
 * Bots that fail 1, 2 or 4 still get a "thank you" so they don't adapt;
 * the submission is simply dropped.
 *
 * Mail is sent by the separate "foto-mailer" Worker (workers/mailer), reached
 * through the MAILER service binding, because Pages Functions can't hold a
 * send_email binding themselves.
 */

const MIN_SECONDS = 4;
const MAX_LINKS = 2;

export async function handleForm(context, { kind, subject, required, fields, thanksPath }) {
  const { request, env } = context;
  const wantsJson = (request.headers.get('Accept') || '').includes('application/json');

  const done = (ok, message) => {
    if (wantsJson) {
      return Response.json({ ok, message }, { status: ok ? 200 : 400 });
    }
    if (ok) return Response.redirect(new URL(thanksPath, request.url).toString(), 303);
    return new Response(message, { status: 400, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
  };

  let form;
  try {
    form = await request.formData();
  } catch {
    return done(false, 'Sorry, we could not read that form.');
  }
  const get = (name) => (form.get(name) || '').toString().trim();

  // 1. Honeypot
  if (get('website')) return done(true);

  // 2. Time trap
  const started = Number(get('ts'));
  const elapsed = (Date.now() - started) / 1000;
  if (!started || elapsed < MIN_SECONDS || elapsed > 60 * 60 * 24) return done(true);

  // 3. Turnstile
  if (env.TURNSTILE_SECRET) {
    const passed = await verifyTurnstile(env.TURNSTILE_SECRET, get('cf-turnstile-response'),
      request.headers.get('CF-Connecting-IP'));
    if (!passed) return done(false, 'Sorry, we could not confirm you are human. Please reload the page and try again.');
  }

  for (const name of required) {
    if (!get(name)) return done(false, 'Please fill in all the required fields.');
  }
  const email = get('email');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return done(false, 'Please enter a valid email address.');

  // 4. Content
  const allText = fields.map(([name]) => get(name)).join('\n');
  if (/[Ѐ-ӿ぀-ヿ一-鿿]/.test(allText)) return done(true);
  if ((allText.match(/https?:\/\/|www\./gi) || []).length > MAX_LINKS) return done(true);

  const lines = fields
    .map(([name, label]) => [label, get(name)])
    .filter(([, value]) => value)
    .map(([label, value]) => `${label}:\n${value}\n`);
  const text = `${lines.join('\n')}\n—\nSent from the ${kind} form on friendsoftheochils.org.uk`;

  try {
    await env.MAILER.sendForm({ kind, subject: subject(get), text, replyTo: email });
  } catch (err) {
    console.error('Mailer failed', err);
    return done(false, 'Sorry, something went wrong sending your message. Please try again later.');
  }
  return done(true);
}

async function verifyTurnstile(secret, token, ip) {
  if (!token) return false;
  const body = new FormData();
  body.append('secret', secret);
  body.append('response', token);
  if (ip) body.append('remoteip', ip);
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body });
  const data = await res.json();
  return data.success === true;
}
