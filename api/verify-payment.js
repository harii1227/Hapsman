import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, dummy } = req.body;

  if (dummy) {
    // Fallback mode for development without keys
    return res.status(200).json({ success: true, message: 'Dummy payment verified successfully' });
  }

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ message: 'Missing required parameters' });
  }

  try {
    const secret = process.env.RAZORPAY_KEY_SECRET;
    
    if (!secret) {
      throw new Error('Razorpay secret key not found in environment variables');
    }

    const generated_signature = crypto
      .createHmac('sha256', secret)
      .update(razorpay_order_id + '|' + razorpay_payment_id)
      .digest('hex');

    if (generated_signature === razorpay_signature) {
      res.status(200).json({ success: true, message: 'Payment verified successfully' });
    } else {
      res.status(400).json({ success: false, message: 'Invalid signature' });
    }
  } catch (error) {
    console.error('Signature verification error:', error);
    res.status(500).json({ success: false, message: 'Internal server error during verification' });
  }
}
