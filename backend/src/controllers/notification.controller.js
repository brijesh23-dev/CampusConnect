const Notification = require("../models/notification.model");
const ApiError = require("../utils/ApiError");

const getNotifications = async (req, res) => {
  const notifications = await Notification.find({
    user: req.user._id,
  })
    .populate({
      path: "event",
      populate: {
        path: "club",
        select: "name",
      },
    })
    .sort({ createdAt: -1 });

  res.json({ notifications });
};

const markAsRead = async (req, res) => {
  const notification = await Notification.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    { isRead: true },
    { new: true }
  );
  if (!notification) throw new ApiError(404, "Notification not found");

  res.json({
    message: "Notification marked as read",
    notification,
  });
};

module.exports = {
  getNotifications,
  markAsRead,
};