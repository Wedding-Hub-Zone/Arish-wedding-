export interface RSVPData {
  guestName: string;
  mobileNumber: string;
  guestsCount: string | number;
  attendance: string; // e.g. "Joyfully Accept", "Regretfully Decline", "Not Sure Yet"
  message: string;
}

export function generateWhatsAppRSVPLink(phoneNumber: string, data: RSVPData): string {
  const cleanPhone = phoneNumber.replace(/\+/g, '').trim();
  const formattedText = `*Wedding Hub RSVP*

*Guest Name:* ${data.guestName}
*Mobile Number:* ${data.mobileNumber}
*Number of Guests:* ${data.guestsCount}
*Attendance:* ${data.attendance}
*Message:* ${data.message || 'No message provided.'}`;

  const encodedText = encodeURIComponent(formattedText);
  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
}

export function generateWhatsAppInquiryLink(phoneNumber: string): string {
  const cleanPhone = phoneNumber.replace(/\+/g, '').trim();
  const text = "Hello Wedding Hub, I would like to know more about premium digital wedding invitations.";
  const encodedText = encodeURIComponent(text);
  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
}
