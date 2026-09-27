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

// TEMPORARY TEST ROUTE
router.get("/cloudinary-test", async (req, res) => {
  try {
    const result = await Cloudinary.api.resources({
      resource_type: "image",
      max_results: 1,
    });

    res.json({
      success: true,
      resources: result.resources.length,
    });
  } catch (error) {
    console.error("Cloudinary test error:", error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

router.get("/cloudinary-upload-test", async (req, res) => {
  try {
    const buffer = Buffer.from(
      "This is a Cloudinary upload test"
    );

    // const uploadStream = Cloudinary.uploader.upload_stream(
    //   {
    //     folder: "events",
    //     resource_type: "raw",
    //   },
    //   (error, result) => {
    //     if (error) {
    //       console.error("UPLOAD TEST ERROR:", error);
    //       return res.status(500).json({
    //         success: false,
    //         error: error.message,
    //       });
    //     }

    //     res.json({
    //       success: true,
    //       url: result.secure_url,
    //       publicId: result.public_id,
    //     });
    //   }
    // );

    const uploadStream = Cloudinary.uploader.upload_stream(
      (error, result) => {
  if (error) {
    console.error("CLOUDINARY UPLOAD ERROR:", error);
    console.error("CLOUDINARY ERROR MESSAGE:", error.message);
    console.error("CLOUDINARY ERROR HTTP CODE:", error.http_code);

    return next(error);
  }

  req.file.path = result.secure_url;
  req.file.filename = result.public_id;
  next();
}
    )

    uploadStream.end(buffer);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

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
