const notificationModel = require("../models/notification.model");
const eventModel = require("../models/event.model");
const userModel = require("../models/user.model");

const updateInterests = async (req, res) => {
    console.log(req.body);  
  try {
    const { interests } = req.body;

    const user = await userModel
      .findByIdAndUpdate(req.user._id, { interests }, { new: true })
      .select("-password");

    res.json({
      message: "Interests updated",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  updateInterests,
};
