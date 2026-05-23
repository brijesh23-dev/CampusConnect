const eventModel = require("../models/event.model");
const notificationModel = require("../models/notification.model");
const userModel = require("../models/user.model");
const createEvent = async (req, res) => {
  try {
    let { title, description, category, date, time, venue } = req.body;
    let newEvent = new eventModel({
      title,
      description,
      category,
      date,
      time,
      venue,
      club: req.user._id,
    });
        const interestedStudents = await UserModel.find({
      role: "student",
      interests: category,
    });
        const notifications = interestedStudents.map(
      (student) => ({
        user: student._id,
        event: event._id,
        message: `New ${category} event: ${title}`,
      })
    );
      if (notifications.length > 0) {
      await Notification.insertMany(notifications);
    }
    await newEvent.save();
    res.status(201).json({
      message: "Event created successfully",
      event: newEvent,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllEvents = async (req, res) => {
  let allevent = await eventModel.find().populate("club", "name email");
  console.log(allevent);
  res.status(200).json({
    message: "All events fetched successfully",
    events: allevent,
  });
};

const getsingleEvent = async (req, res) => {
  let { id } = req.params;
  let event = await eventModel.findById(id).populate("club", "name email");
  if (!event) {
    return res.status(404).json({
      message: "Event not found",
    });
  }
  res.status(200).json({
    message: "Event fetched successfully",
    event,
  });
};
const getMyevents = async (req, res) => {
  try {
    const events = await Event.find({ club: req.user._id }).sort({ date: 1 });

    res.json({ events });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.club.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );

    res.json({
      message: "Event updated successfully",
      event: updatedEvent,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.club.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await eventModel.findByIdAndDelete(req.params.id);

    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getsingleEvent,
  getMyevents,
  updateEvent,
  deleteEvent,
};
