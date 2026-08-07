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
  try {
    const user = await UserModel.findById(req.user._id).select("-password");
    if (!user || user.role !== "club") {
      return res.status(403).json({ message: "Not a club account" });
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
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/clubs/profile — update authenticated club's profile
const updateClubProfile = async (req, res) => {
  try {
    const { name, description, category, website } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Club name cannot be empty" });
    }
    const user = await UserModel.findByIdAndUpdate(
      req.user._id,
      { name: name.trim(), description, category, website },
      { new: true }
    ).select("-password");
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
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
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

module.exports = { getAllClubs, getClubById, getClubProfile, updateClubProfile };
