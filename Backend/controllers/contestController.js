// const Contest = require('../models/Contest');
// const mongoose = require('mongoose');

// // Create a new contest
// exports.createContest = async (req, res) => {
//     try {
//         const { name, entryFee, totalSpots, prize, firstprize, totalteam, winpercentage } = req.body;

//         const contest = new Contest({
//             name,
//             entryFee,
//             totalSpots,
//             spotsLeft: totalSpots, // Initialize spotsLeft as totalSpots
//             prize,
//             firstprize,
//             totalteam,
//             winpercentage,
//             joinedUsers: []
//         });

//         await contest.save();
//         res.status(201).json({ message: 'Contest created successfully', contest });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // Get all contests
// exports.getAllContests = async (req, res) => {
//     try {
//         const contests = await Contest.find();
//         res.json(contests);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // Get contest details by ID
// exports.getContestById = async (req, res) => {
//     try {
//         const { contestId } = req.params;

//         if (!mongoose.Types.ObjectId.isValid(contestId)) {
//             return res.status(400).json({ error: 'Invalid contest ID format' });
//         }

//         const contest = await Contest.findById(contestId).populate('joinedUsers', 'username');
//         if (!contest) return res.status(404).json({ error: 'Contest not found' });

//         res.json(contest);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // User joins a contest
// exports.joinContest = async (req, res) => {
//     try {
//         const { userId, contestId } = req.body;

//         if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(contestId)) {
//             return res.status(400).json({ error: 'Invalid user ID or contest ID format' });
//         }

//         const contest = await Contest.findById(contestId);
//         if (!contest) return res.status(404).json({ error: 'Contest not found' });

//         if (contest.spotsLeft <= 0) {
//             return res.status(400).json({ error: 'Contest is full' });
//         }

//         if (contest.joinedUsers.includes(userId)) {
//             return res.status(400).json({ error: 'User has already joined this contest' });
//         }

//         contest.joinedUsers.push(userId);
//         contest.spotsLeft -= 1; // Decrease spotsLeft
//         await contest.save();

//         res.json({ message: 'User joined the contest successfully', spotsLeft: contest.spotsLeft });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // User leaves a contest (optional)
// exports.leaveContest = async (req, res) => {
//     try {
//         const { userId, contestId } = req.body;

//         if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(contestId)) {
//             return res.status(400).json({ error: 'Invalid user ID or contest ID format' });
//         }

//         const contest = await Contest.findById(contestId);
//         if (!contest) return res.status(404).json({ error: 'Contest not found' });

//         if (!contest.joinedUsers.includes(userId)) {
//             return res.status(400).json({ error: 'User has not joined this contest' });
//         }

//         contest.joinedUsers = contest.joinedUsers.filter(id => id.toString() !== userId);
//         contest.spotsLeft += 1; // Increase spotsLeft
//         await contest.save();

//         res.json({ message: 'User left the contest successfully', spotsLeft: contest.spotsLeft });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // Delete a contest
// exports.deleteContest = async (req, res) => {
//     try {
//         const { contestId } = req.params;

//         if (!mongoose.Types.ObjectId.isValid(contestId)) {
//             return res.status(400).json({ error: 'Invalid contest ID format' });
//         }

//         const contest = await Contest.findByIdAndDelete(contestId);
//         if (!contest) return res.status(404).json({ error: 'Contest not found' });

//         res.json({ message: 'Contest deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };







// const cron = require("node-cron");
// const Contest = require("../models/Contest");

// // Function to create the next day's contest
// const autoCreateContest = async () => {
//     try {
//         const today = new Date();
//         today.setDate(today.getDate() + 1); // Get tomorrow's date

//         const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
//         const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

//         const day = dayNames[today.getDay()];
//         const month = monthNames[today.getMonth()];
//         const date = `${today.getDate()} ${month}`;

//         // **Don't create a contest on Saturday or Sunday**
//         if (day === "SAT" || day === "SUN") {
//             console.log(`No contests on weekends. Skipping contest creation for ${date}.`);
//             return;
//         }

//         // Create a new contest for the next day
//         const newContest = new Contest({
//             name: "Daily Stock Challenge",
//             entryFee: 100,
//             totalSpots: 50,
//             spotsLeft: 50,
//             prize: 5000,
//             firstprize: 1000,
//             maximumteam: 5,
//             winpercentage: 10,
//             date: date,
//         });

//         await newContest.save();
//         console.log(`✅ Contest for ${date} created successfully.`);
//     } catch (error) {
//         console.error("❌ Error creating contest:", error);
//     }
// };

// // **Schedule the contest creation at 3:35 PM daily**
// cron.schedule("35 15 * * *", autoCreateContest, {
//     timezone: "Asia/Kolkata", // Indian Standard Time
// });


// // Get all contests
// exports.getAllContests = async (req, res) => {
//     try {
//         const contests = await Contest.find();

//         if (!contests.length) {
//             console.log("❌ No contests found in the database.");
//             return res.status(404).json({ status: "error", message: "No contests found." });
//         }

//         console.log("✅ All contests:", contests); // Debugging log
//         res.json({ status: "success", contests });
//     } catch (error) {
//         console.error("❌ Error fetching contests:", error);
//         res.status(500).json({ status: "error", message: "Internal server error" });
//     }
// };




// // Get contests by date
// // exports.getContestsByDate1 = async (req, res) => {
// //     try {
// //         const { date } = req.params;
// //         const contests = await Contest.find({ date });

// //         if (!contests.length) {
// //             return res.json({ status: "success", contests: [] });
// //         }

// //         res.json({ status: "success", contests });
// //     } catch (error) {
// //         console.error("Error fetching contests by date:", error);
// //         res.status(500).json({ status: "error", message: "Internal server error" });
// //     }
// // };



// // Get contests for a specific date
// exports.getContestsByDate = async (req, res) => {
//   try {
//     const { date } = req.params;
//     const contests = await Contest.find({ date });

//     if (!contests.length) {
//       return res.status(404).json({ status: "error", message: "No contests found for this date." });
//     }

//     res.status(200).json({ status: "success", contests });
//   } catch (error) {
//     res.status(500).json({ status: "error", message: "Server error", error });
//   }
// };


// // Create a new contest
// exports.createContest = async (req, res) => {
//     try {
//         const newContest = new Contest(req.body);
//         await newContest.save();
//         res.status(201).json({ status: "success", contest: newContest });
//     } catch (error) {
//         console.error("Error creating contest:", error);
//         res.status(500).json({ status: "error", message: "Internal server error" });
//     }
// };

// // Join a contest with a limit based on maximumteam
// exports.joinContest = async (req, res) => {
//     try {
//         const { contestId, userId, teamId } = req.body;
//         const contest = await Contest.findById(contestId);

//         if (!contest) {
//             return res.status(404).json({ status: "error", message: "Contest not found" });
//         }

//         // Check if spots are available
//         if (contest.spotsLeft <= 0) {
//             return res.status(400).json({ status: "error", message: "No spots left" });
//         }

//         // Count how many times the user has joined this contest
//         const userEntries = contest.joinedTeams.filter(
//             (entry) => entry.userId.toString() === userId
//         ).length;

//         if (userEntries >= contest.maximumteam) {
//             return res.status(400).json({ status: "error", message: "You have reached the maximum team limit for this contest" });
//         }

//         // Add user to contest
//         contest.joinedTeams.push({ userId, teamId });
//         contest.spotsLeft -= 1; // Decrease available spots
//         await contest.save();

//         res.json({ status: "success", message: "Joined contest successfully", contest });
//     } catch (error) {
//         console.error("Error joining contest:", error);
//         res.status(500).json({ status: "error", message: "Internal server error" });
//     }
// };

// // Delete a contest
// exports.deleteContest = async (req, res) => {
//     try {
//         const { contestId } = req.params;
//         const deletedContest = await Contest.findByIdAndDelete(contestId);

//         if (!deletedContest) {
//             return res.status(404).json({ status: "error", message: "Contest not found" });
//         }

//         res.json({ status: "success", message: "Contest deleted successfully" });
//     } catch (error) {
//         console.error("Error deleting contest:", error);
//         res.status(500).json({ status: "error", message: "Internal server error" });
//     }
// };

// // Get users and teams in a contest
// exports.getContestParticipants = async (req, res) => {
//     try {
//         const { contestId } = req.params;
//         const contest = await Contest.findById(contestId);

//         if (!contest) {
//             return res.status(404).json({ status: "error", message: "Contest not found" });
//         }

//         res.json({
//             status: "success",
//             contestId: contest._id,
//             participants: contest.joinedTeams.map((entry) => ({
//                 userId: entry.userId,
//                 teamId: entry.teamId,
//             })),
//         });
//     } catch (error) {
//         console.error("Error fetching contest participants:", error);
//         res.status(500).json({ status: "error", message: "Internal server error" });
//     }
// };




























// const cron = require("node-cron");
// const Contest = require("../models/Contest");
// const User = require('../models/User');
// const Team = require('../models/Team');

// // Function to create the next day's contest for NSE and BSE
// const autoCreateContest = async () => {
//     try {
//         const today = new Date();
//         today.setDate(today.getDate() + 1); // Get tomorrow's date

//         const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
//         const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

//         const day = dayNames[today.getDay()];
//         const month = monthNames[today.getMonth()];
//         const date = `${today.getDate()} ${month}`;

//         // Skip weekends
//         if (day === "SAT" || day === "SUN") {
//             console.log(`No contests on weekends. Skipping contest creation for ${date}.`);
//             return;
//         }

//         const exchanges = ["NSE", "BSE"];

//         for (const exchange of exchanges) {
//             const newContest = new Contest({
//                 name: `Daily Stock Challenge - ${exchange}`,
//                 entryFee: 100,
//                 totalSpots: 50,
//                 spotsLeft: 50,
//                 prize: 5000,
//                 firstprize: 1000,
//                 maximumteam: 5,
//                 winpercentage: 10,
//                 date: date,
//                 exchange: exchange, // NSE or BSE
//             });

//             await newContest.save();
//             console.log(`✅ Contest for ${date} (${exchange}) created successfully.`);
//         }
//     } catch (error) {
//         console.error("❌ Error creating contest:", error);
//     }
// };

// // **Schedule the contest creation at 3:35 PM daily**
// cron.schedule("35 15 * * *", autoCreateContest, {
//     timezone: "Asia/Kolkata",
// });

// // Get all contests
// exports.getAllContests = async (req, res) => {
//     try {
//         const contests = await Contest.find();
//         res.status(200).json({ status: "success", contests });
//     } catch (error) {
//         res.status(500).json({ status: "error", message: "Server error", error });
//     }
// };

// // Get contests by date and exchange
// // ✅ Get contests by date and exchange
// exports.getContestsByDateAndExchange = async (req, res) => {
//   try {
//     let { date, exchange } = req.params;
//     date = decodeURIComponent(date).replace(/(\d+)\s(\w+)/, (match, day, month) => {
//       return `${day} ${month.toUpperCase()}`; // Convert month to uppercase
//     });

//     const contests = await Contest.find({ date, exchange });
//     if (!contests.length) {
//       return res.status(404).json({ message: "No contests found for this date and exchange" });
//     }

//     res.json(contests);
//   } catch (error) {
//     console.error("Error fetching contests:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };


// // Create a new contest manually
// exports.createContest = async (req, res) => {
//     try {
//         const { name, entryFee, totalSpots, prize, firstprize, maximumteam, winpercentage, date, exchange } = req.body;

//         if (!name || !entryFee || !totalSpots || !prize || !firstprize || !maximumteam || !winpercentage || !date || !exchange) {
//             return res.status(400).json({ status: "error", message: "All fields are required." });
//         }

//         const newContest = new Contest({
//             name,
//             entryFee,
//             totalSpots,
//             spotsLeft: totalSpots,
//             prize,
//             firstprize,
//             maximumteam,
//             winpercentage,
//             date,
//             exchange,
//         });

//         await newContest.save();
//         res.status(201).json({ status: "success", message: "Contest created successfully.", contest: newContest });
//     } catch (error) {
//         res.status(500).json({ status: "error", message: "Server error", error });
//     }
// };

// // Join a contest
// const mongoose = require("mongoose");

// exports.joinContest = async (req, res) => {
//     try {
//         const { contestId, userId, teamId } = req.body;

//         // Check if contestId is a valid ObjectId
//         if (!mongoose.Types.ObjectId.isValid(contestId)) {
//             return res.status(400).json({ status: "error", message: "Invalid contest ID." });
//         }

//         const contest = await Contest.findById(contestId);
//         if (!contest) {
//             return res.status(404).json({ status: "error", message: "Contest not found." });
//         }

//         if (contest.spotsLeft <= 0) {
//             return res.status(400).json({ status: "error", message: "No spots left in this contest." });
//         }

//         // Check if the user has already joined with the max allowed teams
//         const userTeams = contest.joinedTeams.filter(team => team.userId.toString() === userId);
//         if (userTeams.length >= contest.maximumteam) {
//             return res.status(400).json({ status: "error", message: "You have reached the maximum team limit for this contest." });
//         }

//         // Add the user's team to the contest
//         contest.joinedTeams.push({ userId, teamId });
//         contest.spotsLeft -= 1;
//         await contest.save();

//         res.status(200).json({ status: "success", message: "Successfully joined the contest.", contest });
//     } catch (error) {
//         res.status(500).json({ status: "error", message: "Server error", error });
//     }
// };


// // Delete a contest
// exports.deleteContest = async (req, res) => {
//     try {
//         const { contestId } = req.params;

//         const contest = await Contest.findById(contestId);
//         if (!contest) {
//             return res.status(404).json({ status: "error", message: "Contest not found." });
//         }

//         await contest.deleteOne();
//         res.status(200).json({ status: "success", message: "Contest deleted successfully." });
//     } catch (error) {
//         res.status(500).json({ status: "error", message: "Server error", error });
//     }
// };

// // Get participants of a contest
// exports.getContestParticipants = async (req, res) => {
//     try {
//         const { contestId } = req.params;

//         const contest = await Contest.findById(contestId).populate("joinedTeams.userId", "name email");
//         if (!contest) {
//             return res.status(404).json({ status: "error", message: "Contest not found." });
//         }

//         res.status(200).json({ status: "success", participants: contest.joinedTeams });
//     } catch (error) {
//         res.status(500).json({ status: "error", message: "Server error", error });
//     }
// };



// // exports.getJoinedContests = async (req, res) => {
// //     try {
// //         const { userId } = req.query; // Pass userId as a query param

// //         if (!userId) {
// //             return res.status(400).json({ status: "error", message: "User ID is required." });
// //         }

// //         const joinedContests = await Contest.find({ "joinedTeams.userId": userId });

// //         if (!joinedContests || joinedContests.length === 0) {
// //             return res.status(404).json({ status: "error", message: "No contests found for this user." });
// //         }

// //         res.json({ status: "success", data: joinedContests });
// //     } catch (error) {
// //         res.status(500).json({ status: "error", message: "Server Error", error: error.message });
// //     }
// // };

// exports.getContestsByDate = async (req, res) => {
//     try {
//         if (!req.query.date) {
//             return res.status(400).json({ status: "error", message: "Date is required." });
//         }

//         // Convert input date (YYYY-MM-DD) to "D MMM" format (e.g., "4 MAR")
//         const dateObj = new Date(req.query.date);
//         const formattedDate = dateObj.getDate() + " " + dateObj.toLocaleString('en-US', { month: 'short' }).toUpperCase();

//         // Find contests matching the formatted date
//         const contests = await Contest.find({ date: formattedDate });

//         if (!contests.length) {
//             return res.status(404).json({ status: "error", message: "No contests found for this date." });
//         }

//         res.json({ status: "success", contests });
//     } catch (error) {
//         console.error("Error fetching contests:", error);
//         res.status(500).json({ status: "error", message: "Internal server error." });
//     }
// };






// exports.getUserContests = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     if (!userId) {
//       return res.status(400).json({ message: "User ID is required" });
//     }

//     // Find contests where the user has joined
//     const joinedContests = await Contest.find({ "joinedTeams.userId": userId });

//     res.status(200).json(joinedContests);
//   } catch (error) {
//     console.error("Error fetching user contests:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };


//     // Adjust path to your Team model
    
//     exports.getTeamForContest = async (req, res) => {
//       try {
//         const { userId, contestId } = req.params;
    
//         // Validate inputs
//         if (!userId || !contestId) {
//           return res.status(400).json({ message: "Missing userId or contestId" });
//         }
    
//         if (!mongoose.Types.ObjectId.isValid(contestId)) {
//           return res.status(400).json({ message: "Invalid contestId format" });
//         }
//         if (!mongoose.Types.ObjectId.isValid(userId)) {
//           return res.status(400).json({ message: "Invalid userId format" });
//         }
    
//         // Fetch contest
//         const contest = await Contest.findOne({ _id: contestId });
//         if (!contest) {
//           return res.status(404).json({ message: "Contest not found" });
//         }
    
//         // Find all team entries for the user
//         const teamEntries = contest.joinedTeams.filter((team) => {
//           return team.userId.toString() === userId;
//         });
    
//         if (!teamEntries.length) {
//           return res.status(404).json({ message: "No teams found for this user in contest" });
//         }
    
//         // Fetch details for all teams
//         const teamIds = teamEntries.map((entry) => entry.teamId);
//         const teams = await Team.find({ _id: { $in: teamIds } });
    
//         if (!teams.length) {
//           return res.status(404).json({ message: "Team details not found" });
//         }
    
//         // Format response as an array of teams
//         const response = teams.map((team) => ({
//           captain: {
//             name: team.captain.name || "Unknown Captain",
//             image: team.captain.image || "default-image-url",
//           },
//           viceCaptain: {
//             name: team.viceCaptain.name || "Unknown Vice Captain",
//             image: team.viceCaptain.image || "default-image-url",
//           },
//         }));
    
//         res.json(response);
//       } catch (error) {
//         console.error("Error fetching teams:", error);
//         if (error.name === "CastError") {
//           return res.status(400).json({ message: "Invalid ID format in database query" });
//         }
//         res.status(500).json({ message: "Internal Server Error", error: error.message });
//       }
//     };
    























// This is Fixed Code 



const cron = require("node-cron");
const Contest = require("../models/Contest");
const User = require("../models/User");
const Team = require("../models/Team");
const mongoose = require("mongoose");

// Function to calculate prize breakup with realistic prizes near entry fee
const calculatePrizeBreakup = (totalParticipants, prize, winpercentage) => {
    const totalWinners = Math.floor((winpercentage / 100) * totalParticipants);
    const prizeBreakup = [];

    // Base prize near entry fee (slightly above for most winners)
    const entryFee = prize / totalParticipants;
    const basePrize = Math.floor(entryFee * 1.2); // e.g., 500 → 600

    // Define tiers with multipliers for per-person prizes
    const tiers = [
        { rank: "Rank 1", winners: 1, prizePerPerson: basePrize * 15 },    // e.g., 600 × 15 = 9,000
        { rank: "Rank 2", winners: 1, prizePerPerson: basePrize * 9.5 },   // e.g., 600 × 9.5 = 5,700
        { rank: "Rank 3", winners: 1, prizePerPerson: basePrize * 4 },     // e.g., 600 × 4 = 2,400
        { rank: "Rank 4-10", winners: Math.min(7, totalWinners - 3), prizePerPerson: basePrize * 1.5 }, // e.g., 600 × 1.5 = 900
        { rank: "Rank 11-50", winners: Math.min(40, totalWinners - 10), prizePerPerson: basePrize },     // e.g., 600
        { rank: "Rank 51-100", winners: Math.min(50, totalWinners - 50), prizePerPerson: basePrize * 0.8 }, // e.g., 480
        { rank: "Rank 101-200", winners: Math.min(100, totalWinners - 100), prizePerPerson: basePrize * 0.6 }, // e.g., 360
        { rank: "Rank 201-500", winners: Math.min(300, totalWinners - 200), prizePerPerson: basePrize * 0.4 }, // e.g., 240
        { rank: "Rank 501-1000", winners: Math.min(500, totalWinners - 500), prizePerPerson: basePrize * 0.2 } // e.g., 120
    ];

    let winnersAssigned = 0;
    let totalDistributed = 0;

    // Process tiers
    tiers.forEach(tier => {
        if (winnersAssigned < totalWinners && tier.winners > 0) {
            const actualWinners = Math.min(tier.winners, totalWinners - winnersAssigned);
            const amount = tier.prizePerPerson * actualWinners;
            prizeBreakup.push({ rank: tier.rank, amount: tier.prizePerPerson, winners: actualWinners });
            totalDistributed += amount;
            winnersAssigned += actualWinners;
        }
    });

    // Adjust for full distribution
    let remaining = prize - totalDistributed;
    if (remaining > 0) {
        const extraPerWinner = Math.floor(remaining / totalWinners);
        const extraWinners = remaining - (extraPerWinner * totalWinners);

        prizeBreakup.forEach(tier => {
            tier.amount += extraPerWinner;
        });

        let adjustedWinners = 0;
        for (let i = 0; i < prizeBreakup.length && adjustedWinners < extraWinners; i++) {
            const winners = prizeBreakup[i].winners;
            const increase = Math.min(extraWinners - adjustedWinners, winners);
            prizeBreakup[i].amount += 1;
            adjustedWinners += increase;
        }
    }

    return prizeBreakup;
};

// Auto-create contests daily
const autoCreateContest = async () => {
    try {
        const today = new Date();
        today.setDate(today.getDate() + 1);

        const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
        const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

        const day = dayNames[today.getDay()];
        const month = monthNames[today.getMonth()];
        const date = `${today.getDate()} ${month}`;

        if (day === "SAT" || day === "SUN") {
            console.log(`No contests on weekends. Skipping contest creation for ${date}.`);
            return;
        }

        const exchanges = ["NSE", "BSE"];
        const totalSpots = 50;
        const entryFee = 100;
        const prize = entryFee * totalSpots;
        const winpercentage = 10;

        for (const exchange of exchanges) {
            const prizeBreakup = calculatePrizeBreakup(totalSpots, prize, winpercentage);

            const newContest = new Contest({
                name: `Daily Stock Challenge - ${exchange}`,
                entryFee,
                totalSpots,
                spotsLeft: totalSpots,
                prize,
                firstprize: prizeBreakup.length > 0 ? prizeBreakup[0].amount : 0,
                maximumteam: 5,
                winpercentage,
                date,
                exchange,
                prizeBreakup
            });

            await newContest.save();
            console.log(`✅ Contest for ${date} (${exchange}) created successfully.`);
        }
    } catch (error) {
        console.error("❌ Error creating contest:", error);
    }
};

// Schedule the contest creation at 3:35 PM daily (IST)
cron.schedule("35 15 * * *", autoCreateContest, {
    timezone: "Asia/Kolkata",
});

// Controller functions
exports.getAllContests = async (req, res) => {
    try {
        const contests = await Contest.find();
        res.status(200).json({ status: "success", contests });
    } catch (error) {
        res.status(500).json({ status: "error", message: "Server error", error });
    }
};

exports.getContestsByDateAndExchange = async (req, res) => {
    try {
        let { date, exchange } = req.params;
        date = decodeURIComponent(date).replace(/(\d+)\s(\w+)/, (match, day, month) => {
            return `${day} ${month.toUpperCase()}`;
        });

        const contests = await Contest.find({ date, exchange });
        if (!contests.length) {
            return res.status(404).json({ message: "No contests found for this date and exchange" });
        }

        res.json(contests);
    } catch (error) {
        console.error("Error fetching contests:", error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.createContest = async (req, res) => {
    try {
        const { name, entryFee, totalSpots, maximumteam, winpercentage, date, exchange } = req.body;
        const prize = entryFee * totalSpots; // Initial prize assumes full spots

        if (!name || !entryFee || !totalSpots || !maximumteam || !winpercentage || !date || !exchange) {
            return res.status(400).json({ status: "error", message: "All fields are required." });
        }

        const prizeBreakup = calculatePrizeBreakup(totalSpots, prize, winpercentage);

        const newContest = new Contest({
            name,
            entryFee,
            totalSpots,
            spotsLeft: totalSpots,
            prize,
            firstprize: prizeBreakup.length > 0 ? prizeBreakup[0].amount : 0,
            maximumteam,
            winpercentage,
            date,
            exchange,
            prizeBreakup
        });

        await newContest.save();
        res.status(201).json({ status: "success", message: "Contest created successfully.", contest: newContest });
    } catch (error) {
        res.status(500).json({ status: "error", message: "Server error", error });
    }
};

exports.joinContest = async (req, res) => {
    try {
        const { contestId, userId, teamId } = req.body;

        if (!mongoose.Types.ObjectId.isValid(contestId)) {
            return res.status(400).json({ status: "error", message: "Invalid contest ID." });
        }

        const contest = await Contest.findById(contestId);
        if (!contest) {
            return res.status(404).json({ status: "error", message: "Contest not found." });
        }

        if (contest.spotsLeft <= 0) {
            return res.status(400).json({ status: "error", message: "No spots left in this contest." });
        }

        const userTeams = contest.joinedTeams.filter(team => team.userId.toString() === userId);
        if (userTeams.length >= contest.maximumteam) {
            return res.status(400).json({ status: "error", message: "You have reached the maximum team limit for this contest." });
        }

        contest.joinedTeams.push({ userId, teamId });
        contest.spotsLeft -= 1;
        await contest.save();

        res.status(200).json({ status: "success", message: "Successfully joined the contest.", contest });
    } catch (error) {
        res.status(500).json({ status: "error", message: "Server error", error });
    }
};

exports.finalizeContest = async (req, res) => {
    try {
        const { contestId } = req.params;
        const contest = await Contest.findById(contestId);
        if (!contest) {
            return res.status(404).json({ status: "error", message: "Contest not found." });
        }

        const actualParticipants = contest.totalSpots - contest.spotsLeft;
        const actualPrize = contest.entryFee * actualParticipants;
        const actualWinners = Math.floor((contest.winpercentage / 100) * actualParticipants);
        const prizeBreakup = calculatePrizeBreakup(actualParticipants, actualPrize, contest.winpercentage);

        contest.prize = actualPrize;
        contest.prizeBreakup = prizeBreakup;
        contest.firstprize = prizeBreakup.length > 0 ? prizeBreakup[0].amount : 0;
        await contest.save();

        res.status(200).json({ status: "success", message: "Contest finalized.", contest });
    } catch (error) {
        res.status(500).json({ status: "error", message: "Server error", error });
    }
};

exports.deleteContest = async (req, res) => {
    try {
        const { contestId } = req.params;

        const contest = await Contest.findById(contestId);
        if (!contest) {
            return res.status(404).json({ status: "error", message: "Contest not found." });
        }

        await contest.deleteOne();
        res.status(200).json({ status: "success", message: "Contest deleted successfully." });
    } catch (error) {
        res.status(500).json({ status: "error", message: "Server error", error });
    }
};

exports.getContestParticipants = async (req, res) => {
    try {
        const { contestId } = req.params;

        const contest = await Contest.findById(contestId).populate("joinedTeams.userId", "name email");
        if (!contest) {
            return res.status(404).json({ status: "error", message: "Contest not found." });
        }

        res.status(200).json({ status: "success", participants: contest.joinedTeams });
    } catch (error) {
        res.status(500).json({ status: "error", message: "Server error", error });
    }
};

exports.getContestsByDate = async (req, res) => {
    try {
        if (!req.query.date) {
            return res.status(400).json({ status: "error", message: "Date is required." });
        }

        const dateObj = new Date(req.query.date);
        const formattedDate = dateObj.getDate() + " " + dateObj.toLocaleString('en-US', { month: 'short' }).toUpperCase();

        const contests = await Contest.find({ date: formattedDate });

        if (!contests.length) {
            return res.status(404).json({ status: "error", message: "No contests found for this date." });
        }

        res.json({ status: "success", contests });
    } catch (error) {
        console.error("Error fetching contests:", error);
        res.status(500).json({ status: "error", message: "Internal server error." });
    }
};

exports.getUserContests = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const joinedContests = await Contest.find({ "joinedTeams.userId": userId });

        res.status(200).json(joinedContests);
    } catch (error) {
        console.error("Error fetching user contests:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.getTeamForContest = async (req, res) => {
    try {
        const { userId, contestId } = req.params;

        if (!userId || !contestId) {
            return res.status(400).json({ message: "Missing userId or contestId" });
        }

        if (!mongoose.Types.ObjectId.isValid(contestId)) {
            return res.status(400).json({ message: "Invalid contestId format" });
        }
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid userId format" });
        }

        const contest = await Contest.findOne({ _id: contestId });
        if (!contest) {
            return res.status(404).json({ message: "Contest not found" });
        }

        const teamEntries = contest.joinedTeams.filter((team) => {
            return team.userId.toString() === userId;
        });

        if (!teamEntries.length) {
            return res.status(404).json({ message: "No teams found for this user in contest" });
        }

        const teamIds = teamEntries.map((entry) => entry.teamId);
        const teams = await Team.find({ _id: { $in: teamIds } });

        if (!teams.length) {
            return res.status(404).json({ message: "Team details not found" });
        }

        const response = teams.map((team) => ({
            captain: {
                name: team.captain.name || "Unknown Captain",
                image: team.captain.image || "default-image-url",
            },
            viceCaptain: {
                name: team.viceCaptain.name || "Unknown Vice Captain",
                image: team.viceCaptain.image || "default-image-url",
            },
        }));

        res.json(response);
    } catch (error) {
        console.error("Error fetching teams:", error);
        if (error.name === "CastError") {
            return res.status(400).json({ message: "Invalid ID format in database query" });
        }
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};















// joinContest to recalculate the prize pool and breakup after each join.



// const cron = require("node-cron");
// const Contest = require("../models/Contest");
// const User = require("../models/User");
// const Team = require("../models/Team");
// const mongoose = require("mongoose");

// // Function to calculate prize breakup with realistic prizes near entry fee
// const calculatePrizeBreakup = (totalParticipants, prize, winpercentage) => {
//     const totalWinners = Math.floor((winpercentage / 100) * totalParticipants);
//     const prizeBreakup = [];

//     // Base prize near entry fee (slightly above for most winners)
//     const entryFee = prize / totalParticipants;
//     const basePrize = Math.floor(entryFee * 1.2); // e.g., 500 → 600

//     // Define tiers with multipliers for per-person prizes
//     const tiers = [
//         { rank: "Rank 1", winners: 1, prizePerPerson: basePrize * 15 },    // e.g., 600 × 15 = 9,000
//         { rank: "Rank 2", winners: 1, prizePerPerson: basePrize * 9.5 },   // e.g., 600 × 9.5 = 5,700
//         { rank: "Rank 3", winners: 1, prizePerPerson: basePrize * 4 },     // e.g., 600 × 4 = 2,400
//         { rank: "Rank 4-10", winners: Math.min(7, totalWinners - 3), prizePerPerson: basePrize * 1.5 }, // e.g., 600 × 1.5 = 900
//         { rank: "Rank 11-50", winners: Math.min(40, totalWinners - 10), prizePerPerson: basePrize },     // e.g., 600
//         { rank: "Rank 51-100", winners: Math.min(50, totalWinners - 50), prizePerPerson: basePrize * 0.8 }, // e.g., 480
//         { rank: "Rank 101-200", winners: Math.min(100, totalWinners - 100), prizePerPerson: basePrize * 0.6 }, // e.g., 360
//         { rank: "Rank 201-500", winners: Math.min(300, totalWinners - 200), prizePerPerson: basePrize * 0.4 }, // e.g., 240
//         { rank: "Rank 501-1000", winners: Math.min(500, totalWinners - 500), prizePerPerson: basePrize * 0.2 } // e.g., 120
//     ];

//     let winnersAssigned = 0;
//     let totalDistributed = 0;

//     // Process tiers
//     tiers.forEach(tier => {
//         if (winnersAssigned < totalWinners && tier.winners > 0) {
//             const actualWinners = Math.min(tier.winners, totalWinners - winnersAssigned);
//             const amount = tier.prizePerPerson * actualWinners;
//             prizeBreakup.push({ rank: tier.rank, amount: tier.prizePerPerson, winners: actualWinners });
//             totalDistributed += amount;
//             winnersAssigned += actualWinners;
//         }
//     });

//     // Adjust for full distribution
//     let remaining = prize - totalDistributed;
//     if (remaining > 0) {
//         const extraPerWinner = Math.floor(remaining / totalWinners);
//         const extraWinners = remaining - (extraPerWinner * totalWinners);

//         prizeBreakup.forEach(tier => {
//             tier.amount += extraPerWinner;
//         });

//         let adjustedWinners = 0;
//         for (let i = 0; i < prizeBreakup.length && adjustedWinners < extraWinners; i++) {
//             const winners = prizeBreakup[i].winners;
//             const increase = Math.min(extraWinners - adjustedWinners, winners);
//             prizeBreakup[i].amount += 1;
//             adjustedWinners += increase;
//         }
//     }

//     return prizeBreakup;
// };

// // Auto-create contests daily
// const autoCreateContest = async () => {
//     try {
//         const today = new Date();
//         today.setDate(today.getDate() + 1);

//         const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
//         const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

//         const day = dayNames[today.getDay()];
//         const month = monthNames[today.getMonth()];
//         const date = `${today.getDate()} ${month}`;

//         if (day === "SAT" || day === "SUN") {
//             console.log(`No contests on weekends. Skipping contest creation for ${date}.`);
//             return;
//         }

//         const exchanges = ["NSE", "BSE"];
//         const totalSpots = 50;
//         const entryFee = 100;
//         const prize = entryFee * totalSpots;
//         const winpercentage = 10;

//         for (const exchange of exchanges) {
//             const prizeBreakup = calculatePrizeBreakup(totalSpots, prize, winpercentage);

//             const newContest = new Contest({
//                 name: `Daily Stock Challenge - ${exchange}`,
//                 entryFee,
//                 totalSpots,
//                 spotsLeft: totalSpots,
//                 prize,
//                 firstprize: prizeBreakup.length > 0 ? prizeBreakup[0].amount : 0,
//                 maximumteam: 5,
//                 winpercentage,
//                 date,
//                 exchange,
//                 prizeBreakup
//             });

//             await newContest.save();
//             console.log(`✅ Contest for ${date} (${exchange}) created successfully.`);
//         }
//     } catch (error) {
//         console.error("❌ Error creating contest:", error);
//     }
// };

// // Schedule the contest creation at 3:35 PM daily (IST)
// cron.schedule("35 15 * * *", autoCreateContest, {
//     timezone: "Asia/Kolkata",
// });

// // Controller functions
// exports.getAllContests = async (req, res) => {
//     try {
//         const contests = await Contest.find();
//         res.status(200).json({ status: "success", contests });
//     } catch (error) {
//         res.status(500).json({ status: "error", message: "Server error", error });
//     }
// };

// exports.getContestsByDateAndExchange = async (req, res) => {
//     try {
//         let { date, exchange } = req.params;
//         date = decodeURIComponent(date).replace(/(\d+)\s(\w+)/, (match, day, month) => {
//             return `${day} ${month.toUpperCase()}`;
//         });

//         const contests = await Contest.find({ date, exchange });
//         if (!contests.length) {
//             return res.status(404).json({ message: "No contests found for this date and exchange" });
//         }

//         res.json(contests);
//     } catch (error) {
//         console.error("Error fetching contests:", error);
//         res.status(500).json({ message: "Server error" });
//     }
// };

// exports.createContest = async (req, res) => {
//     try {
//         const { name, entryFee, totalSpots, maximumteam, winpercentage, date, exchange } = req.body;
//         const prize = entryFee * totalSpots; // Initial prize assumes full spots

//         if (!name || !entryFee || !totalSpots || !maximumteam || !winpercentage || !date || !exchange) {
//             return res.status(400).json({ status: "error", message: "All fields are required." });
//         }

//         const prizeBreakup = calculatePrizeBreakup(totalSpots, prize, winpercentage);

//         const newContest = new Contest({
//             name,
//             entryFee,
//             totalSpots,
//             spotsLeft: totalSpots,
//             prize,
//             firstprize: prizeBreakup.length > 0 ? prizeBreakup[0].amount : 0,
//             maximumteam,
//             winpercentage,
//             date,
//             exchange,
//             prizeBreakup
//         });

//         await newContest.save();
//         res.status(201).json({ status: "success", message: "Contest created successfully.", contest: newContest });
//     } catch (error) {
//         res.status(500).json({ status: "error", message: "Server error", error });
//     }
// };

// exports.joinContest = async (req, res) => {
//     try {
//         const { contestId, userId, teamId } = req.body;

//         if (!mongoose.Types.ObjectId.isValid(contestId)) {
//             return res.status(400).json({ status: "error", message: "Invalid contest ID." });
//         }

//         const contest = await Contest.findById(contestId);
//         if (!contest) {
//             return res.status(404).json({ status: "error", message: "Contest not found." });
//         }

//         if (contest.spotsLeft <= 0) {
//             return res.status(400).json({ status: "error", message: "No spots left in this contest." });
//         }

//         const userTeams = contest.joinedTeams.filter(team => team.userId.toString() === userId);
//         if (userTeams.length >= contest.maximumteam) {
//             return res.status(400).json({ status: "error", message: "You have reached the maximum team limit for this contest." });
//         }

//         // Add user to contest
//         contest.joinedTeams.push({ userId, teamId });
//         contest.spotsLeft -= 1;

//         // Recalculate prize pool and breakup in real-time
//         const actualParticipants = contest.totalSpots - contest.spotsLeft;
//         const actualPrize = contest.entryFee * actualParticipants;
//         const actualWinners = Math.floor((contest.winpercentage / 100) * actualParticipants);
//         const prizeBreakup = calculatePrizeBreakup(actualParticipants, actualPrize, contest.winpercentage);

//         contest.prize = actualPrize;
//         contest.prizeBreakup = prizeBreakup;
//         contest.firstprize = prizeBreakup.length > 0 ? prizeBreakup[0].amount : 0;

//         await contest.save();

//         res.status(200).json({ status: "success", message: "Successfully joined the contest.", contest });
//     } catch (error) {
//         res.status(500).json({ status: "error", message: "Server error", error });
//     }
// };

// exports.finalizeContest = async (req, res) => {
//     try {
//         const { contestId } = req.params;
//         const contest = await Contest.findById(contestId);
//         if (!contest) {
//             return res.status(404).json({ status: "error", message: "Contest not found." });
//         }

//         // Since joinContest already updates in real-time, this just confirms the current state
//         res.status(200).json({ status: "success", message: "Contest finalized (already updated in real-time).", contest });
//     } catch (error) {
//         res.status(500).json({ status: "error", message: "Server error", error });
//     }
// };

// exports.deleteContest = async (req, res) => {
//     try {
//         const { contestId } = req.params;

//         const contest = await Contest.findById(contestId);
//         if (!contest) {
//             return res.status(404).json({ status: "error", message: "Contest not found." });
//         }

//         await contest.deleteOne();
//         res.status(200).json({ status: "success", message: "Contest deleted successfully." });
//     } catch (error) {
//         res.status(500).json({ status: "error", message: "Server error", error });
//     }
// };

// exports.getContestParticipants = async (req, res) => {
//     try {
//         const { contestId } = req.params;

//         const contest = await Contest.findById(contestId).populate("joinedTeams.userId", "name email");
//         if (!contest) {
//             return res.status(404).json({ status: "error", message: "Contest not found." });
//         }

//         res.status(200).json({ status: "success", participants: contest.joinedTeams });
//     } catch (error) {
//         res.status(500).json({ status: "error", message: "Server error", error });
//     }
// };

// exports.getContestsByDate = async (req, res) => {
//     try {
//         if (!req.query.date) {
//             return res.status(400).json({ status: "error", message: "Date is required." });
//         }

//         const dateObj = new Date(req.query.date);
//         const formattedDate = dateObj.getDate() + " " + dateObj.toLocaleString('en-US', { month: 'short' }).toUpperCase();

//         const contests = await Contest.find({ date: formattedDate });

//         if (!contests.length) {
//             return res.status(404).json({ status: "error", message: "No contests found for this date." });
//         }

//         res.json({ status: "success", contests });
//     } catch (error) {
//         console.error("Error fetching contests:", error);
//         res.status(500).json({ status: "error", message: "Internal server error." });
//     }
// };

// exports.getUserContests = async (req, res) => {
//     try {
//         const { userId } = req.params;
//         if (!userId) {
//             return res.status(400).json({ message: "User ID is required" });
//         }

//         const joinedContests = await Contest.find({ "joinedTeams.userId": userId });

//         res.status(200).json(joinedContests);
//     } catch (error) {
//         console.error("Error fetching user contests:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };

// exports.getTeamForContest = async (req, res) => {
//     try {
//         const { userId, contestId } = req.params;

//         if (!userId || !contestId) {
//             return res.status(400).json({ message: "Missing userId or contestId" });
//         }

//         if (!mongoose.Types.ObjectId.isValid(contestId)) {
//             return res.status(400).json({ message: "Invalid contestId format" });
//         }
//         if (!mongoose.Types.ObjectId.isValid(userId)) {
//             return res.status(400).json({ message: "Invalid userId format" });
//         }

//         const contest = await Contest.findOne({ _id: contestId });
//         if (!contest) {
//             return res.status(404).json({ message: "Contest not found" });
//         }

//         const teamEntries = contest.joinedTeams.filter((team) => {
//             return team.userId.toString() === userId;
//         });

//         if (!teamEntries.length) {
//             return res.status(404).json({ message: "No teams found for this user in contest" });
//         }

//         const teamIds = teamEntries.map((entry) => entry.teamId);
//         const teams = await Team.find({ _id: { $in: teamIds } });

//         if (!teams.length) {
//             return res.status(404).json({ message: "Team details not found" });
//         }

//         const response = teams.map((team) => ({
//             captain: {
//                 name: team.captain.name || "Unknown Captain",
//                 image: team.captain.image || "default-image-url",
//             },
//             viceCaptain: {
//                 name: team.viceCaptain.name || "Unknown Vice Captain",
//                 image: team.viceCaptain.image || "default-image-url",
//             },
//         }));

//         res.json(response);
//     } catch (error) {
//         console.error("Error fetching teams:", error);
//         if (error.name === "CastError") {
//             return res.status(400).json({ message: "Invalid ID format in database query" });
//         }
//         res.status(500).json({ message: "Internal Server Error", error: error.message });
//     }
// };