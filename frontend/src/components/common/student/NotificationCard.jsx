import {
  MdEventAvailable,
  MdCheckCircleOutline,
  MdEventBusy,
  MdStars,
} from "react-icons/md";

import { formatDistanceToNow } from "../../../utilities/dateUtils";

const iconMap = {
  event: {
    icon: <MdEventAvailable className="text-lg" />,
    bg: "bg-blue-50 dark:bg-blue-950/40",
    text: "text-blue-600 dark:text-blue-300",
  },

  interest: {
    icon: <MdStars className="text-lg" />,
    bg: "bg-emerald-50 dark:bg-emerald-950/40",
    text: "text-emerald-700 dark:text-emerald-300",
  },

  confirm: {
    icon: <MdCheckCircleOutline className="text-lg" />,
    bg: "bg-violet-50 dark:bg-violet-950/40",
    text: "text-violet-700 dark:text-violet-300",
  },

  cancel: {
    icon: <MdEventBusy className="text-lg" />,
    bg: "bg-red-50 dark:bg-red-950/40",
    text: "text-red-600 dark:text-red-300",
  },
};

function getStyle(notification) {
  // Interest-based notification
  if (notification.type === "interest") {
    return iconMap.interest;
  }

  const message = notification.message?.toLowerCase() || "";

  // Cancelled event
  if (message.includes("cancel")) {
    return iconMap.cancel;
  }

  // Registration/confirmation
  if (
    message.includes("confirm") ||
    message.includes("registered") ||
    message.includes("rsvp")
  ) {
    return iconMap.confirm;
  }

  // Default event notification
  return iconMap.event;
}

function NotificationCard({ notification, onMarkRead }) {
  const style = getStyle(notification);

  return (
    <div
      className={`relative flex items-start gap-4 rounded-xl border p-4 transition-colors ${
        !notification.isRead
          ? "border-blue-200/80 bg-blue-50/40 dark:border-blue-400/30 dark:bg-blue-950/20"
          : "border-gray-200 bg-white dark:border-slate-700 dark:bg-slate-900"
      }`}
    >
      {/* Icon */}
      <div
        className={`mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${style.bg} ${
          style.text
        }`}
      >
        {style.icon}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Message + Time */}
        <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
          <p className="min-w-0 flex-1 text-sm font-semibold leading-snug text-gray-900 dark:text-slate-100">
            {notification.message}
          </p>

          <div className="flex flex-shrink-0 items-center gap-2">
            <span className="whitespace-nowrap text-xs text-gray-500 dark:text-slate-400">
              {formatDistanceToNow(
                new Date(notification.createdAt)
              )}
            </span>

            {/* Unread indicator */}
            {!notification.isRead && (
              <span className="h-2 w-2 flex-shrink-0 rounded-full bg-blue-600" aria-label="Unread" />
            )}
          </div>
        </div>

        {/* Event title */}
        {notification.event?.title && (
          <p className="mt-1 text-xs text-gray-600 dark:text-slate-300">
            {notification.event.title}
          </p>
        )}

        {/* Event details */}
        <div className="mt-3 flex flex-wrap gap-2">
          {/* Category */}
          {notification.event?.category && (
            <span
              className={`rounded-md px-2 py-1 text-xs font-medium ${
                notification.type === "interest"
                  ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                  : "bg-gray-100 text-gray-600 dark:bg-slate-800 dark:text-slate-300"
              }`}
            >
              {notification.event.category}
            </span>
          )}

          {/* Club */}
          {notification.event?.club?.name && (
            <span className="rounded-md bg-pink-50 px-2 py-1 text-xs font-medium text-pink-700 dark:bg-pink-950/40 dark:text-pink-300">
              {notification.event.club.name}
            </span>
          )}

          {/* Interest label */}
          {notification.type === "interest" && (
            <span className="rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
              Based on your interests
            </span>
          )}
        </div>

        {/* Mark as read */}
        {!notification.isRead && onMarkRead && (
          <button
            onClick={() => onMarkRead(notification._id)}
            className="mt-3 text-xs font-semibold text-blue-700 underline-offset-2 hover:underline dark:text-blue-300"
          >
            Mark as read
          </button>
        )}
      </div>
    </div>
  );
}

export default NotificationCard;