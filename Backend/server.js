

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const cron = require("node-cron");
// const moment = require("moment-timezone");

// const userRoutes = require("./routes/userRoutes");
// const teamRoutes = require("./routes/teamRoutes");
// const dateContestRoutes = require("./routes/dateContestRoutes");
// const contestRoutes = require("./routes/contestRoutes");
// // const newcontestRoutes = require("./routes/newcontestRoutes");
// const DateContest = require("./models/DateContest");
// const stockRoutes = require("./routes/stockRoutes");


// const app = express();
// app.use(express.json());
// app.use(cors());

// mongoose
//   .connect("mongodb+srv://mayankapi6:g58Rc8dB7OgwgfgD@trazex.vra1e.mongodb.net/Trazex", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("✅ Connected to MongoDB"))
//   .catch((err) => console.error("❌ MongoDB Connection Error:", err));


// app.use(userRoutes);
// app.use("/api/team", teamRoutes);
// // app.use("/api1", newcontestRoutes);
// app.use("/api", dateContestRoutes);
// app.use("/api/contests",(req, res, next) => {
//     console.log("✅ Request received:", req.method, req.url);
//     next();
// }, contestRoutes);
// app.use('/api/stocks', stockRoutes);


// // 🕞 Auto-update contest status at 3:31 PM
// cron.schedule("31 15 * * *", async () => {
//     try {
//         const today = moment().tz("Asia/Kolkata").format("D MMM");
//         await DateContest.updateMany({ date: today }, { $set: { status: "concluded" } });
//         console.log(`✅ Contest for ${today} moved to 'Concluded'.`);
//     } catch (error) {
//         console.error("❌ Error updating contest status:", error);
//     }
// });

// // ⏳ Auto-create the next day's contest at 3:35 PM
// cron.schedule("35 15 * * *", async () => {
//     try {
//         const futureMoment = moment().tz("Asia/Kolkata").add(1, "days");
//         const newDate = futureMoment.format("D MMM");
//         const newDay = futureMoment.format("ddd").toUpperCase();

//         if (newDay === "SAT" || newDay === "SUN") return;

//         const contestExists = await DateContest.findOne({ date: newDate });
//         if (!contestExists) {
//             await DateContest.insertMany([
//                 { exchange: "NSE", date: newDate, day: newDay, endTime: "15:30", status: "upcoming" },
//                 { exchange: "BSE", date: newDate, day: newDay, endTime: "15:30", status: "upcoming" }
//             ]);
//             console.log(`✅ Created new contests for ${newDate}.`);
//         }
//     } catch (error) {
//         console.error("❌ Error creating new contest:", error);
//     }
// });

// app.listen(3000, () => console.log("🚀 Server running on port 3000"));












const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cron = require("node-cron");
const moment = require("moment-timezone");

const userRoutes = require("./routes/userRoutes");
const teamRoutes = require("./routes/teamRoutes");
const dateContestRoutes = require("./routes/dateContestRoutes");
const contestRoutes = require("./routes/contestRoutes");
const DateContest = require("./models/DateContest");
const stockRoutes = require("./routes/stockRoutes");
const Contest = require("./models/Contest"); // Ensure this is imported

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect("mongodb+srv://mayankapi6:g58Rc8dB7OgwgfgD@trazex.vra1e.mongodb.net/Trazex", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1); // Exit if connection fails
  });

// Routes
app.use(userRoutes);
app.use("/api/team", teamRoutes);
app.use("/api", dateContestRoutes);
app.use(
  "/api/contests",
  (req, res, next) => {
    console.log("✅ Request received:", req.method, req.url);
    next();
  },
  contestRoutes
);
app.use("/api/stocks", stockRoutes);

// 🕞 Auto-update contest status at 3:31 PM IST
cron.schedule("31 15 * * *", async () => {
  try {
    const today = moment().tz("Asia/Kolkata").format("D MMM");
    await DateContest.updateMany({ date: today }, { $set: { status: "concluded" } });
    console.log(`✅ Contest for ${today} moved to 'Concluded'.`);
  } catch (error) {
    console.error("❌ Error updating contest status:", error);
  }
}, { timezone: "Asia/Kolkata" });


// ⏳ Auto-create DateContest at 3:35 PM IST
cron.schedule("35 15 * * *", async () => {
  try {
    const futureMoment = moment().tz("Asia/Kolkata").add(1, "days");
    const newDate = futureMoment.format("D MMM");
    const newDay = futureMoment.format("ddd").toUpperCase();

    if (newDay === "SAT" || newDay === "SUN") {
      console.log(`⏩ Skipping contest creation for ${newDate} (weekend)`);
      return;
    }

    const contestExists = await DateContest.findOne({ date: newDate });
    if (!contestExists) {
      await DateContest.insertMany([
        { exchange: "NSE", date: newDate, day: newDay, endTime: "15:30", status: "upcoming" },
        { exchange: "BSE", date: newDate, day: newDay, endTime: "15:30", status: "upcoming" },
      ]);
      console.log(`✅ Created new DateContests for ${newDate}.`);
    } else {
      console.log(`ℹ️ DateContest for ${newDate} already exists.`);
    }
  } catch (error) {
    console.error("❌ Error creating new DateContest:", error);
  }
}, { timezone: "Asia/Kolkata" });

// Function to calculate prize breakup (from your earlier code)
const calculatePrizeBreakup = (totalParticipants, prize, winpercentage) => {
  const totalWinners = Math.floor((winpercentage / 100) * totalParticipants);
  const prizeBreakup = [];

  const entryFee = prize / totalParticipants;
  const basePrize = Math.floor(entryFee * 1.2);

  const tiers = [
    { rank: "Rank 1", winners: 1, prizePerPerson: basePrize * 15 },
    { rank: "Rank 2", winners: 1, prizePerPerson: basePrize * 9.5 },
    { rank: "Rank 3", winners: 1, prizePerPerson: basePrize * 4 },
    { rank: "Rank 4-10", winners: Math.min(7, totalWinners - 3), prizePerPerson: basePrize * 1.5 },
    { rank: "Rank 11-50", winners: Math.min(40, totalWinners - 10), prizePerPerson: basePrize },
    { rank: "Rank 51-100", winners: Math.min(50, totalWinners - 50), prizePerPerson: basePrize * 0.8 },
    { rank: "Rank 101-200", winners: Math.min(100, totalWinners - 100), prizePerPerson: basePrize * 0.6 },
    { rank: "Rank 201-500", winners: Math.min(300, totalWinners - 200), prizePerPerson: basePrize * 0.4 },
    { rank: "Rank 501-1000", winners: Math.min(500, totalWinners - 500), prizePerPerson: basePrize * 0.2 },
  ];

  let winnersAssigned = 0;
  let totalDistributed = 0;

  tiers.forEach((tier) => {
    if (winnersAssigned < totalWinners && tier.winners > 0) {
      const actualWinners = Math.min(tier.winners, totalWinners - winnersAssigned);
      const amount = tier.prizePerPerson * actualWinners;
      prizeBreakup.push({ rank: tier.rank, amount: tier.prizePerPerson, winners: actualWinners });
      totalDistributed += amount;
      winnersAssigned += actualWinners;
    }
  });

  let remaining = prize - totalDistributed;
  if (remaining > 0) {
    const extraPerWinner = Math.floor(remaining / totalWinners);
    const extraWinners = remaining - extraPerWinner * totalWinners;

    prizeBreakup.forEach((tier) => {
      tier.amount += extraPerWinner;
    });

    let adjustedWinners = 0;
    for (let i = 0; i < prizeBreakup.length && adjustedWinners < extraWinners; i++) {
      const winners = prizeBreakup[i].winners;
      const increase = Math.min(extraWinners - adjustedWinners, winners);
      prizeBreakup[i].amount += 1;
      adjustedWinners += increase;
    }
  }

  return prizeBreakup;
};

// ⏳ Auto-create Contest at 3:36 PM IST (slightly offset to avoid overlap)
const autoCreateContest = async () => {
  try {
    const futureMoment = moment().tz("Asia/Kolkata").add(1, "days");
    const newDate = futureMoment.format("D MMM");
    const newDay = futureMoment.format("ddd").toUpperCase();

    if (newDay === "SAT" || newDay === "SUN") {
      console.log(`⏩ Skipping Contest creation for ${newDate} (weekend)`);
      return;
    }

    const exchanges = ["NSE", "BSE"];
    const totalSpots = 50;
    const entryFee = 100;
    const prize = entryFee * totalSpots;
    const winpercentage = 50;

    for (const exchange of exchanges) {
      const prizeBreakup = calculatePrizeBreakup(totalSpots, prize, winpercentage);

      const contestExists = await Contest.findOne({ date: newDate, exchange });
      if (!contestExists) {
        const newContest = new Contest({
          name: `Daily Stock Challenge - ${exchange}`,
          entryFee,
          totalSpots,
          spotsLeft: totalSpots,
          prize,
          firstprize: prizeBreakup.length > 0 ? prizeBreakup[0].amount : 0,
          maximumteam: 5,
          winpercentage,
          date: newDate,
          exchange,
          prizeBreakup,
        });

        await newContest.save();
        console.log(`✅ Contest for ${newDate} (${exchange}) created successfully.`);
      } else {
        console.log(`ℹ️ Contest for ${newDate} (${exchange}) already exists.`);
      }
    }
  } catch (error) {
    console.error("❌ Error creating Contest:", error);
  }
};

cron.schedule("36 15 * * *", autoCreateContest, { timezone: "Asia/Kolkata" });

// Start Server
app.listen(3000, () => console.log("🚀 Server running on port 3000"));