import { Order } from "../models/Order.js";
import { Product } from "../models/Product.js";
import { User } from "../models/User.js";
import { Review } from "../models/Review.js";

export const getDashboardStats = async (req, res, next) => {
  try {
    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({ status: "Pending" });
    const totalCustomers = await User.countDocuments({ role: "customer" });
    const totalProducts = await Product.countDocuments();
    const lowStockProducts = await Product.countDocuments({ stock: { $lte: 10 } });
    const pendingReviews = await Review.countDocuments({ status: "pending" });

    const orders = await Order.find({ status: { $ne: "Cancelled" } });
    const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("user", "name email");

    res.status(200).json({
      success: true,
      data: {
        totalRevenue,
        totalOrders,
        pendingOrders,
        totalCustomers,
        totalProducts,
        lowStockProducts,
        pendingReviews,
        recentOrders
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getUsersList = async (req, res, next) => {
  try {
    const users = await User.find({ role: "customer" }).sort({ createdAt: -1 });

    const userMetrics = await Promise.all(
      users.map(async (u) => {
        const userOrders = await Order.find({ user: u._id });
        const spend = userOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
        return {
          id: u._id,
          name: u.name,
          email: u.email,
          createdAt: u.createdAt,
          ordersCount: userOrders.length,
          totalSpend: spend,
          skinType: u.beautyPreferences?.skinType || "Combination",
          status: "Active"
        };
      })
    );

    res.status(200).json({
      success: true,
      count: userMetrics.length,
      data: userMetrics
    });
  } catch (error) {
    next(error);
  }
};
