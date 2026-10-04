const EventModel = require("../models/event.model");
const Notification = require("../models/notification.model");
const UserModel = require("../models/user.model");
const RegistrationModel = require("../models/Registration.model");
const socketService = require("../socket/socketService");
const ApiError = require("../utils/ApiError");

const createEvent = async (req, res) => {
  let {
    title,
    description,
    category,
    date,
    startTime,
    endTime,
    venue,
    status,
    maxParticipants,
    tags,
  } = req.body;
  let parseTags = [];
  if (tags) {
    try {
      parseTags = Array.isArray(tags) ? tags : JSON.parse(tags);
    } catch (error) {
      return res.status(400).json({
        message: "Invalid tags format",
      });
    }
  }
  let newEvent = new EventModel({
    title,
    description,
    category,
    tags: parseTags,
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
  const students = await UserModel.find({ role: "student" }, "_id interests");

  const notifications = students.map((student) => {
    const isInterested = student.interests?.includes(category);

    return {
      user: student._id,
      event: newEvent._id,
      message: isInterested
        ? `New ${category} event: ${title} matches your interests.`
        : `New ${category} event: ${title}`,
      type: isInterested ? "interest" : "general",
    };
  });

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
    throw new ApiError(404, "Event not found");
  }
  res.status(200).json({
    message: "Event fetched successfully",
    event,
  });
};

const getMyevents = async (req, res) => {
  const events = await EventModel.find({ club: req.user._id }).sort({
    date: 1,
  });
  res.json({ events });
};

const updateEvent = async (req, res) => {
  const event = await EventModel.findById(req.params.id);

  if (!event) {
   throw new ApiError(404, "Event not found");
  }

  if (event.club.toString() !== req.user._id.toString()) {
    throw new ApiError(403,"Not allowed");
  }

  // Build update object from body fields (FormData-safe)
  const {
    title,
    description,
    category,
    date,
    startTime,
    endTime,
    venue,
    status,
    maxParticipants,
  } = req.body;
  const updateData = {
    title,
    description,
    category,
    date,
    startTime,
    endTime,
    venue,
  };

  // Allow status changes via full edit form
  if (status) updateData.status = status;
  if (maxParticipants !== undefined)
    updateData.maxParticipants = maxParticipants
      ? Number(maxParticipants)
      : null;

  // If a new image was uploaded via multer → Cloudinary, use its URL
  if (req.file?.path) {
    updateData.image = req.file.path;
  }
  // Remove undefined fields to avoid overwriting with undefined
  Object.keys(updateData).forEach(
    (k) => updateData[k] === undefined && delete updateData[k],
  );

  const updatedEvent = await EventModel.findByIdAndUpdate(
    req.params.id,
    updateData,
    { returnDocument: "after", runValidators: true },
  );

  res.json({
    message: "Event updated successfully",
    event: updatedEvent,
  });
};

// PATCH /events/:id/status — quick status-only update for club owners
const updateEventStatus = async (req, res) => {
  const { status } = req.body;
  const validStatuses = ["draft", "published", "cancelled"];
  if (!status || !validStatuses.includes(status)) {
    throw new ApiError(400, "Invalide status value.");
  }

  const event = await EventModel.findById(req.params.id);
  if (!event) throw new ApiError(404, "Event not found");

  if (event.club.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Not allowed");
  }

  event.status = status;
  await event.save();

  res.json({ message: "Status updated", event });
};

const deleteEvent = async (req, res) => {
  const event = await EventModel.findById(req.params.id);

  if (!event) {
    throw new ApiError(404, "Event not found");
  }

  if (event.club.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Not allowed");
  }

  await EventModel.findByIdAndDelete(req.params.id);
  res.json({ message: "Event deleted successfully" });
};

const registerForEvent = async (req, res) => {
  const eventId = req.params.id;
  const event = await EventModel.findById(eventId);

  if (!event) {
    throw new ApiError(404, "Event not found");
  }

  const alreadyRegistered = await RegistrationModel.findOne({
    student: req.user._id,
    event: eventId,
  });

  if (alreadyRegistered) {
    throw new ApiError(409, "Aready registered for this event");
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
};

const getParticipants = async (req, res) => {
    const registrations = await RegistrationModel.find({
      event: req.params.id,
    }).populate("student", "name email");

    res.status(200).json({
      success: true,
      participants: registrations,
    });
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
