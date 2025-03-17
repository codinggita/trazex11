// const mongoose = require("mongoose");

// const stockSchema = new mongoose.Schema({
//   symbol: { type: String, required: true, unique: true }, // Stock Symbol (e.g., RELIANCE.NS)
//   name: { type: String, required: true }, // Stock Name
//   price: { type: Number, required: true }, // Current Price
//   change: { type: Number, required: true }, // Price Change
//   volume: { type: Number, required: true }, // Trading Volume
//   dayHigh: { type: Number, required: true }, // Day High
//   dayLow: { type: Number, required: true }, // Day Low
//   previousClose: { type: Number, required: true }, // Previous Close Price
//   openPrice: { type: Number, required: true }, // Open Price
//   week52Low: { type: Number, required: true }, // 52 Week Low
//   week52High: { type: Number, required: true }, // 52 Week High
//   LTP: { type: Number, required: true }, // Last Traded Price (LTP)
//   low7Day: { type: Number, required: true }, // 7 Day Low
//   high7Day: { type: Number, required: true }, // 7 Day High
//   low30Day: { type: Number, required: true }, // 30 Day Low
//   high30Day: { type: Number, required: true }, // 30 Day High
//   low180Day: { type: Number, required: true }, // 180 Day Low
//   high180Day: { type: Number, required: true }, // 180 Day High
//   logo: { type: String, required: true }, // Stock Logo URL
//   lastUpdated: { type: Date, default: Date.now } // Timestamp
// });

// const Stock = mongoose.model("Stock", stockSchema);
// module.exports = Stock;



const mongoose = require("mongoose");

const StockSchema = new mongoose.Schema({
  symbol: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: Number },
  percentchange: { type: Number },
  change: {type: Number},
  LTP: {type: Number},
  volume: { type: Number },
  dayHigh: { type: Number },
  dayLow: { type: Number },
  previousClose: { type: Number },
  openPrice: { type: Number },
  week52Low: { type: Number },
  week52High: { type: Number },
  LTP: { type: Number },
  low7Day: { type: Number },
  high7Day: { type: Number },
  low30Day: { type: Number },
  high30Day: { type: Number },
  low180Day: { type: Number },
  high180Day: { type: Number },
  image: { type: String },
  lastUpdated: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Stock", StockSchema);
