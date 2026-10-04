const UserModel = require("../models/user.model");
const EventModel = require("../models/event.model");
const RegistrationModel = require("../models/Registration.model");
const ApiError = require("../utils/ApiError");

// GET /api/admin/stats  — platform-wide numbers for dashboard cards
const getStats = async (req, res) => {
  const totalUsers = await UserModel.countDocuments();
  const totalStudents = await UserModel.countDocuments({ role: "student" });
  const totalClubs = await UserModel.countDocuments({ role: "club" });
  const totalEvents = await EventModel.countDocuments();
  const totalRegistrations = await RegistrationModel.countDocuments();

  res.json({
    totalUsers,
    totalStudents,
    totalClubs,
    totalEvents,
    totalRegistrations,
  });
};

// GET /api/admin/users  — all users (students, clubs, admins)
const getAllUsers = async (req, res) => {
  const { role, search } = req.query;
  let filter = {};
  if (role && role !== "all") filter.role = role;
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }
  const users = await UserModel.find(filter)
    .select("-password")
    .sort({ createdAt: -1 });
  res.json({ users });
};

// DELETE /api/admin/users/:id  — delete a user
const deleteUser = async (req, res) => {
  const user = await UserModel.findById(req.params.id);
  if (!user) throw new ApiError(404, "User not found");
  if (user.role === "admin") {
    throw new ApiError(403, "Cannot delete admin accounts");
  }
  await UserModel.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted successfully" });
};

// GET /api/admin/events  — all events with club info
const getAllEvents = async (req, res) => {
  const { search, category } = req.query;
  let filter = {};
  if (category && category !== "all") filter.category = category;
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { venue: { $regex: search, $options: "i" } },
    ];
  }
  const events = await EventModel.find(filter)
    .populate("club", "name email")
    .sort({ date: -1 });
  res.json({ events });
};

// DELETE /api/admin/events/:id  — remove an event
const deleteAdminEvent = async (req, res) => {
  const event = await EventModel.findByIdAndDelete(req.params.id);
  if (!event) throw new ApiError(404, "Event not found");
  res.json({ message: "Event deleted successfully" });
};

// PATCH /api/admin/users/:id/role  — toggle user role (student ↔ club)
const updateUserRole = async (req, res) => {
  const { role } = req.body;
  if (!["student", "club"].includes(role)) {
    throw new ApiError(400, "Role must be 'student' or 'club'");
  }
  const user = await UserModel.findById(req.params.id);
  if (!user) throw new ApiError(404, "User not found");
  if (user.role === "admin") {
    throw new ApiError(403, "Cannot change admin role");
  }
  user.role = role;
  await user.save();
  res.json({ message: "Role updated", user: { _id: user._id, role: user.role } });
};

// GET /api/admin/analytics  — platform-wide analytics
const getPlatformAnalytics = async (req, res) => {
  const totalUsers = await UserModel.countDocuments();
  const totalStudents = await UserModel.countDocuments({ role: "student" });
  const totalClubs = await UserModel.countDocuments({ role: "club" });
  const totalEvents = await EventModel.countDocuments();
  const totalRegistrations = await RegistrationModel.countDocuments();

  // Registrations per event (top 8)
  const registrationsByEvent = await RegistrationModel.aggregate([
    { $group: { _id: "$event", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 8 },
  ]);
  const populated = await EventModel.populate(registrationsByEvent, {
    path: "_id",
    select: "title category",
  });

  // Category breakdown
  const categoryBreakdown = await EventModel.aggregate([
    { $group: { _id: "$category", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);

  // Top clubs by registration count
  const topClubs = await RegistrationModel.aggregate([
    {
      $lookup: {
        from: "events",
        localField: "event",
        foreignField: "_id",
        as: "eventData",
      },
    },
    { $unwind: "$eventData" },
    { $group: { _id: "$eventData.club", registrations: { $sum: 1 } } },
    { $sort: { registrations: -1 } },
    { $limit: 5 },
  ]);
  const topClubsPopulated = await UserModel.populate(topClubs, {
    path: "_id",
    select: "name",
  });

  res.json({
    stats: { totalUsers, totalStudents, totalClubs, totalEvents, totalRegistrations },
    registrationsByEvent: populated,
    categoryBreakdown,
    topClubs: topClubsPopulated,
  });
};

// PATCH /api/admin/events/:id/approve — approve a pending event
const approveEvent = async (req, res) => {
  const event = await EventModel.findById(req.params.id);
  if (!event) throw new ApiError(404, "Event not found");
  event.status = "approved";
  await event.save();
  res.json({ message: "Event approved", event });
};

module.exports = {
  getStats,
  getAllUsers,
  deleteUser,
  getAllEvents,
  deleteAdminEvent,
  approveEvent,
  getPlatformAnalytics,
  updateUserRole,
};
