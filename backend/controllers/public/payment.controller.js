const paystack = require("../../utils/paystack");
const Order = require("../../models/Order");
const Product = require("../../models/Product");
const sendEmail = require("../../utils/resend");
const { productDeliveryEmail } = require("../../utils/emailTemplates");

// STEP 1: Initialize payment
exports.initializePayment = async (req, res) => {
  const { email, productIds } = req.body;

  if (!email || !productIds?.length) {
    return res.status(400).json({ message: "Invalid request" });
  }

  // Fetch products
  const products = await Product.find({ _id: { $in: productIds } });
  if (!products.length) {
    return res.status(404).json({ message: "Products not found" });
  }

  const amount = products.reduce((sum, p) => sum + p.price, 0);

  // Create order (PENDING)
  const order = await Order.create({
    email,
    products: productIds,
    amount,
    paymentStatus: "pending"
  });

  // Initialize Paystack
  const response = await paystack.post("/transaction/initialize", {
    email,
    amount: amount * 100, // Paystack uses kobo
    callback_url: process.env.PAYSTACK_CALLBACK_URL,
    metadata: {
      orderId: order._id.toString()
    }
  });

  res.json({
    authorization_url: response.data.data.authorization_url
  });
};




// STEP 2: Verify payment
exports.verifyPayment = async (req, res) => {
  const { reference } = req.query;

  if (!reference) {
    return res.status(400).json({ message: "Missing reference" });
  }

  // Verify with Paystack
  const response = await paystack.get(
    `/transaction/verify/${reference}`
  );

  const data = response.data.data;

  if (data.status !== "success") {
    return res.status(400).json({ message: "Payment failed" });
  }

  const orderId = data.metadata.orderId;

  // Update order
  const order = await Order.findByIdAndUpdate(
    orderId,
    {
      paymentStatus: "paid",
      paymentReference: reference
    },
    { new: true }
  ).populate("products");

  // SEND DELIVERY EMAIL
  await sendEmail({
    to: order.email,
    subject: "Your Digital Products Are Ready",
    html: productDeliveryEmail({
      email: order.email,
      products: order.products
    })
  });

  res.json({
    message: "Payment verified",
    order
  });
};
