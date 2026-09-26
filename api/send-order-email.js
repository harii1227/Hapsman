import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { customer, cartItems, orderId, paymentMethod, subtotal, discount, shipping, total, origin, appliedCoupon } = req.body;

  if (!customer || !cartItems || !orderId) {
    return res.status(400).json({ message: 'Missing required order data' });
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

  // ─── Logo URL ────────────────────────────────────────────────────────────
  const siteUrl = origin || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://naturagroharvest.com');
  const logoUrl = `${siteUrl}/hapsman-logo.png`;

  const itemsTableRows = cartItems
    .map(
      (item) => `
      <tr>
        <td style="padding:10px 12px; border-bottom:1px solid #f0ebe3; font-size:13px; color:#3d3229;">${item.name}${item.variant ? ` <span style="color:#888; font-size:11px;">(${item.variant})</span>` : ''}</td>
        <td style="padding:10px 12px; border-bottom:1px solid #f0ebe3; font-size:13px; color:#3d3229; text-align:center;">${item.quantity}</td>
        <td style="padding:10px 12px; border-bottom:1px solid #f0ebe3; font-size:13px; color:#3d3229; text-align:right;">₹${item.price}</td>
        <td style="padding:10px 12px; border-bottom:1px solid #f0ebe3; font-size:13px; font-weight:700; color:#1B4D3E; text-align:right;">₹${item.price * item.quantity}</td>
      </tr>`
    )
    .join('');

  // ─── Customer Confirmation Email HTML ────────────────────────────────────
  const customerEmailHTML = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><meta name="color-scheme" content="light"><meta name="supported-color-schemes" content="light"><title>Order Confirmed</title></head>
<body style="margin:0;padding:0;background:#faf7f2;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#faf7f2;padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="background-color:#1B4D3E;border-radius:16px 16px 0 0;padding:28px 40px 24px;text-align:center;">
            <img src="${logoUrl}" alt="NaturaGro Harvest" width="90" height="90" style="display:block;margin:0 auto 14px;border-radius:50%;border:3px solid rgba(255,255,255,0.25);object-fit:cover;" />
            <p style="margin:0 0 4px;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#a7d9c6;font-weight:600;">NaturaGro Harvest</p>
            <h1 style="margin:0;font-size:26px;color:#ffffff;font-weight:800;letter-spacing:-0.5px;">🌿 Order Confirmed!</h1>
            <p style="margin:10px 0 0;font-size:14px;color:#a7d9c6;">Thank you for choosing us, ${customer.name}!</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="background:#ffffff;padding:32px 40px;">

            <!-- Order ID Badge -->
            <div style="background:#f0faf5;border:1.5px solid #b2ddc8;border-radius:10px;padding:14px 20px;margin-bottom:24px;text-align:center;">
              <p style="margin:0;font-size:11px;color:#4a9a72;letter-spacing:2px;text-transform:uppercase;font-weight:700;">Order ID</p>
              <p style="margin:6px 0 0;font-size:20px;color:#1B4D3E;font-weight:800;letter-spacing:1px;">${orderId}</p>
            </div>

            <p style="font-size:14px;color:#555;line-height:1.7;margin:0 0 24px;">
              We have received your order and it is being processed. Our team will reach out to you on <strong>${customer.phone}</strong> shortly with further details.
            </p>

            <!-- Order Items -->
            <h3 style="margin:0 0 12px;font-size:14px;color:#1B4D3E;text-transform:uppercase;letter-spacing:1.5px;font-weight:800;border-bottom:2px solid #e8f5ee;padding-bottom:8px;">📦 Your Items</h3>
            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
              <thead>
                <tr style="background:#f7faf8;">
                  <th style="padding:10px 12px;font-size:11px;color:#888;text-transform:uppercase;letter-spacing:1px;text-align:left;font-weight:700;">Product</th>
                  <th style="padding:10px 12px;font-size:11px;color:#888;text-transform:uppercase;letter-spacing:1px;text-align:center;font-weight:700;">Qty</th>
                  <th style="padding:10px 12px;font-size:11px;color:#888;text-transform:uppercase;letter-spacing:1px;text-align:right;font-weight:700;">Price</th>
                  <th style="padding:10px 12px;font-size:11px;color:#888;text-transform:uppercase;letter-spacing:1px;text-align:right;font-weight:700;">Total</th>
                </tr>
              </thead>
              <tbody>${itemsTableRows}</tbody>
            </table>

            <!-- Billing Summary -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:16px;border-top:2px solid #e8f5ee;">
              <tr>
                <td style="padding:8px 12px;font-size:13px;color:#666;">Subtotal</td>
                <td style="padding:8px 12px;font-size:13px;color:#333;text-align:right;font-weight:600;">₹${subtotal}</td>
              </tr>
              ${discount > 0 ? `<tr><td style="padding:8px 12px;font-size:13px;color:#2d9e5f;">Discount ${appliedCoupon ? `<span style="font-size:10px;background:#e8f5ee;padding:2px 6px;border-radius:4px;border:1px solid #b2ddc8;margin-left:6px;">${appliedCoupon}</span>` : ''}</td><td style="padding:8px 12px;font-size:13px;color:#2d9e5f;text-align:right;font-weight:600;">- ₹${discount}</td></tr>` : ''}
              <tr>
                <td style="padding:8px 12px;font-size:13px;color:#666;">Shipping</td>
                <td style="padding:8px 12px;font-size:13px;color:#333;text-align:right;font-weight:600;">${shipping === 0 ? 'FREE' : '₹' + shipping}</td>
              </tr>
              <tr style="background:#f0faf5;border-radius:8px;">
                <td style="padding:12px;font-size:15px;color:#1B4D3E;font-weight:800;">Total Paid</td>
                <td style="padding:12px;font-size:15px;color:#1B4D3E;text-align:right;font-weight:800;">₹${total}</td>
              </tr>
              <tr>
                <td style="padding:8px 12px;font-size:12px;color:#888;">Payment Method</td>
                <td style="padding:8px 12px;font-size:12px;color:#555;text-align:right;">${paymentMethod}</td>
              </tr>
            </table>

            <!-- Shipping Address -->
            <div style="margin-top:24px;background:#faf7f2;border-radius:10px;padding:16px 20px;border-left:4px solid #1B4D3E;">
              <p style="margin:0 0 6px;font-size:11px;color:#888;text-transform:uppercase;letter-spacing:1.5px;font-weight:700;">📍 Delivering To</p>
              <p style="margin:0;font-size:13px;color:#333;line-height:1.7;">
                <strong>${customer.name}</strong><br>
                ${customer.address}, ${customer.city}, ${customer.state} — ${customer.pincode}<br>
                📞 ${customer.phone}
              </p>
            </div>

            <p style="font-size:12px;color:#999;margin:24px 0 0;text-align:center;line-height:1.6;">
              Questions? Reach us at <a href="mailto:naturagroharvest@gmail.com" style="color:#1B4D3E;text-decoration:none;font-weight:600;">naturagroharvest@gmail.com</a>
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#1B4D3E;border-radius:0 0 16px 16px;padding:20px 40px;text-align:center;">
            <p style="margin:0;font-size:12px;color:#a7d9c6;">🌿 NaturaGro Harvest — Pure, Authentic & Healthy</p>
            <p style="margin:4px 0 0;font-size:11px;color:#6aaa8a;">Amethi, Uttar Pradesh, India</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  // ─── Admin Notification Email HTML ───────────────────────────────────────
  const adminEmailHTML = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><meta name="color-scheme" content="light"><meta name="supported-color-schemes" content="light"><title>New Order Received</title></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="background-color:#b45309;border-radius:16px 16px 0 0;padding:24px 40px 22px;text-align:center;">
            <img src="${logoUrl}" alt="NaturaGro Harvest" width="72" height="72" style="display:block;margin:0 auto 12px;border-radius:50%;border:3px solid rgba(255,255,255,0.25);object-fit:cover;" />
            <p style="margin:0 0 4px;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#fde68a;font-weight:600;">Admin Alert — NaturaGro Harvest</p>
            <h1 style="margin:0;font-size:24px;color:#ffffff;font-weight:800;">🛒 New Order Received!</h1>
            <p style="margin:8px 0 0;font-size:13px;color:#fde68a;">Order ID: <strong>${orderId}</strong></p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="background:#ffffff;padding:32px 40px;">

            <!-- Customer Details -->
            <h3 style="margin:0 0 14px;font-size:14px;color:#b45309;text-transform:uppercase;letter-spacing:1.5px;font-weight:800;border-bottom:2px solid #fef3c7;padding-bottom:8px;">👤 Customer Details</h3>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:6px 0;font-size:12px;color:#888;width:130px;">Full Name</td>
                <td style="padding:6px 0;font-size:13px;color:#222;font-weight:700;">${customer.name}</td>
              </tr>
              <tr>
                <td style="padding:6px 0;font-size:12px;color:#888;">Phone</td>
                <td style="padding:6px 0;font-size:13px;color:#222;font-weight:700;">${customer.phone}</td>
              </tr>
              <tr>
                <td style="padding:6px 0;font-size:12px;color:#888;">Email</td>
                <td style="padding:6px 0;font-size:13px;color:#222;">${customer.email || '—'}</td>
              </tr>
              <tr>
                <td style="padding:6px 0;font-size:12px;color:#888;vertical-align:top;">Delivery Address</td>
                <td style="padding:6px 0;font-size:13px;color:#222;line-height:1.6;">${customer.address}, ${customer.city}, ${customer.state} — ${customer.pincode}</td>
              </tr>
              <tr>
                <td style="padding:6px 0;font-size:12px;color:#888;">Payment Method</td>
                <td style="padding:6px 0;font-size:13px;color:#222;font-weight:700;">${paymentMethod}</td>
              </tr>
            </table>

            <!-- Order Items -->
            <h3 style="margin:24px 0 12px;font-size:14px;color:#b45309;text-transform:uppercase;letter-spacing:1.5px;font-weight:800;border-bottom:2px solid #fef3c7;padding-bottom:8px;">📦 Order Items</h3>
            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
              <thead>
                <tr style="background:#fff9ee;">
                  <th style="padding:10px 12px;font-size:11px;color:#888;text-transform:uppercase;letter-spacing:1px;text-align:left;">Product</th>
                  <th style="padding:10px 12px;font-size:11px;color:#888;text-transform:uppercase;letter-spacing:1px;text-align:center;">Qty</th>
                  <th style="padding:10px 12px;font-size:11px;color:#888;text-transform:uppercase;letter-spacing:1px;text-align:right;">Unit Price</th>
                  <th style="padding:10px 12px;font-size:11px;color:#888;text-transform:uppercase;letter-spacing:1px;text-align:right;">Total</th>
                </tr>
              </thead>
              <tbody>${itemsTableRows}</tbody>
            </table>

            <!-- Billing -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:16px;border-top:2px solid #fef3c7;">
              <tr>
                <td style="padding:8px 12px;font-size:13px;color:#666;">Subtotal</td>
                <td style="padding:8px 12px;font-size:13px;color:#333;text-align:right;font-weight:600;">₹${subtotal}</td>
              </tr>
              ${discount > 0 ? `<tr><td style="padding:8px 12px;font-size:13px;color:#2d9e5f;">Discount Applied ${appliedCoupon ? `<span style="font-size:10px;background:#e8f5ee;padding:2px 6px;border-radius:4px;border:1px solid #b2ddc8;margin-left:6px;color:#1B4D3E;">${appliedCoupon}</span>` : ''}</td><td style="padding:8px 12px;font-size:13px;color:#2d9e5f;text-align:right;font-weight:600;">- ₹${discount}</td></tr>` : ''}
              <tr>
                <td style="padding:8px 12px;font-size:13px;color:#666;">Shipping</td>
                <td style="padding:8px 12px;font-size:13px;color:#333;text-align:right;font-weight:600;">${shipping === 0 ? 'FREE' : '₹' + shipping}</td>
              </tr>
              <tr style="background:#fff9ee;">
                <td style="padding:14px 12px;font-size:16px;color:#b45309;font-weight:800;">💰 Total Amount</td>
                <td style="padding:14px 12px;font-size:16px;color:#b45309;text-align:right;font-weight:800;">₹${total}</td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#92400e;border-radius:0 0 16px 16px;padding:18px 40px;text-align:center;">
            <p style="margin:0;font-size:12px;color:#fde68a;">NaturaGro Harvest — Admin Dashboard</p>
            <p style="margin:4px 0 0;font-size:11px;color:#fbbf24;">Please process this order promptly.</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  try {
    // Send Customer Confirmation Email (only if customer.email exists)
    if (customer.email) {
      await transporter.sendMail({
        from: `"NaturaGro Harvest 🌿" <${GMAIL_USER}>`,
        to: customer.email,
        subject: `✅ Order Confirmed — ${orderId} | NaturaGro Harvest`,
        html: customerEmailHTML,
      });
    }

    // Send Admin Notification Email
    await transporter.sendMail({
      from: `"Order Alert 🛒" <${GMAIL_USER}>`,
      to: GMAIL_USER,
      subject: `🆕 New Order Received — ${orderId} | ₹${total}`,
      html: adminEmailHTML,
    });

    return res.status(200).json({ success: true, message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Email sending error:', error);
    return res.status(500).json({ success: false, message: 'Failed to send email', error: error.message });
  }
}
