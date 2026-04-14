/**
 * Sellis Beauty Spa — WhatsApp Utilities
 *
 * IMPORTANT: Replace WHATSAPP_NUMBER with the real Ghana number, e.g. '233201234567'
 */

export const WHATSAPP_NUMBER = '233593247781';

export type BookingMessageFields = {
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  notes?: string;
};

export type ContactMessageFields = {
  name: string;
  phone: string;
  subject?: string;
  message: string;
};

/** Builds a wa.me URL with a pre-filled text message. */
export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** Builds the booking message string from form values. */
export function buildBookingMessage({
  name,
  phone,
  service,
  date,
  time,
  notes,
}: BookingMessageFields): string {
  const formattedDate = new Date(`${date}T00:00:00`).toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const [h, m] = time.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 || 12;
  const formattedTime = `${hour12}:${String(m).padStart(2, '0')} ${ampm}`;

  const lines = [
    '*Sellis Beauty Spa — Booking Request*',
    '',
    `*Name:* ${name}`,
    `*Phone:* ${phone}`,
    `*Service:* ${service}`,
    `*Date:* ${formattedDate}`,
    `*Time:* ${formattedTime}`,
  ];

  if (notes) lines.push(`*Notes:* ${notes}`);
  lines.push('', '_Sent via Sellis Beauty Spa website_');

  return lines.join('\n');
}

/** Builds a contact/enquiry message. */
export function buildContactMessage({ name, phone, subject, message }: ContactMessageFields): string {
  const lines = [
    '*Message via Sellis Beauty Spa Website*',
    '',
    `*Name:* ${name}`,
    `*Phone:* ${phone}`,
  ];
  if (subject) lines.push(`*Subject:* ${subject}`);
  lines.push(`*Message:* ${message}`);
  lines.push('', '_Sent via Sellis Beauty Spa website_');
  return lines.join('\n');
}
