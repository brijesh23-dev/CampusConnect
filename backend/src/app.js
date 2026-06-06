const express = require("express");
const cors = require("cors");
const authRoutes = require('./routes/auth.routes');
const cookie_Parser = require('cookie-parser');
const testRoutes = require("./routes/test.routes");
const eventRoutes = require('./routes/event.routes');
const userRoutes = require('./routes/user.routes');
const notificationRoutes = require('./routes/notifincatrion.routes');
const morgan = require('morgan');

const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(morgan('dev'));
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
app.use((err,req,res,next)=>{
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    success:false,
    message:err.message || "internal server error"
  })
})



module.exports = app;