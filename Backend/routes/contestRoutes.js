// const express = require("express");
// const router = express.Router();
// const contestController = require("../controllers/contestController");

// // Get all contests
// router.get("/contests", contestController.getAllContests);

// // Get contests by date
// router.get("/contests-by-date/:date", contestController.getContestsByDate);

// // Create a new contest
// router.post("/contests", contestController.createContest);

// // Join a contest with a limit check
// router.post("/contests/join", contestController.joinContest);

// // Delete a contest
// router.delete("/contests/:contestId", contestController.deleteContest);

// // Get users and their teams in a contest
// router.get("/contests/:contestId/participants", contestController.getContestParticipants);

// module.exports = router;



// const express = require("express");
// const {
//     getAllContests,
//     getContestsByDateAndExchange, // ✅ New function
//     createContest,
//     joinContest,
//     deleteContest,
//     getContestParticipants,
//     getContestsByDate,
//     getUserContests,
//     getTeamForContest
// } = require("../controllers/contestController");
// const router = express.Router();

// // const authenticateUser = require("../middlewares/authMiddleware"); // If using authentication middleware


// // Define routes
// router.get("/", getAllContests);

// // ✅ Fetch contests by date & exchange
// router.get("/date/:date/exchange/:exchange", getContestsByDateAndExchange);

// router.post("/create", createContest);
// router.post("/join", joinContest);
// router.delete("/delete/:contestId", deleteContest);
// router.get("/participants/:contestId", getContestParticipants);

// router.get("/user/:userId", getUserContests);
// router.get("/teams/:userId/:contestId", getTeamForContest);

// router.get("/contests", getContestsByDate);


// module.exports = router;






const express = require("express");
const {
    getAllContests,
    getContestsByDateAndExchange,
    createContest,
    joinContest,
    deleteContest,
    getContestParticipants,
    getContestsByDate,
    getUserContests,
    getTeamForContest
} = require("../controllers/contestController");
const router = express.Router();

// Define routes
router.get("/", getAllContests);

// Fetch contests by date & exchange
router.get("/date/:date/exchange/:exchange", getContestsByDateAndExchange);

router.post("/create", createContest);
router.post("/join", joinContest);
router.delete("/delete/:contestId", deleteContest);
router.get("/participants/:contestId", getContestParticipants);

router.get("/user/:userId", getUserContests);
router.get("/teams/:userId/:contestId", getTeamForContest);

router.get("/contests", getContestsByDate);

module.exports = router;