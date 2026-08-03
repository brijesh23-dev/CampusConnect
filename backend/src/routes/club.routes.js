const router = require("express").Router();
const { getAllClubs, getClubById } = require("../controllers/club.controller");

router.get("/all", getAllClubs);
router.get("/:id", getClubById);

module.exports = router;
