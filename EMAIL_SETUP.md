# Email Configuration for Sozo Izakaya Reservations

When a customer submits a reservation through the "Book a Table" form, the backend automatically sends an email notification to the restaurant.

## Setup

### Option 1: Gmail (Easiest)

1. Enable "2-Step Verification" on your Google Account
2. Go to https://myaccount.google.com/apppasswords and generate an "App Password" for Mail
3. Set these environment variables before running the server:

```bash
export SMTP_HOST=smtp.gmail.com
export SMTP_PORT=587
export SMTP_USER=your-email@gmail.com
export SMTP_PASS=your-16-character-app-password
export SMTP_FROM=your-email@gmail.com
export RESTAURANT_EMAIL=hello@sozoizakaya.in
```

### Option 2: Your Hosting Provider's SMTP

Most hosting providers (Hostinger, Bluehost, Namecheap, etc.) offer SMTP access. Check your control panel for:
- SMTP Host
- SMTP Port (usually 587 or 465)
- Username
- Password

Then set:

```bash
export SMTP_HOST=mail.yourdomain.com
export SMTP_PORT=587
export SMTP_USER=noreply@yourdomain.com
export SMTP_PASS=your-password
export SMTP_FROM=noreply@yourdomain.com
export RESTAURANT_EMAIL=hello@sozoizakaya.in
```

### Option 3: Other Email Service

Any SMTP provider works (SendGrid, Mailgun, AWS SES, etc.). Get the SMTP credentials from your provider's documentation.

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `SMTP_HOST` | Yes | - | SMTP server hostname |
| `SMTP_PORT` | No | 587 | SMTP port (587 or 465) |
| `SMTP_USER` | Yes | - | SMTP username/email |
| `SMTP_PASS` | Yes | - | SMTP password/app password |
| `SMTP_FROM` | No | hello@sozoizakaya.in | Sender email address |
| `SMTP_SECURE` | No | false | Set "true" for port 465, "false" for 587 |
| `RESTAURANT_EMAIL` | No | hello@sozoizakaya.in | Email to receive reservations |

## Running the Server

**Development:**

```bash
export SMTP_HOST=smtp.gmail.com
export SMTP_PORT=587
export SMTP_USER=your-email@gmail.com
export SMTP_PASS=your-app-password
export RESTAURANT_EMAIL=hello@sozoizakaya.in

npm run dev
```

**Production:**

```bash
export SMTP_HOST=smtp.gmail.com
export SMTP_PORT=587
export SMTP_USER=your-email@gmail.com
export SMTP_PASS=your-app-password
export RESTAURANT_EMAIL=hello@sozoizakaya.in

npm run build
node .output/server/index.mjs
```

## What Happens

When a customer submits the "Book a Table" form:

1. ✅ Form validates in browser
2. ✅ Data is sent to `/api/reservations` on your server
3. ✅ Server validates & saves to SQLite database
4. ✅ **Email is sent to the restaurant** with full reservation details
5. ✅ WhatsApp opens with pre-filled message to your number

If email is not configured (SMTP variables not set), the system will still work perfectly — reservations are saved to the database, WhatsApp works, but no email notifications are sent (a warning is logged to console).

## Email Format

The restaurant receives a formatted email with:
- Customer name
- Phone number
- Email address
- Date & Time requested
- Number of guests
- Occasion (if provided)
- Special notes (if provided)
- Reservation ID (for reference)

## Troubleshooting

### "SMTP not configured" warning
This is normal if you haven't set the environment variables yet. Set them and restart the server.

### Email not sending but no error
- Check SMTP credentials are correct
- For Gmail: verify app password is correct (not your regular password)
- For port 465: set `SMTP_SECURE=true`
- For other ports: set `SMTP_SECURE=false`

### "Authentication failed"
- Verify `SMTP_USER` and `SMTP_PASS` are correct
- For Gmail: use the 16-character app password, not your account password
- Check 2-Step Verification is enabled on Google Account

### "Connection refused"
- Verify `SMTP_HOST` and `SMTP_PORT` are correct
- Check your firewall allows outgoing SMTP connections

## Testing Email

You can test by:
1. Running the server with email configured
2. Opening http://localhost:8080 (or your server URL)
3. Filling out the "Book a Table" form
4. Submitting
5. Checking the restaurant email inbox

The email should arrive within seconds.
