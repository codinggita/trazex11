
const mongoose = require("mongoose");
const Team = require("../models/Team");
const User = require("../models/User");

exports.createTeam = async (req, res) => {
    try {
      const { userId, stocks, captain, viceCaptain } = req.body;
  
      // Check if user exists
      const userExists = await User.findById(userId);
      if (!userExists) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // Validate stocks
      if (!stocks || stocks.length !== 11) {
        return res.status(400).json({ error: "You must select exactly 11 stocks." });
      }
  
      // Validate Captain and Vice-Captain
      if (!captain || !viceCaptain) {
        return res.status(400).json({ error: "Captain and Vice-Captain must be selected." });
      }
  
      // Ensure all stocks have a valid action
      const formattedStocks = stocks.map(stock => {
        if (!stock.action) {
          throw new Error(`Stock action missing for ${stock.name}`);
        }
        return {
          name: stock.name,
          sector: stock.sector || "Unknown", // Avoid undefined
          image: stock.image || "default.png", // Avoid undefined
          action: stock.action.toUpperCase()
        };
      });
  
      // Ensure Captain and Vice-Captain actions exist
      if (!captain.action || !viceCaptain.action) {
        return res.status(400).json({ error: "Captain or Vice-Captain action missing" });
      }
  
      // Format Captain and Vice-Captain
      const formattedCaptain = {
        name: captain.name,
        sector: captain.sector || "Unknown",
        image: captain.image || "default.png",
        action: captain.action.toUpperCase()
      };
  
      const formattedViceCaptain = {
        name: viceCaptain.name,
        sector: viceCaptain.sector || "Unknown",
        image: viceCaptain.image || "default.png",
        action: viceCaptain.action.toUpperCase()
      };
  
      // Create new team
      const newTeam = new Team({
        userId,
        stocks: formattedStocks,
        captain: formattedCaptain,
        viceCaptain: formattedViceCaptain
      });
  
      await newTeam.save();
      res.status(201).json({ message: "Team created successfully!", team: newTeam });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  };

  exports.getTeamById = async (req, res) => {
    try {
      const { teamId } = req.params;
  
      if (!mongoose.Types.ObjectId.isValid(teamId)) {
        return res.status(400).json({ error: "Invalid team ID" });
      }
  
      const team = await Team.findById(teamId);
      if (!team) {
        return res.status(404).json({ error: "Team not found" });
      }
  
      res.json(team);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

  exports.getTeamsByUser = async (req, res) => {
    try {
      const { userId } = req.params;
  
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ error: "Invalid user ID" });
      }
  
      const teams = await Team.find({ userId });
      if (!teams.length) {
        return res.status(404).json({ error: "No teams found for this user." });
      }
  
      res.json(teams);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };