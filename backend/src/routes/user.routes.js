const express = require("express");
const router = express.Router();

const { updateInterests } = require("../controllers/user.Controller");
const { protect,authorizeRoles } = require("../middleware/auth.middleware");
router.put("/interests",protect,authorizeRoles('student'), updateInterests);

module.exports = router;
