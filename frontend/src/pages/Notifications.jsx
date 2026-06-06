
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchNotifications,
  markNotificationRead,
} from "../redux/notificationSlice";

function Notifications() {
  const dispatch = useDispatch();

  const { notifications, loading } = useSelector(
    (state) => state.notifications
  );

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const handleMarkAsRead = async (id) => {
    try {
      await dispatch(markNotificationRead(id)).unwrap();
    } catch (error) {
      alert("Failed to mark as read");
    }
  };

  if (loading) {
    return <h1>Loading notifications...</h1>;
  }

  return (
    <div>
      <h1>Notifications</h1>

      {notifications.length === 0 && (
        <p>No notifications found</p>
      )}

      {notifications.map((notification) => (
        <div key={notification._id}>
          <h3>{notification.message}</h3>

          <p>
            Event: {notification.event?.title}
          </p>

          <p>
            Status: {notification.isRead ? "Read" : "Unread"}
          </p>

          {!notification.isRead && (
            <button
              onClick={() => handleMarkAsRead(notification._id)}
            >
              Mark as Read
            </button>
          )}

          <hr />
        </div>
      ))}
    </div>
  );
}

export default Notifications;