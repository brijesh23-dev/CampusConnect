const router = require("express").Router();
const eventController = require("../controllers/event.controller");
const { protect, authorizeRoles } = require("../middleware/auth.middleware");
const { Cloudinary } = require("../config/CloudinaryConfig");
const multer = require("multer");

const imageUpload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only image files (jpg, png, gif, webp) are allowed"), false);
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB max
});

const uploadImageToCloudinary = (req, res, next) => {
  if (!req.file) return next();

  const uploadStream = Cloudinary.uploader.upload_stream(
    { folder: "events", resource_type: "image" },
    (error, result) => {
      if (error) return next(error);
      req.file.path = result.secure_url;
      req.file.filename = result.public_id;
      next();
    },
  );

  uploadStream.end(req.file.buffer);
};


router.post(
  "/create",
  protect,
  authorizeRoles("club"),
  imageUpload.single("image"),
  uploadImageToCloudinary,
  eventController.createEvent,
);
router.get("/all", eventController.getAllEvents);
router.get(
  "/my-events",
  protect,
  authorizeRoles("club", "admin"),
  eventController.getMyevents,
);
router.put(
  "/update/:id",
  protect,
  authorizeRoles("club", "admin"),
  imageUpload.single("image"),
  uploadImageToCloudinary,
  eventController.updateEvent,
);
router.delete(
  "/delete/:id",
  protect,
  authorizeRoles("club", "admin"),
  eventController.deleteEvent,
);
router.post(
  "/:id/register",
  protect,
  authorizeRoles("student"),
  eventController.registerForEvent
);
router.get(
  "/:id/participants",
  protect,
  authorizeRoles("club", "admin"),
  eventController.getParticipants,
);
router.patch(
  "/:id/status",
  protect,
  authorizeRoles("club"),
  eventController.updateEventStatus,
);
// /:id must come LAST — it is a wildcard catch-all
router.get("/:id", eventController.getsingleEvent);

module.exports = router;
