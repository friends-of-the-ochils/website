/**
 * Membership form – POST /api/join
 * Replaces Formspree. See functions/_lib/forms.js for the spam defences.
 */
import { handleForm } from '../_lib/forms.js';

export function onRequestPost(context) {
  return handleForm(context, {
    kind: 'membership',
    subject: (get) => `New FotO membership application: ${get('forename')} ${get('surname')}`,
    required: ['forename', 'surname', 'address', 'postcode', 'email',
      'membership_type', 'payment_method', 'signature', 'date', 'privacy_consent'],
    fields: [
      ['title', 'Title'],
      ['forename', 'Forename(s)'],
      ['surname', 'Surname'],
      ['address', 'Address'],
      ['postcode', 'Postcode'],
      ['telephone', 'Telephone'],
      ['email', 'Email'],
      ['membership_type', 'Membership type'],
      ['donation_amount', 'Donation amount (£)'],
      ['payment_method', 'Payment method'],
      ['gift_aid', 'Gift Aid'],
      ['email_updates', 'Email updates'],
      ['skills_and_interests', 'Skills and interests'],
      ['signature', 'Typed signature'],
      ['date', 'Date'],
      ['privacy_consent', 'Privacy policy'],
    ],
    thanksPath: '/join-us/?thanks=1',
  });
}
