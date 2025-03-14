const express = require("express");
const { joinContest } = require("../controllers/joinControllers");
const router = express.Router();

router.post("/join-contest", joinContest);

module.exports = router;
