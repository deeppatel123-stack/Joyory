import { Cart } from "../models/Cart.js";
import { Product } from "../models/Product.js";

const calculateCartTotals = (items) => {
  let subtotal = 0;
  let mrpTotal = 0;

  items.forEach((item) => {
    if (item.product) {
      subtotal += item.product.price * item.quantity;
      mrpTotal += (item.product.mrp || item.product.price) * item.quantity;
    }
  });

  const discount = mrpTotal > subtotal ? mrpTotal - subtotal : 0;
  const shipping = subtotal > 799 || subtotal === 0 ? 0 : 50;
  const total = subtotal + shipping;

  return { subtotal, mrpTotal, discount, shipping, total };
};

export const getCart = async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate("items.product");

    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [] });
    }

    // Filter out any items where product might have been deleted
    cart.items = cart.items.filter((item) => item.product !== null);

    const totals = calculateCartTotals(cart.items);

    res.status(200).json({
      success: true,
      data: {
        items: cart.items,
        ...totals
      }
    });
  } catch (error) {
    next(error);
  }
};

export const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity = 1 } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found." });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ success: false, message: `Only ${product.stock} items available in stock.` });
    }

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);

    if (itemIndex > -1) {
      const newQty = cart.items[itemIndex].quantity + quantity;
      if (newQty > product.stock) {
        return res.status(400).json({ success: false, message: `Cannot exceed available stock of ${product.stock}.` });
      }
      cart.items[itemIndex].quantity = newQty;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    cart = await Cart.findById(cart._id).populate("items.product");

    const totals = calculateCartTotals(cart.items);

    res.status(200).json({
      success: true,
      message: `${product.name} added to cart.`,
      data: {
        items: cart.items,
        ...totals
      }
    });
  } catch (error) {
    next(error);
  }
};

export const updateCartItem = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found." });
    }

    const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);
    if (itemIndex === -1) {
      return res.status(404).json({ success: false, message: "Item not in cart." });
    }

    if (quantity <= 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      const product = await Product.findById(productId);
      if (product && product.stock < quantity) {
        return res.status(400).json({ success: false, message: `Only ${product.stock} items in stock.` });
      }
      cart.items[itemIndex].quantity = quantity;
    }

    await cart.save();
    const populated = await Cart.findById(cart._id).populate("items.product");
    const totals = calculateCartTotals(populated.items);

    res.status(200).json({
      success: true,
      data: {
        items: populated.items,
        ...totals
      }
    });
  } catch (error) {
    next(error);
  }
};

export const removeCartItem = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
      cart.items = cart.items.filter((item) => item.product.toString() !== productId);
      await cart.save();
    }

    const populated = await Cart.findById(cart._id).populate("items.product");
    const totals = calculateCartTotals(populated ? populated.items : []);

    res.status(200).json({
      success: true,
      message: "Item removed from cart.",
      data: {
        items: populated ? populated.items : [],
        ...totals
      }
    });
  } catch (error) {
    next(error);
  }
};

export const clearCart = async (req, res, next) => {
  try {
    await Cart.findOneAndUpdate({ user: req.user._id }, { items: [] });
    res.status(200).json({
      success: true,
      message: "Cart cleared.",
      data: { items: [], subtotal: 0, mrpTotal: 0, discount: 0, shipping: 0, total: 0 }
    });
  } catch (error) {
    next(error);
  }
};
