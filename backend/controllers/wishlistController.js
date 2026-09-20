import { Wishlist } from "../models/Wishlist.js";
import { Product } from "../models/Product.js";

export const getWishlist = async (req, res, next) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user._id }).populate("products");
    if (!wishlist) {
      wishlist = await Wishlist.create({ user: req.user._id, products: [] });
    }

    res.status(200).json({
      success: true,
      data: wishlist.products
    });
  } catch (error) {
    next(error);
  }
};

export const toggleWishlist = async (req, res, next) => {
  try {
    const { productId } = req.body;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found." });
    }

    let wishlist = await Wishlist.findOne({ user: req.user._id });
    if (!wishlist) {
      wishlist = new Wishlist({ user: req.user._id, products: [] });
    }

    const existsIndex = wishlist.products.findIndex((p) => p.toString() === productId);
    let action = "added";

    if (existsIndex > -1) {
      wishlist.products.splice(existsIndex, 1);
      action = "removed";
    } else {
      wishlist.products.push(productId);
    }

    await wishlist.save();
    wishlist = await Wishlist.findById(wishlist._id).populate("products");

    res.status(200).json({
      success: true,
      action,
      message: `${product.name} ${action === "added" ? "saved to" : "removed from"} wishlist.`,
      data: wishlist.products
    });
  } catch (error) {
    next(error);
  }
};

export const removeFromWishlist = async (req, res, next) => {
  try {
    const { productId } = req.params;
    let wishlist = await Wishlist.findOne({ user: req.user._id });

    if (wishlist) {
      wishlist.products = wishlist.products.filter((p) => p.toString() !== productId);
      await wishlist.save();
      wishlist = await Wishlist.findById(wishlist._id).populate("products");
    }

    res.status(200).json({
      success: true,
      message: "Product removed from wishlist.",
      data: wishlist ? wishlist.products : []
    });
  } catch (error) {
    next(error);
  }
};
