require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const app = require("./src/app");
const connectDatabase = require("./src/config/connectDatabse");
const config = require("./src/config/config");
const socketService = require("./src/socket/socketService");

// ── Allowed origins (must match app.js CORS list) ─────────────────────────────
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  process.env.FRONTEND_URL
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
io.use((socket, next) => {
  try {
    // Try auth.token first (socket.auth), then query, then cookie header
    const token =
      socket.handshake.auth?.token ||
      socket.handshake.query?.token ||
      (() => {
        // Parse cookie header manually (no cookie-parser on the socket layer)
        const cookieHeader = socket.handshake.headers.cookie || "";
        const match = cookieHeader.match(/(?:^|;\s*)token=([^;]+)/);
        return match ? match[1] : null;
      })();

    if (!token) return next(new Error("Authentication required"));

    const decoded = jwt.verify(token, config.JWT_SECRET || process.env.JWT_SECRET);
    socket.data.userId = decoded.id || decoded._id || decoded.userId;
    next();
  } catch {
    next(new Error("Invalid or expired token"));
  }
});

// Register socket handlers via socketService
socketService.init(io);

// ── Start ──────────────────────────────────────────────────────────────────────
connectDatabase();
server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT} (HTTP + Socket.IO)`);
});