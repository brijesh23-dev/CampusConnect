import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchNotifications,
  markNotificationRead,
} from "../../redux/notificationSlice";

import NotificationCard from "../../components/common/student/NotificationCard";

import { MdNotificationsNone, MdDone } from "react-icons/md";

const TABS = ["All", "Unread", "Interests"];

function Notifications() {
  const dispatch = useDispatch();

  const { notifications, loading } = useSelector(
    (state) => state.notifications
  );

  const [activeTab, setActiveTab] = useState("All");

  // Fetch notifications when page loads
  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  // Mark single notification as read
  const handleMarkAsRead = async (id) => {
    try {
      await dispatch(markNotificationRead(id)).unwrap();
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  // Mark all unread notifications as read
  const handleMarkAll = () => {
    notifications
      .filter((notification) => !notification.isRead)
      .forEach((notification) => {
        dispatch(markNotificationRead(notification._id));
      });
  };

  // Filter notifications
  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "Unread") {
      return !notification.isRead;
    }

    if (activeTab === "Interests") {
      return notification.type === "interest";
    }

    return true;
  });

  // Count unread notifications
  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="flex-1 max-w-3xl">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">
              Notifications
            </h1>

            <p className="text-gray-400 text-sm mt-1">
              Stay updated with your campus activities.
            </p>
          </div>

          {unreadCount > 0 && (
            <button
              onClick={handleMarkAll}
              className="flex items-center gap-1.5 text-sm text-blue-600 font-semibold hover:underline mt-1"
            >
              <MdDone className="text-lg" />
              Mark all as read
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {tab}

              {tab === "Unread" && unreadCount > 0 && (
                <span className="ml-2 bg-white/30 text-inherit rounded-full px-1.5 py-0.5 text-xs">
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Empty state */}
        {!loading && filteredNotifications.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <MdNotificationsNone className="text-6xl text-gray-200 mb-4" />

            <p className="text-lg font-semibold text-gray-400">
              {activeTab === "Unread"
                ? "No unread notifications"
                : activeTab === "Interests"
                ? "No interest-based notifications"
                : "No notifications yet"}
            </p>

            <p className="text-sm text-gray-300 mt-1">
              We'll let you know when something happens.
            </p>
          </div>
        )}

        {/* Notification list */}
        {!loading && filteredNotifications.length > 0 && (
          <div className="space-y-3">
            {filteredNotifications.map((notification) => (
              <NotificationCard
                key={notification._id}
                notification={notification}
                onMarkRead={handleMarkAsRead}
              />
            ))}
          </div>
        )}

        {/* Load more */}
        {filteredNotifications.length > 0 && (
          <div className="mt-8 flex justify-center">
            <button className="px-6 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-blue-600 hover:bg-blue-50 transition shadow-sm">
              Load Older Notifications
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Notifications;