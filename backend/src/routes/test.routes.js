const express = require("express");
const router = express.Router();

const {
  protect,
  authorizeRoles,
} = require("../middleware/auth.Middleware");

router.get(
  "/student",
  protect,
  authorizeRoles("student"),
  (req, res) => {
    res.json({
      message: "Welcome Student",
    });
  }
);

router.get(
  "/club",
  protect,
  authorizeRoles("club"),
  (req, res) => {
    res.json({
      message: "Welcome Club",
    });
  }
);

router.get(
  "/admin",
  protect,
  authorizeRoles("admin"),
  (req, res) => {
    res.json({
      message: "Welcome Admin",
    });
  }
);

module.exports = router;