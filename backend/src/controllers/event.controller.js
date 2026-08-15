const EventModel = require("../models/event.model");
const Notification = require("../models/notification.model");
const UserModel = require("../models/user.model");
const RegistrationModel = require("../models/Registration.model");
const socketService = require("../socket/socketService");


const createEvent = async (req, res) => {

  try {
    let { title, description, category, date, startTime, endTime, venue, status, maxParticipants } = req.body;
    let newEvent = new EventModel({
      title,
      description,
      category,
      date,
      startTime,
      endTime,
      venue,
      club: req.user._id,
      image: req.file ? req.file.path : null || req.body.image,
      // If caller explicitly sets status (e.g. "draft"), honour it; otherwise default ("published")
      ...(status && { status }),
      ...(maxParticipants && { maxParticipants: Number(maxParticipants) }),
    });

    await newEvent.save();

    const interestedStudents = await UserModel.find({
      role: "student",
      interests: category,
    });
    const notifications = interestedStudents.map((student) => ({
      user: student._id,
      event: newEvent._id,
      message: `New ${category} event: ${title}`,
    }));
    if (notifications.length > 0) {
      const saved = await Notification.insertMany(notifications);

      // Push each notification in real-time via Socket.IO
      saved.forEach((notif) => {
        socketService.sendToUser(notif.user, "new-notification", {
          _id: notif._id,
          message: notif.message,
          event: { _id: newEvent._id, title: newEvent.title },
          isRead: false,
          createdAt: notif.createdAt,
        });
      });
    }
    res.status(201).json({
      message: "Event created successfully",
      event: newEvent,
    });
  } catch (error) {
    console.log("error:", error.stack);
    res.status(500).json({ message: error.message });
  }
};

const getAllEvents = async (req, res) => {
  // Return published events (+ legacy "approved" value) to the public
  let filter = { status: { $in: ["published", "approved"] } };
  let { search, category } = req.query;
  if (category) {
    filter.category = category;
  }
  if (search) {
    filter.title = {
      $regex: search,
      $options: "i",
    };
  }
  try {
    const events = await EventModel.find(filter)
      .populate("club", "name email")
      .sort({ date: -1 });
    res.status(200).json({
      message: "All events fetched successfully",
      events,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getsingleEvent = async (req, res) => {
  let { id } = req.params;
  let event = await EventModel.findById(id).populate("club", "name email");
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
  //console.log(req.user);
  try {
    const events = await EventModel.find({ club: req.user._id }).sort({
      date: 1,
    });
    res.json({ events });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateEvent = async (req, res) => {
  try {
    const event = await EventModel.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.club.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    // Build update object from body fields (FormData-safe)
    const { title, description, category, date, startTime, endTime, venue, status, maxParticipants } = req.body;
    const updateData = { title, description, category, date, startTime, endTime, venue };

    // Allow status changes via full edit form
    if (status) updateData.status = status;
    if (maxParticipants !== undefined) updateData.maxParticipants = maxParticipants ? Number(maxParticipants) : null;

    // If a new image was uploaded via multer → Cloudinary, use its URL
    if (req.file?.path) {
      updateData.image = req.file.path;
    }
    // Remove undefined fields to avoid overwriting with undefined
    Object.keys(updateData).forEach((k) => updateData[k] === undefined && delete updateData[k]);

    const updatedEvent = await EventModel.findByIdAndUpdate(
      req.params.id,
      updateData,
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

// PATCH /events/:id/status — quick status-only update for club owners
const updateEventStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ["draft", "published", "cancelled"];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const event = await EventModel.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.club.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    event.status = status;
    await event.save();

    res.json({ message: "Status updated", event });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deleteEvent = async (req, res) => {
  try {
    const event = await EventModel.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.club.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await EventModel.findByIdAndDelete(req.params.id);

    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const registerForEvent = async (req, res) => {
  try {
    const eventId = req.params.id;

    const event = await EventModel.findById(eventId);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    const alreadyRegistered = await RegistrationModel.findOne({
      student: req.user._id,
      event: eventId,
    });

    if (alreadyRegistered) {
      return res.status(400).json({
        message: "Already registered for this event",
      });
    }

    const registration = await RegistrationModel.create({
      student: req.user._id,
      event: eventId,
    });

    res.status(201).json({
      success: true,
      message: "Registration successful",
      registration,
    });

    // Push a real-time confirmation to the registering student
    const registeredEvent = await EventModel.findById(eventId).select("title");
    socketService.sendToUser(req.user._id, "new-notification", {
      _id: `reg-${registration._id}`,
      message: `You're registered for "${registeredEvent?.title || "an event"}"!`,
      event: { _id: eventId, title: registeredEvent?.title },
      isRead: false,
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getParticipants = async (req, res) => {
  try {
    const registrations = await RegistrationModel.find({
      event: req.params.id,
    }).populate("student", "name email");

    res.status(200).json({
      success: true,
      participants: registrations,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getsingleEvent,
  getMyevents,
  updateEvent,
  updateEventStatus,
  deleteEvent,
  registerForEvent,
  getParticipants,
};
