import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import socket from "../socket/socket";
import { addRealtimeNotification } from "../redux/notificationSlice";

/**
 * useSocket
 *
 * Manages the Socket.IO connection lifecycle tied to the user session:
 *   - Connects when a user is logged in (auth.user is set)
 *   - Disconnects when the user logs out (auth.user becomes null)
 *   - Listens for "new-notification" events and dispatches them to Redux
 *   - Shows a toast for each incoming notification
 *
 * Mount this hook once at the top of the app (App.jsx) so the socket
 * connection is global and not duplicated per page.
 */
function useSocket() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  // Track whether we've already registered event listeners to avoid duplicates
  const listenersAttached = useRef(false);

  useEffect(() => {
    if (!user) {
      // No user — make sure socket is disconnected
      if (socket.connected) {
        socket.disconnect();
      }
      listenersAttached.current = false;
      return;
    }

    // User is logged in — connect if not already connected
    if (!socket.connected) {
      socket.connect();
    }

    // Register event listeners only once per session
    if (!listenersAttached.current) {
      listenersAttached.current = true;

      socket.on("connect", () => {
        console.log("[Socket] Connected:", socket.id);
      });

      socket.on("disconnect", (reason) => {
        console.log("[Socket] Disconnected:", reason);
      });

      socket.on("connect_error", (err) => {
        console.warn("[Socket] Connection error:", err.message);
      });

      // Real-time notification from server (new event, RSVP confirmation, etc.)
      socket.on("new-notification", (notification) => {
        // Add to Redux store so notification pages update immediately
        dispatch(addRealtimeNotification(notification));

        // Show a toast so the user is aware even when not on the notifications page
        toast.info(notification.message || "You have a new notification", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          icon: "🔔",
        });
      });
    }

    // Cleanup: remove listeners and disconnect when component unmounts
    // (This only runs when the entire App unmounts, i.e., page close)
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("connect_error");
      socket.off("new-notification");
      socket.disconnect();
      listenersAttached.current = false;
    };
  }, [user, dispatch]);
}

export default useSocket;
