import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotifications, markNotificationRead } from "../../redux/notificationSlice";
import NotificationCard from "../../components/common/student/NotificationCard";
import { MdNotifications, MdDoneAll, MdNotificationsNone } from "react-icons/md";

const TABS = ["All", "Unread"];

// Demo notifications shown while backend connects
const DEMO = [
  { _id: "n1", message: "A student registered for your event 'Tech Hackathon 2026'", isRead: false, createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString() },
  { _id: "n2", message: "10 new registrations confirmed for 'React Native Workshop'", isRead: false, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() },
  { _id: "n3", message: "Reminder: Your event starts tomorrow at 9 AM", isRead: true, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() },
  { _id: "n4", message: "5 students cancelled their RSVP for 'Open Source Sprint'", isRead: true, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString() },
];

function ClubNotifications() {
  const dispatch = useDispatch();
  const { notifications, loading } = useSelector((state) => state.notifications);
  const [activeTab, setActiveTab] = useState("All");

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const source = notifications.length > 0 ? notifications : DEMO;
  const unreadCount = source.filter((n) => !n.isRead).length;

  const filtered = activeTab === "Unread" ? source.filter((n) => !n.isRead) : source;

  const handleMarkRead = (id) => dispatch(markNotificationRead(id));
  const handleMarkAllRead = () => {
    source.filter((n) => !n.isRead).forEach((n) => dispatch(markNotificationRead(n._id)));
  };

  return (
    <div className="max-w-3xl mx-auto py-6 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white shadow-md">
            <MdNotifications className="text-2xl" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
              Notifications
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-sm font-bold align-middle">
                  {unreadCount}
                </span>
              )}
            </h1>
            <p className="text-sm text-gray-400 mt-0.5">
              Registration alerts, reminders and event updates.
            </p>
          </div>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllRead}
            className="flex items-center gap-1.5 text-xs text-blue-600 font-bold hover:underline transition flex-shrink-0"
          >
            <MdDoneAll className="text-sm" />
            Mark all read
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
              <span className="ml-2 text-inherit text-xs font-bold">
                ({unreadCount})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center items-center h-48">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Empty state */}
      {!loading && filtered.length === 0 && (
        <div className="bg-gray-50 rounded-2xl p-16 text-center">
          <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mx-auto mb-4">
            <MdNotificationsNone className="text-2xl text-gray-300" />
          </div>
          <p className="text-gray-400 font-medium">
            {activeTab === "Unread" ? "No unread notifications." : "No notifications yet."}
          </p>
        </div>
      )}

      {/* Notification list */}
      {!loading && filtered.length > 0 && (
        <div className="space-y-3">
          {filtered.map((n) => (
            <NotificationCard key={n._id} notification={n} onMarkRead={handleMarkRead} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ClubNotifications;
