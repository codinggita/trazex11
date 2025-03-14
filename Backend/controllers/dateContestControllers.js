// const DateContest = require("../models/DateContest");
// const moment = require("moment-timezone");

// const TIMEZONE = "Asia/Kolkata";

// exports.getActiveContests = async (req, res) => {
//     try {
//         const now = moment().tz(TIMEZONE);
//         const todayDate = now.format("D MMM");
//         const timeNow = now.format("HH:mm");

//         const activeContests = await DateContest.find({
//             date: { $ne: todayDate },
//         });

//         if (timeNow <= "09:10") {
//             const todayContest = await DateContest.findOne({ date: todayDate });
//             if (todayContest) {
//                 activeContests.unshift(todayContest);
//             }
//         }

//         return res.json({ status: "success", contests: activeContests });
//     } catch (error) {
//         return res.status(500).json({ status: "error", message: error.message });
//     }
// };

// exports.getConcludedContests = async (req, res) => {
//     try {
//         const concludedContests = await DateContest.find({ status: "concluded" });
//         return res.json({ status: "success", contests: concludedContests });
//     } catch (error) {
//         return res.status(500).json({ status: "error", message: error.message });
//     }
// };

// exports.updateContestStatus = async () => {
//     try {
//         const now = moment().tz(TIMEZONE);
//         const todayDate = now.format("D MMM");
//         const timeNow = now.format("HH:mm");

//         // Move today's contest to "concluded" after 3:31 PM
//         if (timeNow >= "15:31") {
//             await DateContest.updateOne(
//                 { date: todayDate },
//                 { $set: { status: "concluded" } }
//             );

//             // Create next day's contest if not exists
//             const futureMoment = moment().tz(TIMEZONE).add(1, "days");
//             const nextDate = futureMoment.format("D MMM");
//             const nextDay = futureMoment.format("ddd").toUpperCase();

//             const nextContestExists = await DateContest.findOne({ date: nextDate });
//             if (!nextContestExists) {
//                 await DateContest.create({
//                     exchange: "NSE",
//                     date: nextDate,
//                     day: nextDay,
//                     endTime: "15:30",
//                     status: "upcoming",
//                 });
//             }
//         }
//     } catch (error) {
//         console.error("Error updating contest status:", error);
//     }
// };

// exports.createContest = async (req, res) => {
//     try {
//         const { exchange, date, day, endTime } = req.body;

//         const existingContest = await DateContest.findOne({ date });
//         if (existingContest) {
//             return res.status(400).json({ status: "error", message: "Contest already exists for this date" });
//         }

//         const newContest = new DateContest({
//             exchange,
//             date,
//             day,
//             endTime,
//             status: "upcoming",
//         });

//         await newContest.save();
//         res.json({ status: "success", contest: newContest });
//     } catch (error) {
//         res.status(500).json({ status: "error", message: error.message });
//     }
// };

// // Run status update every minute (for automation)
// setInterval(exports.updateContestStatus, 60000);









// const DateContest = require("../models/DateContest");
// const moment = require("moment-timezone");

// const TIMEZONE = "Asia/Kolkata";

// // ✅ Get contest details for a specific date (when a user clicks "Join")
// // ✅ Get all contests for a specific date
// exports.getContestsByDate = async (req, res) => {
//     try {
//         const { date } = req.params; // Extract date from request URL

//         // Fetch all contests for the given date
//         const contests = await DateContest.find({ date });

//         // Check if contests exist for that date
//         if (!contests.length) {
//             return res.status(404).json({ status: "error", message: "No contests found for this date." });
//         }

//         return res.json({ status: "success", contests });
//     } catch (error) {
//         return res.status(500).json({ status: "error", message: error.message });
//     }
// };


// // ✅ Get active contests (excluding concluded ones)
// exports.getActiveContests = async (req, res) => {
//     try {
//         const now = moment().tz(TIMEZONE);
//         const todayDate = now.format("D MMM"); // Format: "26 FEB"

//         // Fetch only upcoming or ongoing contests (excluding concluded and past ones)
//         const activeContests = await DateContest.find({
//             status: { $in: ["upcoming", "ongoing"] },
//             date: { $gte: todayDate } // Ensures past contests are not included
//         });

//         return res.json({ status: "success", contests: activeContests });
//     } catch (error) {
//         return res.status(500).json({ status: "error", message: error.message });
//     }
// };


// // ✅ Update contest statuses automatically
// // exports.updateContestStatus = async () => {
// //     try {
// //         const now = moment().tz(TIMEZONE);
// //         const todayDate = now.format("D MMM");
// //         const timeNow = now.format("HH:mm");

// //         // Move today's contest to "concluded" after 3:31 PM
// //         if (timeNow >= "15:31") {
// //             await DateContest.updateOne(
// //                 { date: todayDate },
// //                 { $set: { status: "concluded" } }
// //             );

// //             // Create next day's contest dynamically if not exists
// //             const futureMoment = moment().tz(TIMEZONE).add(1, "days");
// //             const nextDate = futureMoment.format("D MMM");
// //             const nextDay = futureMoment.format("ddd").toUpperCase();

// //             const nextContestExists = await DateContest.findOne({ date: nextDate });
// //             if (!nextContestExists) {
// //                 await DateContest.insertMany([
// //                     {
// //                         exchange: "NSE",
// //                         date: nextDate,
// //                         day: nextDay,
// //                         endTime: "15:30",
// //                         status: "upcoming",
// //                     },
// //                     {
// //                         exchange: "BSE",
// //                         date: nextDate,
// //                         day: nextDay,
// //                         endTime: "15:30",
// //                         status: "upcoming",
// //                     }
// //                 ]);
// //             }
// //         }
// //     } catch (error) {
// //         console.error("Error updating contest status:", error);
// //     }
// // };

// exports.updateContestStatus = async () => {
//     try {
//         const now = moment().tz(TIMEZONE);
//         const todayDate = now.format("D MMM");
//         const todayDay = now.format("ddd").toUpperCase();
//         const timeNow = now.format("HH:mm");

//         // ✅ Ensure today's contest exists
//         const todayContestExists = await DateContest.findOne({ date: todayDate });
//         if (!todayContestExists) {
//             await DateContest.insertMany([
//                 {
//                     exchange: "NSE",
//                     date: todayDate,
//                     day: todayDay,
//                     endTime: "15:30",
//                     status: "ongoing",
//                 },
//                 {
//                     exchange: "BSE",
//                     date: todayDate,
//                     day: todayDay,
//                     endTime: "15:30",
//                     status: "ongoing",
//                 }
//             ]);
//         }
//         // Show Status Ongoing 
//          if (timeNow >= "9:10" && timeNow<= "15:30"){
//             await DateContest.updateMany(
//                 { date: todayDate },
//                 { $set: { status: "ongoing" } }
//             );
//          }
//         // ✅ Move today's contest to "concluded" after 3:31 PM
//         if (timeNow >= "15:31") {
//             await DateContest.updateMany(
//                 { date: todayDate },
//                 { $set: { status: "concluded" } }
//             );
//         }

//         // ✅ Ensure next day's contest exists
//         const futureMoment = now.add(1, "days");
//         const nextDate = futureMoment.format("D MMM");
//         const nextDay = futureMoment.format("ddd").toUpperCase();

//         const nextContestExists = await DateContest.findOne({ date: nextDate });
//         if (!nextContestExists) {
//             await DateContest.insertMany([
//                 {
//                     exchange: "NSE",
//                     date: nextDate,
//                     day: nextDay,
//                     endTime: "15:30",
//                     status: "upcoming",
//                 },
//                 {
//                     exchange: "BSE",
//                     date: nextDate,
//                     day: nextDay,
//                     endTime: "15:30",
//                     status: "upcoming",
//                 }
//             ]);
//         }
//     } catch (error) {
//         console.error("Error updating contest status:", error);
//     }
// };


// // 🕒 Run status update automatically every minute
// setInterval(exports.updateContestStatus, 60000);


























// const DateContest = require("../models/DateContest");
// const moment = require("moment-timezone");

// const TIMEZONE = "Asia/Kolkata";

// // ✅ Get contest details for a specific date (when a user clicks "Join")
// // ✅ Get all contests for a specific date
// exports.getContestsByDate = async (req, res) => {
//     try {
//         const { date } = req.params; // Extract date from request URL

//         // Fetch all contests (NSE & BSE) for the given date
//         const contests = await DateContest.find({ date });

//         // Check if contests exist for that date
//         if (!contests.length) {
//             return res.status(404).json({ status: "error", message: "No contests found for this date." });
//         }

//         return res.json({ status: "success", contests });
//     } catch (error) {
//         return res.status(500).json({ status: "error", message: error.message });
//     }
// };

// // ✅ Get active contests (including NSE & BSE, excluding concluded ones)
// exports.getActiveContests = async (req, res) => {
//     try {
//         const now = moment().tz(TIMEZONE);
//         const todayDate = now.format("D MMM"); // Format: "26 FEB"

//         // Fetch upcoming & ongoing contests for both NSE & BSE
//         const activeContests = await DateContest.find({
//             date: todayDate,
//             status: { $in: ["upcoming", "ongoing"] } // Ensure past (concluded) contests are excluded
//         });

//         return res.json({ status: "success", contests: activeContests });
//     } catch (error) {
//         return res.status(500).json({ status: "error", message: error.message });
//     }
// };

// // ✅ Update contest status automatically based on time
// exports.updateContestStatus = async () => {
//     try {
//         const now = moment().tz(TIMEZONE);
//         const todayDate = now.format("D MMM");
//         const todayDay = now.format("ddd").toUpperCase();
//         const timeNow = now.format("HH:mm");

//         // Define trading times
//         const startTradingTime = "09:10";
//         const endTradingTime = "15:30";
//         const postMarketTime = "15:31";

//         // ✅ Ensure today's contests exist (for both NSE & BSE)
//         const todayContests = await DateContest.find({ date: todayDate });
//         if (todayContests.length < 2) {
//             const missingExchanges = ["NSE", "BSE"].filter(exchange =>
//                 !todayContests.some(contest => contest.exchange === exchange)
//             );

//             if (missingExchanges.length > 0) {
//                 const newContests = missingExchanges.map(exchange => ({
//                     exchange,
//                     date: todayDate,
//                     day: todayDay,
//                     endTime: "15:30",
//                     status: "ongoing"
//                 }));

//                 await DateContest.insertMany(newContests);
//             }
//         }

//         // ✅ Update contest status correctly
//         if (timeNow >= startTradingTime && timeNow <= endTradingTime) {
//             await DateContest.updateMany(
//                 { date: todayDate },
//                 { $set: { status: "ongoing" } }
//             );
//         } else if (timeNow >= postMarketTime) {
//             await DateContest.updateMany(
//                 { date: todayDate },
//                 { $set: { status: "concluded" } }
//             );
//         }

//         // ✅ Ensure next day's contests exist (for both NSE & BSE)
//         const futureMoment = now.add(1, "days");
//         const nextDate = futureMoment.format("D MMM");
//         const nextDay = futureMoment.format("ddd").toUpperCase();

//         const nextContests = await DateContest.find({ date: nextDate });
//         if (nextContests.length < 2) {
//             const missingExchanges = ["NSE", "BSE"].filter(exchange =>
//                 !nextContests.some(contest => contest.exchange === exchange)
//             );

//             if (missingExchanges.length > 0) {
//                 const newContests = missingExchanges.map(exchange => ({
//                     exchange,
//                     date: nextDate,
//                     day: nextDay,
//                     endTime: "15:30",
//                     status: "upcoming"
//                 }));

//                 await DateContest.insertMany(newContests);
//             }
//         }
//     } catch (error) {
//         console.error("Error updating contest status:", error);
//     }
// };


// // ✅ Fetch all contests (NSE & BSE, any date, any status)
// exports.getAllContests = async (req, res) => {
//     try {
//         const contests = await DateContest.find({}); // Fetch all documents

//         // Check if any contest exists
//         if (!contests.length) {
//             return res.status(404).json({ status: "error", message: "No contests found." });
//         }

//         return res.json({ status: "success", contests });
//     } catch (error) {
//         return res.status(500).json({ status: "error", message: error.message });
//     }
// };


// // 🕒 Run status update automatically every minute
// setInterval(exports.updateContestStatus, 60000);



























const DateContest = require("../models/DateContest");
const moment = require("moment-timezone");

const TIMEZONE = "Asia/Kolkata";

// ✅ Get contests categorized as Complete, Upcoming, and Live
exports.getCategorizedContests = async (req, res) => {
    try {
        const now = moment().tz(TIMEZONE);
        const todayDate = now.format("D MMM");

        // Fetch contests and categorize them
        const contests = await DateContest.find({});
        const categorizedContests = {
            complete: [],
            upcoming: [],
            live: []
        };

        contests.forEach(contest => {
            if (contest.status === "concluded") {
                categorizedContests.complete.push(contest);
            } else if (contest.status === "upcoming") {
                categorizedContests.upcoming.push(contest);
            } else if (contest.status === "ongoing") {
                categorizedContests.live.push(contest);
            }
        });

        return res.json({ status: "success", categorizedContests });
    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message });
    }
};

// ✅ Get contests for a specific date (with restriction after 9:10 AM)
exports.getContestsByDate = async (req, res) => {
    try {
        let { date } = req.params;
        date = decodeURIComponent(date).replace(/\b\w{3}\b/g, (match) => match.toUpperCase()); // Convert "3 Mar" -> "3 MAR"

        console.log("Requested Date:", date); // Debugging log

        const now = moment().tz(TIMEZONE);
        const todayDate = now.format("D MMM").replace(/\b\w{3}\b/g, (match) => match.toUpperCase()); // Convert "3 Mar" -> "3 MAR"
        const currentTime = now.format("HH:mm");

        // Restrict access to today's contest after 9:10 AM
        // if (date === todayDate && currentTime >= "09:10") {
        //     return res.status(403).json({ status: "error", message: "You cannot access today's contest after 9:10 AM." });
        // }

        // Fetch contests with case-insensitive search
        const foundContests = await DateContest.find({ date: { $regex: new RegExp(`^${date}$`, "i") } });

        console.log("Found Contests:", foundContests); // Debugging log

        if (!foundContests.length) {
            return res.status(404).json({ status: "error", message: "No contests found for this date." });
        }

        return res.json({ status: "success", contests: foundContests });
    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message });
    }
};


// ✅ Update contest status automatically
exports.updateContestStatus = async () => {
    try {
        const now = moment().tz(TIMEZONE);
        const todayDate = now.format("D MMM");
        const todayDay = now.format("ddd").toUpperCase();
        const timeNow = now.format("HH:mm");

        // Trading times
        const startTradingTime = "09:10";
        const endTradingTime = "15:30";
        const postMarketTime = "15:31";

        // ✅ Prevent contests on weekends
        if (todayDay === "SAT" || todayDay === "SUN") {
            await DateContest.deleteMany({ date: todayDate });
            console.log(`✅ No contests on ${todayDay}, deleted existing contests.`);
            return;
        }

        // ✅ Ensure today's contests exist (for NSE & BSE)
        const todayContests = await DateContest.find({ date: todayDate });
        if (todayContests.length < 2) {
            const missingExchanges = ["NSE", "BSE"].filter(exchange =>
                !todayContests.some(contest => contest.exchange === exchange)
            );

            if (missingExchanges.length > 0) {
                const newContests = missingExchanges.map(exchange => ({
                    exchange,
                    date: todayDate,
                    day: todayDay,
                    endTime: "15:30",
                    status: "ongoing"
                }));

                await DateContest.insertMany(newContests);
            }
        }

        // ✅ Update contest status
        if (timeNow >= startTradingTime && timeNow <= endTradingTime) {
            await DateContest.updateMany({ date: todayDate }, { $set: { status: "ongoing" } });
        } else if (timeNow >= postMarketTime) {
            await DateContest.updateMany({ date: todayDate }, { $set: { status: "concluded" } });
        }
    } catch (error) {
        console.error("Error updating contest status:", error);
    }
};

// 🕒 Run status update every minute
setInterval(exports.updateContestStatus, 60000);
