const registrationModel = require('../models/Registration.model');
const EventModel = require('../models/event.model');
const ApiError = require('../utils/ApiError');

const registerForEvent = async (req, res) => {
  const eventId = req.params.id;

  const event = await EventModel.findById(eventId);

  if (!event) throw new ApiError(404, "Event not found");

  const alreadyRegistered = await registrationModel.findOne({
    student: req.user._id,
    event: eventId,
  });

  if (alreadyRegistered) {
    throw new ApiError(400, "Already registered for this event");
  }

  const registration = await registrationModel.create({
    student: req.user._id,
    event: eventId,
  });

  res.status(201).json({
    success: true,
    message: "Registration successful",
    registration,
  });
};

const getMyRegistration = async (req, res) => {
  const registration = await registrationModel
    .find({ student: req.user._id })
    .populate("event");
  res.status(200).json({
    message: "fetched successful registrations",
    success: true,
    registration,
  });
};

const getEventParticipants = async (req, res) => {
  const eventParticipants = await registrationModel.find({
    event:req.params.eventId
  }).populate("student", "name email");
  res.status(200).json({
    success: true,
    participants: eventParticipants,
  });
};

const cancelRegistration = async (req, res) => {
  const registration = await registrationModel.findOne({
    _id: req.params.id,
    student: req.user._id,
  });

  if (!registration) throw new ApiError(404, "Registration not found");

  await registrationModel.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "Registration cancelled successfully",
    cancelledId: req.params.id,
  });
};

module.exports = {
  getMyRegistration,
  registerForEvent,
  getEventParticipants,
  cancelRegistration,
}