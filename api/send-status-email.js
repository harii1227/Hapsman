import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { customer, orderId, status, origin } = req.body;

  if (!customer || !orderId || !status || !customer.email) {
    return res.status(400).json({ message: 'Missing required order data or email' });
  }

  const GMAIL_USER = process.env.GMAIL_USER;
  const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;

  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    console.error('Gmail SMTP credentials not configured');
    return res.status(500).json({ message: 'Email service not configured' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_APP_PASSWORD,
    },
  });

  const siteUrl = origin || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://naturagroharvest.com');
  const logoUrl = `${siteUrl}/hapsman-logo.png`;

  let statusEmoji = '📦';
  let statusMessage = '';
  let statusColor = '#1B4D3E'; // Hapsman Green
  let statusBg = '#e8f5ee';

  if (status === 'Shipped') {
    statusEmoji = '🚚';
    statusMessage = 'Your order has been shipped and is on its way to you!';
    statusColor = '#6b21a8'; // Purple
    statusBg = '#f3e8ff';
  } else if (status === 'Delivered') {
    statusEmoji = '🎉';
    statusMessage = 'Your order has been delivered successfully. Thank you for shopping with us!';
    statusColor = '#065f46'; // Emerald
    statusBg = '#d1fae5';
  } else if (status === 'Cancelled') {
    statusEmoji = '❌';
    statusMessage = 'Your order has been cancelled.';
    statusColor = '#991b1b'; // Red
    statusBg = '#fee2e2';
  } else {
    // Other statuses (Pending, etc)
    statusEmoji = '🔄';
    statusMessage = `Your order status has been updated to: ${status}`;
  }

  const customerEmailHTML = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><meta name="color-scheme" content="light"><meta name="supported-color-schemes" content="light"><title>Order Status Update</title></head>
<body style="margin:0;padding:0;background:#faf7f2;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#faf7f2;padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="background-color:#1B4D3E;border-radius:16px 16px 0 0;padding:28px 40px 24px;text-align:center;">
            <img src="${logoUrl}" alt="Hapsman" width="90" height="90" style="display:block;margin:0 auto 14px;border-radius:50%;border:3px solid rgba(255,255,255,0.25);object-fit:cover;" />
            <p style="margin:0 0 4px;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#a7d9c6;font-weight:600;">HAPSMAN UPDATE</p>
            <h1 style="margin:0;font-size:26px;color:#ffffff;font-weight:800;letter-spacing:-0.5px;">${statusEmoji} Order ${status}!</h1>
            <p style="margin:10px 0 0;font-size:14px;color:#a7d9c6;">Hello ${customer.name},</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="background:#ffffff;padding:32px 40px;">

            <!-- Status Box -->
            <div style="background:${statusBg};border-radius:10px;padding:16px 20px;text-align:center;">
              <p style="margin:0;font-size:15px;color:${statusColor};font-weight:700;">
                ${statusMessage}
              </p>
            </div>

            <!-- Order ID -->
            <div style="margin-top:24px;text-align:center;">
              <p style="margin:0;font-size:11px;color:#888;letter-spacing:1px;text-transform:uppercase;font-weight:600;">Order ID</p>
              <p style="margin:4px 0 0;font-size:18px;color:#333;font-weight:800;font-family:monospace;">${orderId}</p>
            </div>

            <!-- Shipping Address (if available) -->
            ${customer.address ? `
            <div style="margin-top:24px;background:#faf7f2;border-radius:10px;padding:16px 20px;border-left:4px solid #1B4D3E;">
              <p style="margin:0 0 6px;font-size:11px;color:#888;text-transform:uppercase;letter-spacing:1.5px;font-weight:700;">📍 Shipping To</p>
              <p style="margin:0;font-size:13px;color:#333;line-height:1.7;">
                <strong>${customer.name}</strong><br>
                ${customer.address}, ${customer.city}, ${customer.state} — ${customer.pincode}<br>
                📞 ${customer.phone}
              </p>
            </div>
            ` : ''}

            <p style="font-size:12px;color:#999;margin:24px 0 0;text-align:center;line-height:1.6;">
              Questions? Reach us at <a href="mailto:naturagroharvest@gmail.com" style="color:#1B4D3E;text-decoration:none;font-weight:600;">naturagroharvest@gmail.com</a>
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#1B4D3E;border-radius:0 0 16px 16px;padding:20px 40px;text-align:center;">
            <p style="margin:0;font-size:12px;color:#a7d9c6;">🌿 Hapsman — Premium Natural Products</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  try {
    await transporter.sendMail({
      from: `"Hapsman Updates 📦" <${GMAIL_USER}>`,
      to: customer.email,
      subject: `Order ${status} — ${orderId} | Hapsman`,
      html: customerEmailHTML,
    });

    return res.status(200).json({ success: true, message: 'Status email sent successfully' });
  } catch (error) {
    console.error('Status email sending error:', error);
    return res.status(500).json({ success: false, message: 'Failed to send status email', error: error.message });
  }
}
