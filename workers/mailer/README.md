# Website email: forms and multi-person forwarding

The contact and membership forms post to Pages Functions (`functions/api/contact.js`,
`functions/api/join.js`). They check for spam, then hand the message to this
Worker, `foto-mailer`, which sends it with Cloudflare Email Routing. The same
Worker can also copy incoming mail (for example info@) to several people.

## One-off setup

1. **Deploy the Worker.** In this folder run `npx wrangler login`, then `npx wrangler deploy`.
2. **Set recipients.** Dashboard → Workers & Pages → foto-mailer → Settings → Variables.
   Each is a comma-separated list of *verified* Email Routing destination addresses:
   `CONTACT_TO`, `JOIN_TO`, `FORWARD_TO`, and `MAIL_TO` (fallback for all three).
3. **Connect it to the site.** Workers & Pages → the website's Pages project → Settings →
   Bindings → Add → Service binding. Variable name `MAILER`, service `foto-mailer`.
   Do this for Production and Preview, then redeploy.
4. **Turnstile (optional but recommended).** Dashboard → Turnstile → Add widget for
   `friendsoftheochils.org.uk` (Managed mode). Put the **secret key** on the Pages project
   as an encrypted variable `TURNSTILE_SECRET`; the **site key** goes in the two form pages.
5. **Forward one address to several people.** Email Routing → Routing rules → edit the
   address → action "Send to a Worker" → foto-mailer.

## Spam defences

Honeypot field, a minimum fill-in time, Turnstile, and a content filter (Cyrillic/CJK
text or more than two links). Obvious bots get a normal "thank you" and their
message is dropped, so they have no reason to keep trying.

Also worth switching on in the dashboard for the domain: Security → Bots →
**Bot Fight Mode** and **AI Labyrinth**, and Scrape Shield → **Email Address Obfuscation**.

Email addresses shown on pages should be written backwards in a `data-email`
attribute (see `nav.js`), e.g. `<a data-email="ku.gro.slihcoehtfosdneirf@ofni" data-email-text>our email address</a>`.
