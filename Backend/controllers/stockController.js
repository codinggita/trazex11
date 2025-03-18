const Stock = require("../models/Stock");
const yf = require("yahoo-finance2").default; // Yahoo Finance API

const NSE_STOCKS = [
  "RELIANCE.NS", "TCS.NS", "INFY.NS", "HDFCBANK.NS", "ITC.NS", 
  "SBIN.NS", "LT.NS", "M&M.NS", "TECHM.NS", "IRFC.NS", 
  "TATAMOTORS.NS", "ADANIGREEN.NS", "BPCL.NS", "ITDC.NS", "DOMS.NS"
];

const calculatePoints = (percentchange, LTP, dayHigh, dayLow, openPrice) => {
  let buyPoints = 0;
  let sellPoints = 0;

  // console.log(`Calculating points - Percent Change: ${percentchange}`);
  let fixedPercent = parseFloat(percentchange.toFixed(2));

  if (percentchange > 0) {
    buyPoints += Math.floor(fixedPercent * 100); // Convert to number before multiplication
    sellPoints -= Math.floor(fixedPercent * 50)
  } else if (percentchange < 0) {
    buyPoints -= Math.floor(Math.abs(fixedPercent) * 50);
    sellPoints += Math.floor(Math.abs(fixedPercent) * 100);
  }
  

  // ✅ Bonus Points for Specific Percent Changes
  // ✅ Bonus Points for Stocks that Cross Certain Percent Thresholds
  const bonusPoints = [
    { threshold: 2, points: 10 },
    { threshold: 5, points: 25 },
    { threshold: 10, points: 50 },
    { threshold: 15, points: 75 },
    { threshold: 20, points: 100 },
    { threshold: 25, points: 125 },
  ];

  // ✅ Apply bonus points for the highest matching threshold
  for (let i = bonusPoints.length - 1; i >= 0; i--) {
    if (Math.abs(percentchange) >= bonusPoints[i].threshold) {
      if (percentchange > 0) {
        buyPoints += bonusPoints[i].points;
      } else {
        sellPoints += bonusPoints[i].points;
      }
      break; // Stop after applying the highest threshold bonus
    }
  }


  return { buyPoints, sellPoints };
};

const getAllNSEStocks = async (req, res) => {
  try {
    const stockDataArray = await Promise.all(
      NSE_STOCKS.map(async (symbol) => {
        try {
          const stockData = await yf.quote(symbol);

          const cleanSymbol = stockData.symbol.split(".")[0];

          const percentchange = stockData.regularMarketChangePercent;
          const LTP = stockData.regularMarketPrice;
          const dayHigh = stockData.regularMarketDayHigh;
          const dayLow = stockData.regularMarketDayLow;
          const openPrice = stockData.regularMarketOpen;

          const { buyPoints, sellPoints } = calculatePoints(percentchange, LTP, dayHigh, dayLow, openPrice);

          const stockObj = {
            symbol: stockData.symbol,
            name: stockData.shortName,
            price: LTP,
            change: stockData.regularMarketChange,
            percentchange,
            LTP,
            volume: stockData.regularMarketVolume,
            dayHigh,
            dayLow,
            previousClose: stockData.regularMarketPreviousClose,
            openPrice,
            week52Low: stockData.fiftyTwoWeekLow,
            week52High: stockData.fiftyTwoWeekHigh,
            buyPoints,
            sellPoints,
            image: `https://images.dhan.co/symbol/${cleanSymbol}.png`,
            // dailyGraph,
            lastUpdated: new Date(),
          };

          // Upsert stock data in MongoDB
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
  "TATAMOTORS.BO", "ADANIGREEN.BO", "BPCL.BO", "ITDC.BO", "DOMS.BO"
];

const getAllBSEStocks = async (req, res) => {
  try {
    const stockDataArray = await Promise.all(
      BSE_STOCKS.map(async (symbol) => {
        try {
          const stockData = await yf.quote(symbol);

          const cleanSymbol = stockData.symbol.split(".")[0];

          const percentchange = stockData.regularMarketChangePercent;
          const LTP = stockData.regularMarketPrice;
          const dayHigh = stockData.regularMarketDayHigh;
          const dayLow = stockData.regularMarketDayLow;
          const openPrice = stockData.regularMarketOpen;

          const { buyPoints, sellPoints } = calculatePoints(percentchange, LTP, dayHigh, dayLow, openPrice);

          const stockObj = {
            symbol: stockData.symbol,
            name: stockData.shortName,
            price: LTP,
            change: stockData.regularMarketChange,
            percentchange,
            LTP,
            volume: stockData.regularMarketVolume,
            dayHigh,
            dayLow,
            previousClose: stockData.regularMarketPreviousClose,
            openPrice,
            week52Low: stockData.fiftyTwoWeekLow,
            week52High: stockData.fiftyTwoWeekHigh,
            buyPoints,
            sellPoints,
            image: `https://images.dhan.co/symbol/${cleanSymbol}.png`,
            lastUpdated: new Date(),
          };

          // Upsert stock data in MongoDB
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
    console.error("Error fetching BSE stock data:", error);
    res.status(500).json({ message: "Error fetching BSE stock data", error });
  }
};

module.exports = { getAllNSEStocks, getAllBSEStocks };