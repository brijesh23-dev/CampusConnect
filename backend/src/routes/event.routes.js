const router = require("express").Router();
const eventController = require("../controllers/event.controller");
const { protect, authorizeRoles } = require("../middleware/auth.middleware");
const { Cloudinary } = require("../config/CloudinaryConfig");
const multer = require("multer");
const createEventSchema = require("../validations/event.validation");
const validate = require("../middleware/validation.middleware");
const catchAsync = require("../utils/catchAsync");

const imageUpload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    const allowed = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error("Only image files (jpg, png, gif, webp) are allowed"),
        false,
      );
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
  validate(createEventSchema),
  imageUpload.single("image"),
  uploadImageToCloudinary,
  catchAsync(eventController.createEvent),
);

router.get("/all", eventController.getAllEvents);

router.get(
  "/my-events",
  protect,
  authorizeRoles("club", "admin"),
  catchAsync(eventController.getMyevents),
);

router.put(
  "/update/:id",
  protect,
  authorizeRoles("club", "admin"),
  validate(createEventSchema),
  imageUpload.single("image"),
  uploadImageToCloudinary,
  catchAsync(eventController.updateEvent),
);
router.delete(
  "/delete/:id",
  protect,
  authorizeRoles("club", "admin"),
  catchAsync(eventController.deleteEvent),
);
router.post(
  "/:id/register",
  protect,
  authorizeRoles("student"),
  catchAsync(eventController.registerForEvent),
);
router.get(
  "/:id/participants",
  protect,
  authorizeRoles("club", "admin"),
  catchAsync(eventController.getParticipants),
);
router.patch(
  "/:id/status",
  protect,
  authorizeRoles("club"),
  catchAsync(eventController.updateEventStatus),
);
// /:id must come LAST — it is a wildcard catch-all
router.get("/:id", eventController.getsingleEvent);

module.exports = router;
