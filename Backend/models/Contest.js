const mongoose = require("mongoose");

const contestSchema = new mongoose.Schema({
    name: { type: String, required: true },
    entryFee: { type: Number, required: true },
    totalSpots: { type: Number, required: true },
    spotsLeft: { type: Number, required: true },
    prize: { type: Number, required: true },
    firstprize: { type: Number, required: true },
    maximumteam: { type: Number, required: true },
    winpercentage: { type: Number, required: true },
    joinedTeams: [{ 
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' }
    }],
    date: { type: String, required: true }, // Format: "D MMM" (e.g., "4 MAR")
    exchange: { type: String, required: true, enum: ["NSE", "BSE"] } // ✅ New field
}, { timestamps: true });

module.exports = mongoose.model("Contest", contestSchema);
