
const express = require("express");
const router = express.Router();
const { createTeam, getTeamsByUser, getTeamById } = require("../controllers/teamControllers");

router.post("/create-team", createTeam);
router.get("/user/:userId", getTeamsByUser);
router.get("/:teamId", getTeamById);

module.exports = router;

