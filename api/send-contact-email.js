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
  const logoUrl = `${siteUrl}/hapsman-logo.png`;

  // Admin Notification Email
  const adminHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><meta name="color-scheme" content="light"><meta name="supported-color-schemes" content="light"></head>
    <body style="margin: 0; padding: 20px; background-color: #f9fafb;">
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; color: #333; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
      <div style="background-color: #1B4D3E; padding: 30px; text-align: center;">
        <img src="${logoUrl}" alt="Hapsman" style="height: 70px; border-radius: 50%; border: 3px solid #ffffff; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
      </div>
      <div style="padding: 30px;">
        <h2 style="color: #1B4D3E; text-align: center; margin-top: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">New Enquiry Received!</h2>
        <p style="text-align: center; color: #6b7280; font-size: 14px; margin-bottom: 30px;">You have a new contact form submission.</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; width: 100px;"><strong style="color: #4b5563; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Name</strong></td>
            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-weight: 500;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6;"><strong style="color: #4b5563; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Email</strong></td>
            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #1B4D3E; font-weight: 500;">
              <a href="mailto:${email}" style="color: #1B4D3E; text-decoration: none;">${email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6;"><strong style="color: #4b5563; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Phone</strong></td>
            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-weight: 500;">${phone || 'Not provided'}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6;"><strong style="color: #4b5563; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Subject</strong></td>
            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-weight: 500;">${subject}</td>
          </tr>
        </table>

        <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-left: 4px solid #1B4D3E; padding: 20px; border-radius: 6px;">
          <h4 style="margin-top: 0; color: #4b5563; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 10px;">Message</h4>
          <p style="margin: 0; white-space: pre-wrap; color: #1f2937; line-height: 1.6;">${message}</p>
        </div>
      </div>
      <div style="background-color: #f3f4f6; padding: 15px; text-align: center; color: #6b7280; font-size: 12px;">
        Hapsman E-Commerce Platform
      </div>
    </div>
    </body>
    </html>
  `;

  // Customer Thank You Email
  const customerHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><meta name="color-scheme" content="light"><meta name="supported-color-schemes" content="light"></head>
    <body style="margin: 0; padding: 20px; background-color: #f9fafb;">
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; color: #333; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
      <div style="background-color: #1B4D3E; padding: 30px; text-align: center; position: relative;">
        <img src="${logoUrl}" alt="Hapsman" style="height: 70px; border-radius: 50%; border: 3px solid #ffffff; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
      </div>
      <div style="padding: 40px 30px;">
        <h2 style="color: #1B4D3E; text-align: center; margin-top: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">Thank you for reaching out!</h2>
        <p style="font-size: 16px; line-height: 1.6; color: #4b5563; margin-top: 25px;">Hi <strong style="color: #111827;">${name}</strong>,</p>
        <p style="font-size: 16px; line-height: 1.6; color: #4b5563;">We have successfully received your enquiry regarding <strong style="color: #111827;">"${subject}"</strong>.</p>
        <p style="font-size: 16px; line-height: 1.6; color: #4b5563;">Our dedicated contact person will review your message and connect with you very soon to assist you further.</p>
        
        <div style="background: #fdfbf7; border: 1px dashed #d1d5db; padding: 20px; border-radius: 8px; margin-top: 30px; margin-bottom: 30px;">
          <p style="margin-top: 0; margin-bottom: 10px; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; color: #6b7280; font-weight: 600;">Your Message</p>
          <p style="margin: 0; white-space: pre-wrap; font-style: italic; color: #374151; line-height: 1.6;">"${message}"</p>
        </div>
        
        <div style="margin-top: 40px;">
          <p style="margin: 0; font-size: 16px; color: #4b5563;">Warm Regards,</p>
          <p style="margin: 5px 0 0 0; font-size: 18px; font-weight: 700; color: #1B4D3E;">Hapsman Team</p>
        </div>
      </div>
      <div style="background-color: #f9fafb; border-top: 1px solid #e5e7eb; padding: 20px; text-align: center;">
        <p style="font-size: 12px; color: #9ca3af; margin: 0;">This is an automated email, please do not reply directly.</p>
        <div style="margin-top: 10px;">
          <a href="${siteUrl}" style="color: #1B4D3E; font-size: 12px; text-decoration: none; font-weight: 600;">Visit our store</a>
        </div>
      </div>
    </div>
    </body>
    </html>
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
