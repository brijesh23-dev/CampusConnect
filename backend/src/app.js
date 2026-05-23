const express = require("express");
const cors = require("cors");
const authRoutes = require('./routes/auth.routes');
const cookie_Parser = require('cookie-parser');
const testRoutes = require("./routes/test.routes");
const eventRoutes = require('./routes/event.routes');
const userRoutes = require('./routes/user.routes');
const notificationRoutes = require('./routes/notifincatrion.routes');

const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(cookie_Parser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth",authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/users", userRoutes);
app.use("/api/notifications", notificationRoutes);
app.get("/", (req, res) => {
  res.send("College Event API running");
});


module.exports = app;