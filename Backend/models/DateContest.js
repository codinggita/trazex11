// const mongoose = require("mongoose");

// const ContestSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     entryFee: { type: Number, required: true },
//     totalSpots: { type: Number, required: true },
//     spotsLeft: { type: Number, required: true },
//     prize: { type: Number, required: true },
//     firstprize: { type: Number, required: true },
//     maximumteam: { type: Number, required: true },
//     winpercentage: { type: Number, required: true },
//     joinedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
// }, { timestamps: true });

// const DateContestSchema = new mongoose.Schema({
//     exchange: { type: String, required: true }, // "NSE" or "BSE"
//     date: { type: String, required: true }, // Example: "26 FEB"
//     day: { type: String, required: true }, // Example: "WED"
//     endTime: { type: String, required: true }, // Example: "15:30"
//     joinedCount: { type: Number, default: 0 },
//     status: { type: String, enum: ["upcoming", "concluded", "ongoing"], default: "upcoming" },
//     contests: [ContestSchema] // ✅ Each date has multiple contests
// });

// module.exports = mongoose.model("DateContest", DateContestSchema);


const mongoose = require("mongoose");

const DateContestSchema = new mongoose.Schema({
    exchange: { type: String, required: true },
    date: { type: String, required: true },
    day: { type: String, required: true },
    endTime: { type: String, required: true },
    joinedCount: { type: Number, default: 0 },
    status: { type: String, enum: ["upcoming", "concluded", "ongoing"], default: "upcoming" },
    contests: []
});

module.exports = mongoose.model("DateContest", DateContestSchema);
