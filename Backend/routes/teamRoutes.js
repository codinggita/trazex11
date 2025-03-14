
const express = require("express");
const router = express.Router();
const { createTeam, getTeamsByUser } = require("../controllers/teamControllers");

router.post("/create-team", createTeam);
router.get("/user/:userId", getTeamsByUser);

module.exports = router;

