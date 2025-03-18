const mongoose = require("mongoose");

const StockSchema = new mongoose.Schema({
  symbol: { type: String, required: true, unique: true, index: true }, // Added index for performance
  name: { type: String, required: true },
  price: { type: Number, required: true, min: 0 }, // LTP can be the same as price
  percentchange: { type: Number },
  change: { type: Number },
  volume: { type: Number, min: 0 }, // Volume should be non-negative
  dayHigh: { type: Number, min: 0 },
  dayLow: { type: Number, min: 0 },
  previousClose: { type: Number, min: 0 },
  openPrice: { type: Number, min: 0 },
  week52Low: { type: Number, min: 0 },
  week52High: { type: Number, min: 0 },
  low7Day: { type: Number, min: 0 },
  high7Day: { type: Number, min: 0 },
  low30Day: { type: Number, min: 0 },
  high30Day: { type: Number, min: 0 },
  low180Day: { type: Number, min: 0 },
  high180Day: { type: Number, min: 0 },
  buyPoints: { type: Number, default: 0 },
  sellPoints: { type: Number, default: 0 },
  image: { type: String },
  lastUpdated: { type: Date, default: Date.now },
  dailyGraph: [
    {
      timestamp: { type: Date, required: true },
      price: { type: Number, required: true, min: 0 },
    },
  ],
}, {
  timestamps: true, // Optional: Adds createdAt and updatedAt fields
});

module.exports = mongoose.model("Stock", StockSchema);