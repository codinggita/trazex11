
const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  stocks: [
    {
      name: { type: String, required: true },
      sector: { type: String, required: true }, 
      image: { type: String, required: true }, 
      action: { type: String, enum: ["BUY", "SELL"], required: true }
    }
  ],
  captain: {
    name: { type: String, required: true }, 
    sector: { type: String, required: true },
    image: { type: String, required: true },
    action: { type: String, enum: ["BUY", "SELL"], required: true }
  },
  viceCaptain: {
    name: { type: String, required: true }, 
    sector: { type: String, required: true },
    image: { type: String, required: true },
    action: { type: String, enum: ["BUY", "SELL"], required: true }
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Team", teamSchema);
