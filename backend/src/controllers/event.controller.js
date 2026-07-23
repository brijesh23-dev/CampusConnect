const EventModel = require("../models/event.model");
const Notification = require("../models/notification.model");
const UserModel = require("../models/user.model");
const RegistrationModel = require("../models/Registration.model");

const createEvent = async (req, res) => {
  console.log("body:", req.body);
  console.log("file:", req.file);
  console.log("user:", req.user);
  try {
    let { title, description, category, date,startTime,endTime, venue } = req.body;
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
      await Notification.insertMany(notifications);
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
  let filter = {};
   let { search,category } = req.query;
   if(category){
    filter.category = category;
   }

   if(search){
    filter.title = {
    $regex:search,
    $options:"i"
    }
   }
   const events = await EventModel.find(filter);
  let allevent = await EventModel.find().populate("club", "name email");
  console.log(allevent);
  res.status(200).json({
    message: "All events fetched successfully",
    events: allevent,
    events
  });
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

    const updatedEvent = await EventModel.findByIdAndUpdate(
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
  deleteEvent,
  registerForEvent,
  getParticipants,
};
