import { Order } from "../models/Order.js";
import { Product } from "../models/Product.js";
import { Cart } from "../models/Cart.js";
import { BeautyOutcome } from "../models/BeautyOutcome.js";
import { BeautyJourney } from "../models/BeautyJourney.js";

export const createOrder = async (req, res, next) => {
  try {
    const { items, shippingAddress, paymentMethod = "cod" } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: "Order must contain at least one item." });
    }

    if (!shippingAddress || !shippingAddress.fullName || !shippingAddress.address || !shippingAddress.city || !shippingAddress.pincode) {
      return res.status(400).json({ success: false, message: "Complete shipping address is required." });
    }

    let subtotal = 0;
    let mrpTotal = 0;
    const verifiedItems = [];

    // Verify each product, price and stock on backend
    for (const item of items) {
      const product = await Product.findById(item.productId || item.product);
      if (!product) {
        return res.status(404).json({ success: false, message: `Product not found: ${item.name || item.productId}` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${product.name}. Available: ${product.stock}`
        });
      }

      // Deduct stock safely
      product.stock -= item.quantity;
      await product.save();

      subtotal += product.price * item.quantity;
      mrpTotal += (product.mrp || product.price) * item.quantity;

      verifiedItems.push({
        product: product._id,
        name: product.name,
        image: product.images[0] || "",
        price: product.price,
        quantity: item.quantity
      });
    }

    const discount = mrpTotal > subtotal ? mrpTotal - subtotal : 0;
    const shippingFee = subtotal > 799 ? 0 : 50;
    const totalAmount = subtotal + shippingFee;

    const orderId = `JOY-${Date.now().toString().slice(-6)}`;

    const order = await Order.create({
      orderId,
      user: req.user._id,
      items: verifiedItems,
      shippingAddress,
      paymentMethod,
      subtotal,
      discount,
      shippingFee,
      totalAmount,
      status: "Confirmed"
    });

    // Clear cart
    await Cart.findOneAndUpdate({ user: req.user._id }, { items: [] });

    // Automatically initialize BeautyOutcome records for the Outcome Loop
    for (const item of verifiedItems) {
      const prod = await Product.findById(item.product);
      if (prod) {
        await BeautyOutcome.create({
          user: req.user._id,
          productId: prod._id.toString(),
          productName: prod.name,
          brand: prod.brand,
          category: prod.category,
          image: prod.images[0] || "",
          orderId: order.orderId,
          status: "Purchased",
          usageDays: 0
        });
      }
    }

    // Log PURCHASE event in BeautyJourney
    let journey = await BeautyJourney.findOne({ user: req.user._id });
    if (!journey) {
      journey = new BeautyJourney({ user: req.user._id, events: [] });
    }
    journey.events.push({
      type: "PURCHASE",
      title: "Order Placed",
      description: `Ordered ${verifiedItems.length} item(s) • Total ₹${totalAmount}`,
      productName: verifiedItems[0]?.name,
      productId: verifiedItems[0]?.product?.toString(),
      systemImpact: "Lifecycle transition: Added to Beauty Outcome Loop tracking."
    });
    await journey.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully!",
      data: order
    });
  } catch (error) {
    next(error);
  }
};

export const getOrders = async (req, res, next) => {
  try {
    const filter = req.user.role === "admin" ? {} : { user: req.user._id };
    const orders = await Order.find(filter).sort({ createdAt: -1 }).populate("user", "name email");

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    next(error);
  }
};

export const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    let order;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      order = await Order.findById(id).populate("user", "name email");
    } else {
      order = await Order.findOne({ orderId: id }).populate("user", "name email");
    }

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found." });
    }

    if (req.user.role !== "admin" && order.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized to view this order." });
    }

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ["Pending", "Confirmed", "Packed", "Shipped", "Delivered", "Cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid order status." });
    }

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found." });
    }

    order.status = status;
    if (status === "Delivered") {
      order.deliveredAt = new Date();
      // Also advance any matching BeautyOutcome to 'Trying'
      await BeautyOutcome.updateMany(
        { orderId: order.orderId, status: "Purchased" },
        { status: "Trying" }
      );
    }
    await order.save();

    res.status(200).json({
      success: true,
      message: `Order status updated to ${status}.`,
      data: order
    });
  } catch (error) {
    next(error);
  }
};
