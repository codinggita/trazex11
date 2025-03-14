// const express = require("express");
// const router = express.Router();
// const {
//     getActiveContests,
//     getContestsByDate,
//     updateContestStatus,
//     getAllContests
// } = require("../controllers/dateContestControllers");

// // ✅ Get active contests (excluding past contests)
// router.get("/active", getActiveContests);

// router.get("/all", getAllContests);

// // ✅ Get contest details dynamically when a user clicks "Join"
// // ✅ Get all contests for a specific date
// router.get("/contests/:date", getContestsByDate);

// // ✅ Update contest statuses manually
// router.post("/update-status", async (req, res) => {
//     try {
//         await updateContestStatus();
//         res.json({ status: "success", message: "Contest status updated" });
//     } catch (error) {
//         res.status(500).json({ status: "error", message: error.message });
//     }
// });

// module.exports = router;





















// const express = require("express");
// const router = express.Router();
// const {
//     getActiveContests,
//     getContestByDate,
//     updateContestStatus
// } = require("../controllers/dateContestControllers");

// // ✅ Get active contests (excluding past contests)
// router.get("/active", getActiveContests);

// // ✅ Get contest details dynamically when a user clicks "Join"
// router.get("/contest/:date", getContestByDate);

// // ✅ Update contest statuses manually
// router.post("/update-status", async (req, res) => {
//     try {
//         await updateContestStatus();
//         res.json({ status: "success", message: "Contest status updated" });
//     } catch (error) {
//         res.status(500).json({ status: "error", message: error.message });
//     }
// });

// module.exports = router;



















const express = require("express");
const router = express.Router();
const {
    getCategorizedContests,
    getContestsByDate,
    updateContestStatus
} = require("../controllers/dateContestControllers");

// ✅ Get categorized contests (Complete, Upcoming, Live)
router.get("/categorized", getCategorizedContests);

// ✅ Get contests for a specific date
router.get("/contests/:date", getContestsByDate);

// ✅ Manually update contest status
router.post("/update-status", async (req, res) => {
    try {
        await updateContestStatus();
        res.json({ status: "success", message: "Contest status updated" });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

module.exports = router;
