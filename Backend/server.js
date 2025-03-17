
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const cron = require("node-cron");
// const moment = require("moment-timezone");

// const userRoutes = require("./routes/userRoutes");
// const teamRoutes = require("./routes/teamRoutes");
// // const contestRoutes = require("./routes/contestRoutes");
// const dateContestRoutes = require("./routes/dateContestRoutes");
// const DateContest = require("./models/DateContest");
// const newcontestRoutes = require("./routes/newcontestRoutes");

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
// // app.use(contestRoutes);
// app.use("/api", dateContestRoutes);
// app.use("/api1", newcontestRoutes);

// // 🕞 Auto-update contest status daily at 3:31 PM
// cron.schedule("31 15 * * *", async () => {
//     try {
//         const today = moment().tz("Asia/Kolkata").format("D MMM");
//         await DateContest.updateMany({ date: today }, { $set: { status: "concluded" } });
//         console.log(`✅ Contest for ${today} moved to 'Concluded'.`);
//     } catch (error) {
//         console.error("❌ Error updating contest status:", error);
//     }
// });

// // 🌙 Auto-create the next day's contest at midnight
// cron.schedule("0 0 * * *", async () => {
//     try {
//         const futureMoment = moment().tz("Asia/Kolkata").add(1, "days");
//         const newDate = futureMoment.format("D MMM");
//         const newDay = futureMoment.format("ddd").toUpperCase();

//         const contestExists = await DateContest.findOne({ date: newDate });
//         if (!contestExists) {
//             await DateContest.create({
//                 exchange: "NSE",
//                 date: newDate,
//                 day: newDay,
//                 endTime: "15:30",
//                 status: "upcoming",
//             });
//             console.log(`✅ Created a new contest for ${newDate}.`);
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
const crypto = require("crypto");
require("dotenv").config(); // Load environment variables

const userRoutes = require("./routes/userRoutes");
const teamRoutes = require("./routes/teamRoutes");
const dateContestRoutes = require("./routes/dateContestRoutes");
const contestRoutes = require("./routes/contestRoutes");
const DateContest = require("./models/DateContest");

// ✅ Load secret from .env for security
const secret = process.env.SECRET_KEY || "default_secret_key";

// ✅ Securely set `userId` (replace logic with actual user authentication flow)
const userId = "sample-uuid-user-id"; // Example - Use your logic to get the user ID

// ✅ Crypto Hash Generation
const hash = crypto.createHmac("sha256", secret).update(userId).digest("hex");

const app = express();
app.use(express.json());
app.use(cors());

// ✅ MongoDB Connection with Optimized Options
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/Trazex")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ Routes Setup
app.use(userRoutes);
app.use("/api/team", teamRoutes);
app.use("/api", dateContestRoutes);
app.use("/api/contests", (req, res, next) => {
  console.log("✅ Request received:", req.method, req.url);
  next();
}, contestRoutes);

// 🕞 Auto-update contest status at 3:31 PM
cron.schedule("31 15 * * *", async () => {
  try {
    const today = moment().tz("Asia/Kolkata").format("D MMM");
    await DateContest.updateMany({ date: today }, { $set: { status: "concluded" } });
    console.log(`✅ Contest for ${today} moved to 'Concluded'.`);
  } catch (error) {
    console.error("❌ Error updating contest status:", error);
  }
});

// ⏳ Auto-create the next day's contest at 3:35 PM
cron.schedule("35 15 * * *", async () => {
  try {
    const futureMoment = moment().tz("Asia/Kolkata").add(1, "days");
    const newDate = futureMoment.format("D MMM");
    const newDay = futureMoment.format("ddd").toUpperCase();

    if (newDay === "SAT" || newDay === "SUN") return;

    const contestExists = await DateContest.findOne({ date: newDate });
    if (!contestExists) {
      await DateContest.insertMany([
        { exchange: "NSE", date: newDate, day: newDay, endTime: "15:30", status: "upcoming" },
        { exchange: "BSE", date: newDate, day: newDay, endTime: "15:30", status: "upcoming" }
      ]);
      console.log(`✅ Created new contests for ${newDate}.`);
    }
  } catch (error) {
    console.error("❌ Error creating new contest:", error);
  }
});

// ✅ Server Setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
