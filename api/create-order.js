import Razorpay from 'razorpay';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { amount, receipt, notes } = req.body;

  if (!amount) {
    return res.status(400).json({ message: 'Amount is required' });
  }

  try {
    // Try to load keys, fallback to dummy mode if not configured (useful for initial dev)
    const key_id = process.env.VITE_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    if (!key_id || !key_secret) {
      console.warn('Razorpay keys not configured. Simulating order creation for development.');
      return res.status(200).json({
        id: 'order_dummy_' + Date.now(),
        amount: amount,
        currency: 'INR',
        receipt: receipt,
        status: 'created',
        dummy: true
      });
    }

    const razorpay = new Razorpay({
      key_id,
      key_secret
    });

    const options = {
      amount, // Amount is in currency subunits (paise for INR)
      currency: 'INR',
      receipt: receipt || 'receipt_' + Date.now(),
      notes: notes || {}
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json({ ...order, key_id });
  } catch (error) {
    console.error('Razorpay Error:', error);
    res.status(500).json({ message: 'Failed to create Razorpay order', error: error.message });
  }
}
