import { io } from "socket.io-client";

/**
 * Singleton Socket.IO client.
 *
 * autoConnect: false — we manually connect after the user authenticates
 * so the JWT cookie is already set and the server auth middleware can
 * verify the handshake.
 *
 * withCredentials: true — sends the httpOnly cookie (token) on the
 * WebSocket upgrade request, matching the server-side cookie parser.
 */
const socket = io(import.meta.env.VITE_API_URL, {
  autoConnect: false,
  withCredentials: true,
});

export default socket;
