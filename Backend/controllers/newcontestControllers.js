// const NewContest = require("../models/NewContest");
// const DateContest = require("../models/DateContest");
// const Team = require("../models/Team");

// // ✅ Create contests for all available dates
// exports.createContestsForAllDates = async (req, res) => {
//     try {
//         const { name, entryFee, totalSpots, prize, firstprize, maximumteam, winpercentage } = req.body;

//         // Fetch all available dates
//         const dateContests = await DateContest.find({}, "date");

//         if (!dateContests.length) {
//             return res.status(404).json({ status: "error", message: "No dates found for contests." });
//         }

//         let createdContests = [];

//         // Create contests for each date
//         for (const dateContest of dateContests) {
//             const contest = new NewContest({
//                 name,
//                 entryFee,
//                 totalSpots,
//                 spotsLeft: totalSpots, // Initially, all spots are available
//                 prize,
//                 firstprize,
//                 maximumteam,
//                 winpercentage,
//                 date: dateContest.date, // Assign contest to the date
//                 joinedTeams: [] // Initialize empty array
//             });

//             await contest.save();
//             createdContests.push(contest);
//         }

//         return res.json({ status: "success", message: "Contests created for all dates.", contests: createdContests });
//     } catch (error) {
//         return res.status(500).json({ status: "error", message: error.message });
//     }
// };


// // ✅ Join contest with proper user limit check
// exports.joinContest = async (req, res) => {
//     try {
//         const { contestId, userId, teamId } = req.body;

//         // Find contest (use NewContest instead of Contest)
//         const contest = await NewContest.findById(contestId);
//         if (!contest) {
//             return res.status(404).json({ status: "error", message: "Contest not found" });
//         }

//         // Ensure `joinedTeams` exists to avoid `undefined` errors
//         if (!Array.isArray(contest.joinedTeams)) {
//             contest.joinedTeams = [];
//         }

//         // Check if the team exists
//         const team = await Team.findById(teamId);
//         if (!team) {
//             return res.status(404).json({ status: "error", message: "Team not found" });
//         }

//         // Check if spots are available
//         if (contest.spotsLeft <= 0) {
//             return res.status(400).json({ status: "error", message: "No spots left in this contest" });
//         }

//         // Count how many teams this user has already joined with
//         const userJoinedTeams = contest.joinedTeams.filter(entry => entry.userId.toString() === userId);

//         // If user has reached their allowed limit, return an error
//         if (userJoinedTeams.length >= contest.maximumteam) {
//             return res.status(400).json({ 
//                 status: "error", 
//                 message: `You can only join this contest with up to ${contest.maximumteam} teams.` 
//             });
//         }

//         // Check if the same team is already joined in this contest
//         const alreadyJoined = userJoinedTeams.some(entry => entry.teamId.toString() === teamId);
//         if (alreadyJoined) {
//             return res.status(400).json({ status: "error", message: "This team has already joined the contest" });
//         }

//         // Add team to contest & decrease available spots
//         contest.joinedTeams.push({ userId, teamId });
//         contest.spotsLeft -= 1;

//         // Save contest update
//         await contest.save();

//         // Format and return all users & their teams in the contest
//         const usersWithTeams = contest.joinedTeams.map(entry => ({
//             userId: entry.userId,
//             teamId: entry.teamId
//         }));

//         return res.status(200).json({
//             status: "success",
//             message: "Team joined the contest successfully",
//             spotsLeft: contest.spotsLeft,
//             totalTeamsJoinedByUser: userJoinedTeams.length + 1, // Updated count
//             usersWithTeams // List of all users & their teams
//         });
//     } catch (error) {
//         return res.status(500).json({ status: "error", message: error.message });
//     }
// };










const mongoose = require("mongoose");
const NewContest = require("../models/NewContest");
const DateContest = require("../models/DateContest");
const Team = require("../models/Team");

// ✅ Create contests for all available dates
exports.createContestsForAllDates = async (req, res) => {
    try {
        const { name, entryFee, totalSpots, prize, firstprize, maximumteam, winpercentage } = req.body;

        // Fetch all available dates
        const dateContests = await DateContest.find({}, "date");

        if (!dateContests.length) {
            return res.status(404).json({ status: "error", message: "No dates found for contests." });
        }

        let newContests = [];

        for (const dateContest of dateContests) {
            const existingContest = await NewContest.findOne({ name, date: dateContest.date });
            if (!existingContest) {
                newContests.push({
                    name,
                    entryFee,
                    totalSpots,
                    spotsLeft: totalSpots,
                    prize,
                    firstprize,
                    maximumteam,
                    winpercentage,
                    date: dateContest.date,
                    joinedTeams: []
                });
            }
        }

        if (newContests.length > 0) {
            await NewContest.insertMany(newContests);
        }

        return res.json({ status: "success", message: "Contests created for all dates.", contests: newContests });
    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message });
    }
};

// ✅ Join contest with proper user limit check
exports.joinContest = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
        const { contestId, userId, teamId } = req.body;

        // Validate ObjectIDs
        if (!mongoose.Types.ObjectId.isValid(contestId) || 
            !mongoose.Types.ObjectId.isValid(userId) || 
            !mongoose.Types.ObjectId.isValid(teamId)) {
            return res.status(400).json({ status: "error", message: "Invalid contest, user, or team ID." });
        }

        // Fetch contest
        const contest = await NewContest.findById(contestId).session(session);
        if (!contest) {
            await session.abortTransaction();
            return res.status(404).json({ status: "error", message: "Contest not found" });
        }

        // Check available spots
        if (contest.spotsLeft <= 0) {
            await session.abortTransaction();
            return res.status(400).json({ status: "error", message: "No spots left in this contest" });
        }

        // Fetch team
        const team = await Team.findById(teamId).session(session);
        if (!team) {
            await session.abortTransaction();
            return res.status(404).json({ status: "error", message: "Team not found" });
        }

        // Check if the team already joined
        const existingEntry = contest.joinedTeams.find(entry => entry.userId.toString() === userId && entry.teamId.toString() === teamId);
        if (existingEntry) {
            await session.abortTransaction();
            return res.status(400).json({ status: "error", message: "This team has already joined the contest" });
        }

        // Check if user exceeded maximum team limit
        const userJoinedCount = contest.joinedTeams.filter(entry => entry.userId.toString() === userId).length;
        if (userJoinedCount >= contest.maximumteam) {
            await session.abortTransaction();
            return res.status(400).json({
                status: "error",
                message: `You can only join this contest with up to ${contest.maximumteam} teams.`
            });
        }

        // Add team and decrement spots
        contest.joinedTeams.push({ userId, teamId });
        contest.spotsLeft -= 1;

        // Save updates
        await contest.save({ session });
        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({
            status: "success",
            message: "Team joined the contest successfully",
            spotsLeft: contest.spotsLeft,
            totalTeamsJoinedByUser: userJoinedCount + 1,
            usersWithTeams: contest.joinedTeams.map(entry => ({
                userId: entry.userId,
                teamId: entry.teamId
            }))
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return res.status(500).json({ status: "error", message: error.message });
    }
};


exports.getContests = async (req, res) => {
    try {
        console.log("Fetching contests..."); // Log before database query
        const contests = await NewContest.find(); // ✅ Use NewContest model
        console.log("Contests fetched:", contests); // Log fetched data
        res.status(200).json(contests);
    } catch (error) {
        console.error("Error fetching contests:", error); // Log the actual error
        res.status(500).json({ message: "Server error" });
    }
};
