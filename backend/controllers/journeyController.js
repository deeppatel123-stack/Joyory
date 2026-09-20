import { BeautyJourney } from "../models/BeautyJourney.js";

export const getJourneyEvents = async (req, res, next) => {
  try {
    let journey = await BeautyJourney.findOne({ user: req.user._id });
    if (!journey) {
      journey = await BeautyJourney.create({
        user: req.user._id,
        events: []
      });
    }

    res.status(200).json({
      success: true,
      data: journey.events
    });
  } catch (error) {
    next(error);
  }
};

export const addJourneyEvent = async (req, res, next) => {
  try {
    const { type, title, description, productName, productId, systemImpact } = req.body;

    let journey = await BeautyJourney.findOne({ user: req.user._id });
    if (!journey) {
      journey = new BeautyJourney({ user: req.user._id, events: [] });
    }

    journey.events.push({
      type,
      title,
      description,
      productName,
      productId,
      systemImpact,
      timestamp: new Date()
    });

    await journey.save();

    res.status(201).json({
      success: true,
      data: journey.events[journey.events.length - 1]
    });
  } catch (error) {
    next(error);
  }
};
