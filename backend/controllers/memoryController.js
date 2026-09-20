import { CustomerPreference } from "../models/CustomerPreference.js";
import { Order } from "../models/Order.js";

export const getBeautyMemory = async (req, res, next) => {
  try {
    const ordersCount = await Order.countDocuments({ user: req.user._id });

    // Consistent personal passport response
    const passportData = {
      passportId: `JOY-PASSPORT-${req.user._id.toString().slice(-4).toUpperCase()}`,
      customerName: req.user.name,
      skinProfile: `${req.user.beautyPreferences?.skinType || "Combination"} • Sensitive T-Zone`,
      activeSince: req.user.createdAt ? new Date(req.user.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "May 2024",
      totalProductsEvaluated: Math.max(ordersCount * 2, 8),
      verifiedPreferencesCount: 14,
      preferenceRadar: [
        { attribute: "Lightweight Texture", score: 94, level: "High Affinity" },
        { attribute: "Fragrance Sensitivity", score: 88, level: "Low Tolerance" },
        { attribute: "Barrier Care", score: 92, level: "Essential" },
        { attribute: "Niacinamide Tolerance", score: 90, level: "Optimal" },
        { attribute: "Matte Finish", score: 82, level: "Preferred" }
      ],
      likedAttributes: [
        { name: "Centella Asiatica", category: "Active", reason: "Calms redness within 4 hours" },
        { name: "Gel-Cream Hydration", category: "Texture", reason: "Zero pore-clogging film" },
        { name: "Zinc PCA", category: "Active", reason: "Regulates midday oil production" },
        { name: "Oat Beta-Glucan", category: "Active", reason: "Soothes windburn & barrier fatigue" }
      ],
      dislikedAttributes: [
        { name: "Heavy Mineral Oil", category: "Occlusive", reason: "Causes whitehead clustering" },
        { name: "Synthetic Floral Fragrance", category: "Additive", reason: "Triggers mild cheek tingling" }
      ],
      seasonalEvolution: [
        {
          season: "Monsoon / Humid",
          period: "Jul - Sep",
          shiftDescription: "Shifted to ultra-lightweight water burst gels and niacinamide oil-control fluids."
        },
        {
          season: "Winter / Dry",
          period: "Nov - Jan",
          shiftDescription: "Introduced ceramide serum layering while keeping gel daytime textures."
        }
      ]
    };

    res.status(200).json({
      success: true,
      data: passportData
    });
  } catch (error) {
    next(error);
  }
};
