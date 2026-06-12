const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth.middleware");
const registrationController = require("../controllers/registration.controller");
router.get(
  "/my-registrations",
  protect,
  registrationController.getMyRegistration,
);
router.get("/participants/:eventId", protect, registrationController.getEventParticipants);

module.exports = router;
