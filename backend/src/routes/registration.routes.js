const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth.middleware");
const registrationController = require("../controllers/registration.controller");
const catchAsync = require("../utils/catchAsync");

router.get(
  "/my-registrations",
  protect,
  catchAsync(registrationController.getMyRegistration),
);
router.get("/participants/:eventId", protect, catchAsync(registrationController.getEventParticipants));
router.delete("/:id", protect, catchAsync(registrationController.cancelRegistration));

module.exports = router;
