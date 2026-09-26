import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, email, phone, subject, message, origin } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Missing required contact data' });
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
  const logoUrl = `${siteUrl}/hapsman-logo.jpg`;

  // Admin Notification Email
  const adminHtml = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333; border: 1px solid #eaeaea; padding: 20px; border-radius: 8px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <img src="${logoUrl}" alt="Hapsman" style="height: 60px; border-radius: 50%;">
      </div>
      <h2 style="color: #1B4D3E; text-align: center;">New Contact Form Submission</h2>
      <hr style="border: 0; border-top: 1px solid #eaeaea; margin: 20px 0;">
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <div style="background: #f4f4f4; padding: 15px; border-radius: 5px; margin-top: 15px;">
        <p style="margin: 0; white-space: pre-wrap;">${message}</p>
      </div>
    </div>
  `;

  // Customer Thank You Email
  const customerHtml = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333; border: 1px solid #eaeaea; padding: 20px; border-radius: 8px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <img src="${logoUrl}" alt="Hapsman" style="height: 60px; border-radius: 50%;">
      </div>
      <h2 style="color: #1B4D3E; text-align: center;">Thank you for contacting Hapsman!</h2>
      <hr style="border: 0; border-top: 1px solid #eaeaea; margin: 20px 0;">
      <p>Hi ${name},</p>
      <p>We have successfully received your enquiry regarding "<strong>${subject}</strong>".</p>
      <p>Our dedicated contact person will review your message and connect with you very soon to assist you further.</p>
      <p>Here is a copy of your message:</p>
      <div style="background: #f4f4f4; padding: 15px; border-left: 4px solid #1B4D3E; margin-top: 15px;">
        <p style="margin: 0; white-space: pre-wrap; font-style: italic;">${message}</p>
      </div>
      <br>
      <p>Best Regards,</p>
      <p><strong>Hapsman Team</strong></p>
      <p style="font-size: 12px; color: #666; text-align: center; margin-top: 30px; border-top: 1px solid #eaeaea; padding-top: 15px;">This is an automated email, please do not reply directly to this email.</p>
    </div>
  `;

  try {
    // Send to Admin
    await transporter.sendMail({
      from: `"Hapsman Contact" <${GMAIL_USER}>`,
      to: GMAIL_USER,
      replyTo: email,
      subject: `New Enquiry: ${subject} - ${name}`,
      html: adminHtml,
    });

    // Send to Customer
    await transporter.sendMail({
      from: `"Hapsman" <${GMAIL_USER}>`,
      to: email,
      subject: `Thank you for your interest in Hapsman`,
      html: customerHtml,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email send error:', error);
    return res.status(500).json({ message: 'Failed to send emails', error: error.message });
  }
}
