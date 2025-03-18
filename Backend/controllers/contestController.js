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









const cron = require("node-cron");
const Contest = require("../models/Contest");
const User = require('../models/User');

// Function to create the next day's contest for NSE and BSE
const autoCreateContest = async () => {
    try {
        const today = new Date();
        today.setDate(today.getDate() + 1); // Get tomorrow's date

        const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
        const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

        const day = dayNames[today.getDay()];
        const month = monthNames[today.getMonth()];
        const date = `${today.getDate()} ${month}`;

        // Skip weekends
        if (day === "SAT" || day === "SUN") {
            console.log(`No contests on weekends. Skipping contest creation for ${date}.`);
            return;
        }

        const exchanges = ["NSE", "BSE"];

        for (const exchange of exchanges) {
            const newContest = new Contest({
                name: `Daily Stock Challenge - ${exchange}`,
                entryFee: 100,
                totalSpots: 50,
                spotsLeft: 50,
                prize: 5000,
                firstprize: 1000,
                maximumteam: 5,
                winpercentage: 10,
                date: date,
                exchange: exchange, // NSE or BSE
            });

            await newContest.save();
            console.log(`✅ Contest for ${date} (${exchange}) created successfully.`);
        }
    } catch (error) {
        console.error("❌ Error creating contest:", error);
    }
};

// **Schedule the contest creation at 3:35 PM daily**
cron.schedule("35 15 * * *", autoCreateContest, {
    timezone: "Asia/Kolkata",
});

// Get all contests
exports.getAllContests = async (req, res) => {
    try {
        const contests = await Contest.find();
        res.status(200).json({ status: "success", contests });
    } catch (error) {
        res.status(500).json({ status: "error", message: "Server error", error });
    }
};

// Get contests by date and exchange
// ✅ Get contests by date and exchange
exports.getContestsByDateAndExchange = async (req, res) => {
  try {
    let { date, exchange } = req.params;
    date = decodeURIComponent(date).replace(/(\d+)\s(\w+)/, (match, day, month) => {
      return `${day} ${month.toUpperCase()}`; // Convert month to uppercase
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


// Create a new contest manually
exports.createContest = async (req, res) => {
    try {
        const { name, entryFee, totalSpots, prize, firstprize, maximumteam, winpercentage, date, exchange } = req.body;

        if (!name || !entryFee || !totalSpots || !prize || !firstprize || !maximumteam || !winpercentage || !date || !exchange) {
            return res.status(400).json({ status: "error", message: "All fields are required." });
        }

        const newContest = new Contest({
            name,
            entryFee,
            totalSpots,
            spotsLeft: totalSpots,
            prize,
            firstprize,
            maximumteam,
            winpercentage,
            date,
            exchange,
        });

        await newContest.save();
        res.status(201).json({ status: "success", message: "Contest created successfully.", contest: newContest });
    } catch (error) {
        res.status(500).json({ status: "error", message: "Server error", error });
    }
};

// Join a contest
const mongoose = require("mongoose");

exports.joinContest = async (req, res) => {
    try {
        const { contestId, userId, teamId } = req.body;

        // Check if contestId is a valid ObjectId
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

        // Check if the user has already joined with the max allowed teams
        const userTeams = contest.joinedTeams.filter(team => team.userId.toString() === userId);
        if (userTeams.length >= contest.maximumteam) {
            return res.status(400).json({ status: "error", message: "You have reached the maximum team limit for this contest." });
        }

        // Add the user's team to the contest
        contest.joinedTeams.push({ userId, teamId });
        contest.spotsLeft -= 1;
        await contest.save();

        res.status(200).json({ status: "success", message: "Successfully joined the contest.", contest });
    } catch (error) {
        res.status(500).json({ status: "error", message: "Server error", error });
    }
};


// Delete a contest
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

// Get participants of a contest
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



// exports.getJoinedContests = async (req, res) => {
//     try {
//         const { userId } = req.query; // Pass userId as a query param

//         if (!userId) {
//             return res.status(400).json({ status: "error", message: "User ID is required." });
//         }

//         const joinedContests = await Contest.find({ "joinedTeams.userId": userId });

//         if (!joinedContests || joinedContests.length === 0) {
//             return res.status(404).json({ status: "error", message: "No contests found for this user." });
//         }

//         res.json({ status: "success", data: joinedContests });
//     } catch (error) {
//         res.status(500).json({ status: "error", message: "Server Error", error: error.message });
//     }
// };

exports.getContestsByDate = async (req, res) => {
    try {
        if (!req.query.date) {
            return res.status(400).json({ status: "error", message: "Date is required." });
        }

        // Convert input date (YYYY-MM-DD) to "D MMM" format (e.g., "4 MAR")
        const dateObj = new Date(req.query.date);
        const formattedDate = dateObj.getDate() + " " + dateObj.toLocaleString('en-US', { month: 'short' }).toUpperCase();

        // Find contests matching the formatted date
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

    // Find contests where the user has joined
    const joinedContests = await Contest.find({ "joinedTeams.userId": userId });

    res.status(200).json(joinedContests);
  } catch (error) {
    console.error("Error fetching user contests:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



exports.getTeamForContest = async (req, res) => {
    try {
        console.log('Params:', req.params); // Log incoming parameters
        const { userId, contestId } = req.params;

        // Validate inputs
        if (!userId || !contestId) {
            return res.status(400).json({ message: "Missing userId or contestId" });
        }

        const contest = await Contest.findOne({ _id: contestId });
        console.log('Found contest:', contest); // Log contest details
        
        if (!contest) {
            return res.status(404).json({ message: "Contest not found" });
        }

        console.log('Joined teams:', contest.joinedTeams); // Log joinedTeams array
        const teamEntry = contest.joinedTeams.find(
            (team) => {
                console.log('Comparing:', team.userId.toString(), 'with', userId);
                return team.userId.toString() === userId;
            }
        );
        
        if (!teamEntry) {
            return res.status(404).json({ message: "Team not found for this user in contest" });
        }

        console.log('Team entry found:', teamEntry); // Log the matched entry
        const team = await Team.findById(teamEntry.teamId);
        console.log('Team details:', team); // Log final team
        
        if (!team) {
            return res.status(404).json({ message: "Team details not found" });
        }

        res.json(team);
    } catch (error) {
        console.error("Error fetching team:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

  
