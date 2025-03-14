const express = require("express");
const router = express.Router();
const contestController = require("../controllers/newcontestControllers");


console.log("Contest Controller:", contestController);

// Ensure these functions exist in `contestController.js`
router.post("/create-contests", contestController.createContestsForAllDates);
router.post("/join-contest", contestController.joinContest);

router.get('/create-contests', contestController.getContests);

module.exports = router;
