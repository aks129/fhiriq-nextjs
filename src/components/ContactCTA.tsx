import TrackedLink from './TrackedLink';
import { PERSON } from '@/lib/profile';
import { INTRO_CALL } from '@/lib/engagements';

/**
 * The one way to get in touch, used everywhere a page asks for contact.
 *
 * Booking and email always appear together. In October 2026 the Google
 * booking page showed "No available times in the next year", which turned
 * every "Book a call" button on the site into a dead end. Email never does.
 */
export default function ContactCTA({
  location,
  note = true,
}: {
  location: string;
  note?: boolean;
}) {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <TrackedLink
          href={PERSON.bookingUrl}
          event="contact_cta_clicked"
          payload={{ location, channel: 'booking' }}
          external
          className="btn-primary"
        >
          Book a call
        </TrackedLink>
        <TrackedLink
          href={`mailto:${PERSON.email}`}
          event="contact_cta_clicked"
          payload={{ location, channel: 'email' }}
          className="btn-secondary"
        >
          {PERSON.email}
        </TrackedLink>
      </div>
      {note && (
        <p className="caption mt-3">
          {INTRO_CALL}. Bring one decision you are facing.
        </p>
      )}
    </div>
  );
}
