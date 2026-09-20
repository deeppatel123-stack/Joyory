import { DecisionReplay } from "../models/DecisionReplay.js";

export const getDecisionReplays = async (req, res, next) => {
  try {
    let replays = await DecisionReplay.find({ user: req.user._id });

    if (!replays || replays.length === 0) {
      // Return seeded replays for rich demonstration
      replays = [
        {
          _id: "replay-1",
          productName: "HydraGel Ultra-Light Moisturizer",
          brand: "Joyory Labs",
          category: "Moisturizer",
          image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80",
          orderDate: "Sep 12, 2026",
          rating: 5,
          steps: [
            { stepNumber: 1, stage: "Intent Search", title: "Natural Search Query", timestamp: "10:14 AM", details: "Query: 'lightweight moisturizer for oily skin under ₹800'", status: "Completed" },
            { stepNumber: 2, stage: "Product View", title: "Inspected Actives", timestamp: "10:17 AM", details: "Viewed 2% Hyaluronic Acid & Niacinamide specifications", status: "Completed" },
            { stepNumber: 3, stage: "Compare", title: "Side-by-Side Comparison", timestamp: "10:21 AM", details: "Compared with Clarifying BHA Pore Balance Fluid", status: "Completed" },
            { stepNumber: 4, stage: "Selection", title: "Added to Bag", timestamp: "10:24 AM", details: "Deciding factors: Oil-free gel texture + high non-comedogenic rating", status: "Completed" },
            { stepNumber: 5, stage: "Purchase", title: "Order Confirmed", timestamp: "10:26 AM", details: "Applied Welcome10 coupon • Total ₹584", status: "Completed" },
            { stepNumber: 6, stage: "Usage Outcome", title: "Day 7 Experience Log", timestamp: "Sep 19", details: "Logged: 'Zero shine all day, absorbed in 15 seconds'", status: "Completed" }
          ],
          primaryDrivers: ["Ultra-lightweight water gel", "Under ₹800 budget threshold", "Centella soothing for redness"],
          alternativeConsidered: {
            name: "Ceramide Barrier Defense Cream",
            brand: "PureAura",
            whyNotChosen: "Heavier lipid texture felt too rich for humid monsoon weather."
          },
          outcomeCorrelation: {
            satisfactionRate: "98% Positive",
            verifiedMatch: true,
            retrospectiveNote: "Purchase perfectly validated your stated and learned preference for fast-absorbing gel textures."
          }
        },
        {
          _id: "replay-2",
          productName: "Mineral Sun Gel SPF 50+ PA++++",
          brand: "SolarShield",
          category: "Sunscreen",
          image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&auto=format&fit=crop&q=80",
          orderDate: "Aug 28, 2026",
          rating: 4,
          steps: [
            { stepNumber: 1, stage: "Intent Search", title: "Sunscreen Discovery", timestamp: "02:11 PM", details: "Searched: 'matte sunscreen zero white cast'", status: "Completed" },
            { stepNumber: 2, stage: "Product View", title: "Filter Evaluation", timestamp: "02:14 PM", details: "Inspected Zinc Oxide micronization & finish specs", status: "Completed" },
            { stepNumber: 3, stage: "Purchase", title: "Checkout", timestamp: "02:20 PM", details: "Direct purchase based on 4.9 rating", status: "Completed" },
            { stepNumber: 4, stage: "Usage Outcome", title: "Day 14 Feedback", timestamp: "Sep 11", details: "Logged: 'No eye sting, soft velvet matte finish'", status: "Completed" }
          ],
          primaryDrivers: ["No white cast guarantee", "Non-greasy dry touch finish", "High UVA/UVB PA++++ rating"],
          alternativeConsidered: {
            name: "Dewy Glow Fluid Sunscreen",
            brand: "GlowAura",
            whyNotChosen: "Dewy finish conflicted with oily skin preference."
          },
          outcomeCorrelation: {
            satisfactionRate: "92% Positive",
            verifiedMatch: true,
            retrospectiveNote: "Reinforced matte finish weight in your persistent profile."
          }
        }
      ];
    }

    res.status(200).json({
      success: true,
      count: replays.length,
      data: replays
    });
  } catch (error) {
    next(error);
  }
};
