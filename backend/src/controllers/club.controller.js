const UserModel = require("../models/user.model");
const EventModel = require("../models/event.model");
const ApiError = require("../utils/ApiError");

const toPublicClub = async (user) => {
  const events = await EventModel.find({ club: user._id }).sort({ date: 1 }).lean();
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    description: user.description || "A student-led campus club creating opportunities to learn, connect, and participate.",
    category: user.category || user.interests?.[0] || "Campus life",
    website: user.website || "",
    membersCount: user.membersCount || 0,
    eventsCount: events.length,
    events,
    avatar: user.name?.[0]?.toUpperCase() || "C",
    createdAt: user.createdAt,
  };
};

// GET /api/clubs/profile — authenticated club's own profile
const getClubProfile = async (req, res) => {
  const user = await UserModel.findById(req.user._id).select("-password");
  if (!user || user.role !== "club") {
    throw new ApiError(403, "Not a club account");
  }
  const events = await EventModel.find({ club: user._id }).sort({ date: -1 }).lean();
  res.json({
    club: {
      _id: user._id,
      name: user.name,
      email: user.email,
      description: user.description || "",
      category: user.category || "",
      website: user.website || "",
      eventsCount: events.length,
      membersCount: user.membersCount || 0,
      createdAt: user.createdAt,
    },
  });
};

// PUT /api/clubs/profile — update authenticated club's profile
const updateClubProfile = async (req, res) => {
  const { name, description, category, website } = req.body;
  if (!name || !name.trim()) {
    throw new ApiError(400, "Club name cannot be empty");
  }

  const user = await UserModel.findByIdAndUpdate(
    req.user._id,
    { name: name.trim(), description, category, website },
    { new: true }
  ).select("-password");
  if (!user) throw new ApiError(404, "Club not found");
  res.json({
    message: "Profile updated",
    club: {
      _id: user._id,
      name: user.name,
      email: user.email,
      description: user.description,
      category: user.category,
      website: user.website,
      createdAt: user.createdAt,
    },
  });
};

const getAllClubs = async (req, res) => {
  const users = await UserModel.find({ role: "club" }).select("name email interests createdAt").lean();
  const clubs = await Promise.all(users.map(toPublicClub));
  res.json({ clubs });
};

const getClubById = async (req, res) => {
  const user = await UserModel.findOne({ _id: req.params.id, role: "club" }).select("name email interests createdAt").lean();
  if (!user) throw new ApiError(404, "Club not found");
  res.json({ club: await toPublicClub(user) });
};

module.exports = { getAllClubs, getClubById, getClubProfile, updateClubProfile };
