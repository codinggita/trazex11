const mongoose = require("mongoose");

const JoinedContestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  contestId: { type: mongoose.Schema.Types.ObjectId, ref: "Contest" },
  teamId: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
});

module.exports = mongoose.model("JoinedContest", JoinedContestSchema);
