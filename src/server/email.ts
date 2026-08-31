import nodemailer from "nodemailer";
import type { ReservationInput } from "./reservations";

const restaurantEmail = process.env.RESTAURANT_EMAIL ?? "hello@sozoizakaya.in";

let transporter: ReturnType<typeof nodemailer.createTransport> | null = null;

function getTransporter() {
  if (transporter) return transporter;

  // If SMTP is not configured, return null (email sending will be skipped)
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn(
      "[Email] SMTP not configured. Set SMTP_HOST, SMTP_USER, SMTP_PASS to enable email notifications.",
    );
    return null;
  }

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT ?? "587"),
    secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  return transporter;
}

export async function sendReservationEmail(reservation: ReservationInput & { id: string }) {
  const transporter = getTransporter();
  if (!transporter) {
    console.log(`[Email] Skipped (SMTP not configured) - Reservation ${reservation.id}`);
    return;
  }

  const senderEmail = process.env.SMTP_FROM ?? restaurantEmail;

  const htmlBody = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; color: #333; }
          .container { max-width: 600px; margin: 0 auto; }
          .header { background: #1a1a1a; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; }
          .field { margin: 10px 0; }
          .label { font-weight: bold; color: #666; font-size: 12px; text-transform: uppercase; }
          .value { font-size: 16px; color: #1a1a1a; margin-top: 5px; }
          .footer { padding: 20px; text-align: center; font-size: 12px; color: #999; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Table Reservation</h1>
            <p>Sozo Izakaya — Versova</p>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Name</div>
              <div class="value">${escapeHtml(reservation.name)}</div>
            </div>
            <div class="field">
              <div class="label">Phone</div>
              <div class="value">${escapeHtml(reservation.phone)}</div>
            </div>
            ${reservation.email ? `<div class="field"><div class="label">Email</div><div class="value">${escapeHtml(reservation.email)}</div></div>` : ""}
            <div class="field">
              <div class="label">Date & Time</div>
              <div class="value">${escapeHtml(reservation.date)} at ${escapeHtml(reservation.time)}</div>
            </div>
            <div class="field">
              <div class="label">Guests</div>
              <div class="value">${escapeHtml(reservation.guests)}</div>
            </div>
            ${reservation.occasion ? `<div class="field"><div class="label">Occasion</div><div class="value">${escapeHtml(reservation.occasion)}</div></div>` : ""}
            ${reservation.notes ? `<div class="field"><div class="label">Notes</div><div class="value">${escapeHtml(reservation.notes)}</div></div>` : ""}
            <div class="field">
              <div class="label">Reservation ID</div>
              <div class="value">${escapeHtml(reservation.id)}</div>
            </div>
          </div>
          <div class="footer">
            <p>Received on ${new Date().toLocaleString()}</p>
          </div>
        </div>
      </body>
    </html>
  `;

  const textBody = `
New Table Reservation
Sozo Izakaya — Versova

Name: ${reservation.name}
Phone: ${reservation.phone}
${reservation.email ? `Email: ${reservation.email}` : ""}
Date & Time: ${reservation.date} at ${reservation.time}
Guests: ${reservation.guests}
${reservation.occasion ? `Occasion: ${reservation.occasion}` : ""}
${reservation.notes ? `Notes: ${reservation.notes}` : ""}
Reservation ID: ${reservation.id}

Received on ${new Date().toLocaleString()}
  `.trim();

  try {
    const info = await transporter.sendMail({
      from: senderEmail,
      to: restaurantEmail,
      subject: `New Reservation - ${reservation.name} on ${reservation.date}`,
      text: textBody,
      html: htmlBody,
    });

    console.log(`[Email] Sent to ${restaurantEmail} (message ID: ${info.messageId})`);
  } catch (error) {
    console.error(`[Email] Failed to send reservation email:`, error);
    // Don't throw - allow reservation to be saved even if email fails
  }
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}
