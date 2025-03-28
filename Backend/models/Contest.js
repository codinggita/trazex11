// const mongoose = require("mongoose");

// const contestSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     entryFee: { type: Number, required: true },
//     totalSpots: { type: Number, required: true },
//     spotsLeft: { type: Number, required: true },
//     prize: { type: Number, required: true },
//     firstprize: { type: Number }, // No fixed 1st place prize, calculated dynamically
//     maximumteam: { type: Number, required: true },
//     winpercentage: { type: Number, required: true },
//     joinedTeams: [{ 
//         userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//         teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' }
//     }],
//     date: { type: String, required: true }, // Format: "D MMM" (e.g., "4 MAR")
//     exchange: { type: String, required: true, enum: ["NSE", "BSE"] },
//     prizeBreakup: [{ rank: String, amount: Number }] // ✅ New field for dynamic prize distribution
// }, { timestamps: true });

// module.exports = mongoose.model("Contest", contestSchema);



const mongoose = require("mongoose");

const contestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    entryFee: {
        type: Number,
        required: true
    },
    totalSpots: {
        type: Number,
        required: true
    },
    spotsLeft: {
        type: Number,
        required: true
    },
    prize: {
        type: Number,
        required: true
    },
    firstprize: {
        type: Number,
        required: true
    },
    maximumteam: {
        type: Number,
        required: true
    },
    winpercentage: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    exchange: {
        type: String,
        required: true
    },
    prizeBreakup: [{
        rank: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        winners: {
            type: Number,
            required: true
        }
    }],
    joinedTeams: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        teamId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Team",
            required: true
        }
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model("Contest", contestSchema);