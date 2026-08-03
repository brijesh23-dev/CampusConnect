const UserModel = require("../models/user.model");
const EventModel = require("../models/event.model");

const toPublicClub = async (user) => {
  const events = await EventModel.find({ club: user._id }).sort({ date: 1 }).lean();
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    description: user.description || "A student-led campus club creating opportunities to learn, connect, and participate.",
    category: user.category || user.interests?.[0] || "Campus life",
    membersCount: user.membersCount || 0,
    eventsCount: events.length,
    events,
    avatar: user.name?.[0]?.toUpperCase() || "C",
    createdAt: user.createdAt,
  };
};

const getAllClubs = async (req, res) => {
  try {
    const users = await UserModel.find({ role: "club" }).select("name email interests createdAt").lean();
    const clubs = await Promise.all(users.map(toPublicClub));
    res.json({ clubs });
  } catch (error) {
    res.status(500).json({ message: "Unable to load clubs" });
  }
};

const getClubById = async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.params.id, role: "club" }).select("name email interests createdAt").lean();
    if (!user) return res.status(404).json({ message: "Club not found" });
    res.json({ club: await toPublicClub(user) });
  } catch (error) {
    res.status(404).json({ message: "Club not found" });
  }
};

module.exports = { getAllClubs, getClubById };
