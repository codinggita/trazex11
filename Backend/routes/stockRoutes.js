const express = require("express");
const { getAllNSEStocks, getAllBSEStocks } = require("../controllers/stockController");

const router = express.Router();

/**
 * @route   GET /stocks/NSE
 * @desc    Fetch all NSE stock data
 */
router.get("/NSE", getAllNSEStocks);

/**
 * @route   GET /stocks/BSE
 * @desc    Fetch all BSE stock data
 */
router.get("/BSE", getAllBSEStocks);

module.exports = router;
