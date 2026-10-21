/**
 * foto-mailer – the website's email Worker. It does two jobs:
 *
 * 1. Sends website form submissions. Pages Functions can't use a send_email
 *    binding, and the Pages project sits in a different Cloudflare account
 *    from the domain, so the site POSTs JSON to this Worker's workers.dev URL
 *    with the shared MAILER_KEY secret in an X-Mailer-Key header. Requests
 *    without the right key get a 404.
 *
 * 2. Forwards incoming mail to several people (email). In Email Routing, set
 *    an address's action to "Send to a Worker" → foto-mailer, and it is copied
 *    to everyone in FORWARD_TO.
 *
 * All recipients must be verified destination addresses in Email Routing.
 * Worker variables (comma-separated lists):
 *   CONTACT_TO  – contact form recipients
 *   JOIN_TO     – membership form recipients
 *   FORWARD_TO  – recipients for mail routed to this Worker
 *   MAIL_TO     – fallback for any of the above
 * Secret: MAILER_KEY (same value as on the Pages project).
 */
import { WorkerEntrypoint } from 'cloudflare:workers';

const list = (value) => (value || '').split(',').map((s) => s.trim()).filter(Boolean);

export default class Mailer extends WorkerEntrypoint {
  async fetch(request) {
    const key = request.headers.get('X-Mailer-Key');
    if (request.method !== 'POST' || !this.env.MAILER_KEY || key !== this.env.MAILER_KEY) {
      return new Response('Not found', { status: 404 });
    }
    try {
      await this.sendForm(await request.json());
      return new Response('ok');
    } catch (err) {
      console.error('Send failed', err);
      return new Response('Send failed', { status: 502 });
    }
  }

  async sendForm({ kind, subject, text, replyTo }) {
    const to = list(kind === 'membership' ? this.env.JOIN_TO : this.env.CONTACT_TO);
    await this.env.EMAIL.send({
      from: { email: this.env.MAIL_FROM, name: 'FotO website' },
      to: to.length ? to : list(this.env.MAIL_TO),
      replyTo,
      subject: subject.slice(0, 200),
      text,
    });
    return true;
  }

  async email(message) {
    const to = list(this.env.FORWARD_TO);
    for (const addr of to.length ? to : list(this.env.MAIL_TO)) {
      await message.forward(addr);
    }
  }
}
