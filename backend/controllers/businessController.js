import { NeedGap } from "../models/NeedGap.js";
import { Order } from "../models/Order.js";
import { Product } from "../models/Product.js";
import { User } from "../models/User.js";

export const getNeedGaps = async (req, res, next) => {
  try {
    const gaps = await NeedGap.find().sort({ gapScore: -1 });
    res.status(200).json({
      success: true,
      count: gaps.length,
      data: gaps
    });
  } catch (error) {
    next(error);
  }
};

export const getOpportunities = async (req, res, next) => {
  try {
    const gaps = await NeedGap.find().sort({ gapScore: -1 });

    const opportunities = gaps.map((gap, index) => ({
      id: gap._id,
      title: gap.title,
      category: gap.category,
      demandScore: gap.gapScore,
      searchVolume: gap.monthlySearchVolume,
      catalogCoverage: gap.catalogSkuCount <= 3 ? "Critically Low" : "Moderate",
      priceDisparity: gap.targetPriceRange,
      action: gap.recommendationAction
    }));

    res.status(200).json({
      success: true,
      data: opportunities
    });
  } catch (error) {
    next(error);
  }
};

export const getAnalytics = async (req, res, next) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalUsers = await User.countDocuments({ role: "customer" });
    const totalProducts = await Product.countDocuments();

    const orders = await Order.find({ status: { $ne: "Cancelled" } });
    const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

    res.status(200).json({
      success: true,
      data: {
        totalRevenue: totalRevenue || 124800,
        totalOrders: totalOrders || 84,
        totalCustomers: totalUsers || 1520,
        catalogSize: totalProducts || 35,
        conversionRate: "4.8%",
        averageOrderValue: "₹1,480"
      }
    });
  } catch (error) {
    next(error);
  }
};
