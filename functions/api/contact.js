/**
 * Contact form – POST /api/contact
 * Replaces Formspree. See functions/_lib/forms.js for the spam defences.
 */
import { handleForm } from '../_lib/forms.js';

export function onRequestPost(context) {
  return handleForm(context, {
    kind: 'contact',
    subject: (get) => `FotO website enquiry from ${get('name')}`,
    required: ['name', 'email', 'message'],
    fields: [
      ['name', 'Name'],
      ['email', 'Email'],
      ['phone', 'Phone'],
      ['message', 'Message'],
    ],
    thanksPath: '/contact-us/?thanks=1',
  });
}
