const Event = require("../models/event.model");
const Registration = require("../models/Registration.model");

const Analytics = async (req, res) => {
  const totalEvents = await Event.countDocuments({
    club: req.user._id,
  });
  const events = await Event.find({
    club: req.user._id,
  });

  const eventIds = events.map((event) => event._id);

  const recentRegistrations = await Registration.find({
    event: {
      $in: eventIds,
    },
  })
    .populate("student", "name")
    .populate("event", "title")
    .sort({ createdAt: -1 })
    .limit(5);

  const totalRegistrations = await Registration.countDocuments({
    event: {
      $in: eventIds,
    },
  });

  const upcomingEvents = await Event.countDocuments({
    club: req.user._id,
    date: {
      $gte: new Date(),
    },
  });

  const registrations = await Registration.aggregate([
    {
      $group: {
        _id: "$event",
        count: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        count: -1,
      },
    },
    {
      $limit: 1,
    },
  ]);

  const eventStats = await Registration.aggregate([
    {
      $match: {
        event: {
          $in: eventIds,
        },
      },
    },
    {
      $group: {
        _id: "$event",
        registrations: { $sum: 1 },
      },
    },
    {
      $sort: {
        registrations: -1,
      },
    },
  ]);

  const populatedStats = await Event.populate(eventStats, {
    path: "_id",
    select: "title",
  });

  res.status(201).json({
    upcomingEvents,
    registrations,
    totalEvents,
    totalRegistrations,
    recentRegistrations,
    eventStats: populatedStats,
  });
};

module.exports = {
  Analytics,
};
