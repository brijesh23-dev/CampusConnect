require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const app = require("./src/app");
const connectDatabase = require("./src/config/connectDatabse");
const config = require("./src/config/config");
const socketService = require("./src/socket/socketService");
const socketAuth = require("./src/socket/socketAuth");
const { token } = require("morgan");

// ── Allowed origins (must match app.js CORS list) ─────────────────────────────
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  process.env.FRONTEND_URL,
];

// ── HTTP server ────────────────────────────────────────────────────────────────
const server = http.createServer(app);

// ── Socket.IO ──────────────────────────────────────────────────────────────────
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
  },
});

// JWT authentication middleware for Socket.IO
// The client sends the token either as a handshake auth field or query param.

const startServer = async() => {
  io.use(socketAuth);

  // Register socket handlers via socketService
  socketService.init(io);

  // ── Start ──────────────────────────────────────────────────────────────────────
  await connectDatabase();
  server.listen(config.PORT, () => {
    console.log(`Server running on http://localhost:${config.PORT} (HTTP + Socket.IO)`);
  });
};

startServer();
