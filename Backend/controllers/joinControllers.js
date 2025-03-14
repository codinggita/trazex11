const JoinedContest = require("../models/JoinedContest");
const Contest = require("../models/Contest");

const joinContest = async (req, res) => {
  try {
    const { userId, contestId, teamId } = req.body;

    // Check if user has already joined this contest with this team
    const existingEntry = await JoinedContest.findOne({ userId, contestId, teamId });
    if (existingEntry) {
      return res.status(400).json({ message: "You have already joined this contest with this team." });
    }

    // Store the joined contest
    const joinedContest = new JoinedContest({ userId, contestId, teamId });
    await joinedContest.save();

    // Update the contest spots left
    await Contest.findByIdAndUpdate(contestId, { $inc: { spotsLeft: -1 } });

    res.status(201).json({ message: "Contest joined successfully!", joinedContest });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { joinContest };
