import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import { User } from "../models/User.js";
import { Product } from "../models/Product.js";
import { Order } from "../models/Order.js";
import { Review } from "../models/Review.js";
import { NeedGap } from "../models/NeedGap.js";
import { BeautyOutcome } from "../models/BeautyOutcome.js";
import { BeautyJourney } from "../models/BeautyJourney.js";
import { CustomerPreference } from "../models/CustomerPreference.js";
import { seedProducts, seedUsers, seedNeedGaps } from "./seedData.js";

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/joyory";
    await mongoose.connect(mongoUri);
    console.log(`[Seeder] Connected to MongoDB: ${mongoUri}`);

    const adminOnly = process.argv.includes("--admin-only");

    if (adminOnly) {
      const adminData = seedUsers.find((u) => u.role === "admin");
      let admin = await User.findOne({ email: adminData.email });
      if (!admin) {
        admin = await User.create(adminData);
        console.log(`[Seeder] Admin created: ${admin.email}`);
      } else {
        console.log(`[Seeder] Admin already exists: ${admin.email}`);
      }
      process.exit(0);
    }

    // Clean existing records
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();
    await Review.deleteMany();
    await NeedGap.deleteMany();
    await BeautyOutcome.deleteMany();
    await BeautyJourney.deleteMany();
    await CustomerPreference.deleteMany();
    console.log("[Seeder] Cleared existing database records.");

    // Seed Users
    const createdUsers = [];
    for (const userData of seedUsers) {
      const user = await User.create(userData);
      createdUsers.push(user);
    }
    console.log(`[Seeder] Seeded ${createdUsers.length} users (Admin & Customer).`);

    const customer = createdUsers.find((u) => u.role === "customer");

    // Seed Products
    const createdProducts = await Product.insertMany(seedProducts);
    console.log(`[Seeder] Seeded ${createdProducts.length} realistic beauty products.`);

    // Seed Need Gaps
    await NeedGap.insertMany(seedNeedGaps);
    console.log(`[Seeder] Seeded ${seedNeedGaps.length} Customer Need Gap records.`);

    // Seed Initial Order for Customer
    const p1 = createdProducts[0];
    const p2 = createdProducts[1];
    const initialOrder = await Order.create({
      orderId: "JOY-10492",
      user: customer._id,
      items: [
        {
          product: p1._id,
          name: p1.name,
          image: p1.images[0],
          price: p1.price,
          quantity: 1
        },
        {
          product: p2._id,
          name: p2.name,
          image: p2.images[0],
          price: p2.price,
          quantity: 1
        }
      ],
      shippingAddress: {
        fullName: customer.name,
        phone: customer.phone,
        address: "Flat 402, Lotus Residency, Indiranagar",
        city: "Bengaluru",
        state: "Karnataka",
        pincode: "560038"
      },
      paymentMethod: "cod",
      subtotal: p1.price + p2.price,
      discount: 0,
      shippingFee: 0,
      totalAmount: p1.price + p2.price,
      status: "Delivered",
      hasFeedback: true,
      feedbackGiven: {
        rating: 5,
        texture: "Feels lighter than expected",
        fragrance: "None",
        comment: "Absolute holy grail for monsoon season. Completely non-greasy."
      },
      deliveredAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    });
    console.log("[Seeder] Seeded initial delivered order for customer.");

    // Seed Initial Outcome records
    await BeautyOutcome.create({
      user: customer._id,
      productId: p1._id.toString(),
      productName: p1.name,
      brand: p1.brand,
      category: p1.category,
      image: p1.images[0],
      orderId: initialOrder.orderId,
      status: "Preference Updated",
      usageDays: 14,
      feedback: {
        overallRating: 5,
        textureFeel: "Feels lighter than expected",
        breakoutOrReaction: "No reaction / Calmed skin",
        hydrationScore: 5,
        scentExperience: "None",
        repurchaseIntent: "Definitely will repurchase",
        comments: "Absorbs in under 15 seconds. Keeps T-zone matte all afternoon.",
        submittedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
      },
      learnedInsight: "Sensory feedback processed: Lightweight water gel verified. Lightweight texture affinity reinforced (+4%).",
      preferenceImpact: {
        calibratedAttributes: ["Lightweight Texture", "Hydration Balance", "Oil Control"],
        scoreShift: "Lightweight texture score increased to 96%"
      }
    });

    await BeautyOutcome.create({
      user: customer._id,
      productId: p2._id.toString(),
      productName: p2.name,
      brand: p2.brand,
      category: p2.category,
      image: p2.images[0],
      orderId: initialOrder.orderId,
      status: "Trying",
      usageDays: 5
    });
    console.log("[Seeder] Seeded Beauty Outcome Loop records.");

    // Seed Initial Journey
    await BeautyJourney.create({
      user: customer._id,
      events: [
        {
          type: "SEARCH",
          title: "Smart Discovery Search",
          description: "Natural query: 'lightweight moisturizer for oily skin under ₹800'",
          systemImpact: "Intent parsed: Extracted texture, skin type and budget filters.",
          timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
        },
        {
          type: "VIEW",
          title: "Inspected Product Specifications",
          description: `Viewed ${p1.name} (${p1.brand})`,
          productName: p1.name,
          productId: p1._id.toString(),
          systemImpact: "Active interest registered in Lightweight Gel category.",
          timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000 + 5000)
        },
        {
          type: "COMPARE",
          title: "Side-by-Side Comparison",
          description: `Compared ${p1.name} with ${p2.name}`,
          productName: p1.name,
          productId: p1._id.toString(),
          systemImpact: "Evaluating formulation, price point and ingredient trade-offs.",
          timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000 + 10000)
        },
        {
          type: "PURCHASE",
          title: "Order Placed",
          description: `Ordered 2 items • Total ₹${initialOrder.totalAmount}`,
          productName: p1.name,
          productId: p1._id.toString(),
          systemImpact: "Lifecycle transition: Added to Beauty Outcome Loop tracking.",
          timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        },
        {
          type: "FEEDBACK",
          title: "Product Experience Feedback",
          description: `Rated ${p1.name}: Feels lighter than expected`,
          productName: p1.name,
          productId: p1._id.toString(),
          systemImpact: "Continuous Learning: Lightweight texture affinity reinforced (+4%)",
          timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
        }
      ]
    });
    console.log("[Seeder] Seeded Beauty Journey timeline events.");

    // Seed Reviews
    await Review.create({
      user: customer._id,
      userName: customer.name,
      product: p1._id,
      rating: 5,
      title: "Best moisturizer for humid weather",
      comment: "Completely weightless. Does not trigger single breakout and looks invisible under sunscreen.",
      textureRating: "Just Right",
      skinType: "Combination",
      verifiedPurchase: true,
      status: "approved"
    });
    console.log("[Seeder] Seeded verified product reviews.");

    console.log("\n=======================================================");
    console.log("  JOYORY DATABASE SEEDING COMPLETED SUCCESSFULLY!  ");
    console.log("=======================================================");
    console.log("Admin Account:    admin@joyory.com     / Admin@Joyory2026");
    console.log("Customer Account: aria.chen@joyory.com / Customer@Joyory2026");
    console.log(`Total Products:   ${createdProducts.length}`);
    console.log("=======================================================\n");

    process.exit(0);
  } catch (error) {
    console.error("[Seeder] Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
