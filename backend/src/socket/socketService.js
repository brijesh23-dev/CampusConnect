/**
 * socketService.js
 *
 * Singleton that holds a reference to the Socket.IO server instance
 * and a Map of userId → socketId so controllers can push to specific users.
 *
 * Usage in controllers:
 *   const socketService = require('../socket/socketService');
 *   socketService.sendToUser(userId, 'new-notification', payload);
 */

let _io = null;

/** Map<string, string>  userId (string) → socket.id */
const userSocketMap = new Map();

/**
 * Called once in server.js after Socket.IO is created.
 * @param {import('socket.io').Server} io
 */
// function init(io) {
//   _io = io;

// io.on("connection", (socket) => {
//   const userId = socket.data.userId; // set during auth middleware
//   if (userId) {
//     userSocketMap.set(userId, socket.id);
//     console.log(`[Socket] User connected: ${userId} → ${socket.id}`);
//   }

//   socket.on("disconnect", () => {
//     if (userId) {
//       userSocketMap.delete(userId);
//       console.log(`[Socket] User disconnected: ${userId}`);
//     }
//   });
// });

function init(io) {
  _io = io;

  io.on("connection", (socket) => {
    const userId = socket.data.userId;

    if (!userId) {
      console.log("[Socket] No user ID found");
      return;
    }

    const existingSocketId = userSocketMap.get(userId.toString());

    // User is already connected somewhere else
    if (existingSocketId && existingSocketId !== socket.id) {
      console.log(`[Socket] Replacing old socket for user ${userId}`);

      io.to(existingSocketId).emit("force_logout", {
        message: "Your account was logged in from another device.",
      });
    }

    // Store the new socket
    userSocketMap.set(userId.toString(), socket.id);

    console.log(`[Socket] User connected: ${userId} → ${socket.id}`);

    socket.on("disconnect", () => {
      // Only delete if THIS socket is still the
      // active socket for this user
      if (userSocketMap.get(userId.toString()) === socket.id) {
        userSocketMap.delete(userId.toString());

        console.log(`[Socket] User disconnected: ${userId}`);
      }
    });
  });
}
/**
 * Emit an event to a specific user by their MongoDB _id.
 * @param {string|import('mongoose').Types.ObjectId} userId
 * @param {string} event  – e.g. "new-notification"
 * @param {*} payload     – any JSON-serialisable data
 */
function sendToUser(userId, event, payload) {
  if (!_io) return;
  const socketId = userSocketMap.get(userId.toString());
  if (socketId) {
    _io.to(socketId).emit(event, payload);
  }
}

module.exports = { init, sendToUser };
