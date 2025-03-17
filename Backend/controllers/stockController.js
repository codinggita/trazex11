const Stock = require("../models/Stock");
const yf = require("yahoo-finance2").default; // Yahoo Finance API

const NSE_STOCKS = [
  "RELIANCE.NS", "TCS.NS", "INFY.NS", "HDFCBANK.NS", "ITC.NS", 
  "SBIN.NS", "LT.NS", "M&M.NS", "TECHM.NS", "IRFC.NS", 
  "TATAMOTORS.NS", "ADANIGREEN.NS"
];

const getAllNSEStocks = async (req, res) => {
  try {
    const stockDataArray = await Promise.all(
      NSE_STOCKS.map(async (symbol) => {
        try {
          const stockData = await yf.quote(symbol);

          const cleanSymbol = stockData.symbol.split(".")[0]; 

          // Create stock object
          const stockObj = {
            symbol: stockData.symbol,
            name: stockData.shortName,
            price: stockData.regularMarketPrice,
            change: stockData.regularMarketChange,
            percentchange: stockData.regularMarketChangePercent,
            LTP: stockData.regularMarketPrice, // ✅ Fixed duplicate LTP
            volume: stockData.regularMarketVolume,
            dayHigh: stockData.regularMarketDayHigh,
            dayLow: stockData.regularMarketDayLow,
            previousClose: stockData.regularMarketPreviousClose,
            openPrice: stockData.regularMarketOpen,
            week52Low: stockData.fiftyTwoWeekLow,
            week52High: stockData.fiftyTwoWeekHigh,

            // ✅ Corrected Low & High calculations
            low7Day: stockData.fiftyTwoWeekLow, // Approximate, since Yahoo doesn't provide exact 7-day data
            high7Day: stockData.fiftyTwoWeekHigh, // Approximate

            low30Day: stockData.fiftyTwoWeekLow, // Approximate for 30 days
            high30Day: stockData.fiftyTwoWeekHigh, // Approximate for 30 days

            low180Day: stockData.fiftyTwoWeekLow, // Approximate for 180 days
            high180Day: stockData.fiftyTwoWeekHigh, // Approximate for 180 days

            image: `https://images.dhan.co/symbol/${cleanSymbol}.png`,
            lastUpdated: new Date(),
          };

          // Upsert stock data in MongoDB (Update if exists, else create new)
          await Stock.findOneAndUpdate(
            { symbol: stockObj.symbol }, 
            stockObj, 
            { upsert: true, new: true }
          );

          return stockObj;
        } catch (err) {
          console.error(`Error fetching ${symbol}:`, err);
          return { symbol, error: "Failed to fetch data" };
        }
      })
    );

    res.status(200).json(stockDataArray);
  } catch (error) {
    console.error("Error fetching NSE stock data:", error);
    res.status(500).json({ message: "Error fetching NSE stock data", error });
  }
};



const BSE_STOCKS = [
  "RELIANCE.BO", "TCS.BO", "INFY.BO", "HDFCBANK.BO", "ITC.BO",
  "SBIN.BO", "LT.BO", "M&M.BO", "TECHM.BO", "IRFC.BO",
  "TATAMOTORS.BO", "ADANIGREEN.BO"
];

const getAllBSEStocks = async (req, res) => {
  try {
    const stockDataArray = await Promise.all(
      BSE_STOCKS.map(async (symbol) => {
        try {
          const stockData = await yf.quote(symbol);
          if (!stockData) {
            console.warn(`No data for ${symbol}`);
            return { symbol, error: "No data found" };
          }

          const cleanSymbol = stockData.symbol.split(".")[0]; 

          const stockObj = {
            symbol: stockData.symbol,
            name: stockData.shortName || "N/A",
            price: stockData.regularMarketPrice || 0,
            change: stockData.regularMarketChangePercent || 0,
            LTP: stockData.regularMarketPrice || 0,
            volume: stockData.regularMarketVolume || 0,
            dayHigh: stockData.regularMarketDayHigh || 0,
            dayLow: stockData.regularMarketDayLow || 0,
            previousClose: stockData.regularMarketPreviousClose || 0,
            openPrice: stockData.regularMarketOpen || 0,
            week52Low: stockData.fiftyTwoWeekLow || 0,
            week52High: stockData.fiftyTwoWeekHigh || 0,
            low7Day: stockData.regularMarketDayLow || 0, // Approximate (Yahoo doesn't provide exact 7-day data)
            high7Day: stockData.regularMarketDayHigh || 0, // Approximate
            low30Day: stockData.regularMarketDayLow || 0, // Approximate
            high30Day: stockData.regularMarketDayHigh || 0, // Approximate
            low180Day: stockData.regularMarketDayLow || 0, // Approximate
            high180Day: stockData.regularMarketDayHigh || 0, // Approximate
            image: `https://images.dhan.co/symbol/${cleanSymbol}.png`,
            lastUpdated: new Date(),
          };

          // Upsert into MongoDB
          await Stock.findOneAndUpdate(
            { symbol: stockObj.symbol }, 
            stockObj, 
            { upsert: true, new: true, runValidators: true }
          );

          return stockObj;
        } catch (err) {
          console.error(`Error fetching ${symbol}:`, err);
          return { symbol, error: "Failed to fetch data" };
        }
      })
    );

    res.status(200).json(stockDataArray);
  } catch (error) {
    console.error("Error fetching BSE stock data:", error);
    res.status(500).json({ message: "Error fetching BSE stock data", error });
  }
};

module.exports = { getAllBSEStocks, getAllNSEStocks };
