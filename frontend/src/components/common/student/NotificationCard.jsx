import { MdCode, MdCheckCircleOutline, MdChatBubbleOutline, MdEventBusy } from "react-icons/md";
import { formatDistanceToNow } from "../../../utilities/dateUtils";

const iconMap = {
  event:    { icon: <MdCode className="text-lg" />,           bg: "bg-blue-100",   text: "text-blue-600",   border: "border-blue-400" },
  confirm:  { icon: <MdCheckCircleOutline className="text-lg" />, bg: "bg-violet-100", text: "text-violet-600", border: "border-violet-400" },
  mention:  { icon: <MdChatBubbleOutline className="text-lg" />, bg: "bg-gray-200",  text: "text-gray-600",   border: "border-gray-300" },
  cancel:   { icon: <MdEventBusy className="text-lg" />,      bg: "bg-red-100",    text: "text-red-500",    border: "border-red-400" },
};

function getStyle(notification) {
  const msg = notification.message?.toLowerCase() || "";
  if (msg.includes("cancel")) return iconMap.cancel;
  if (msg.includes("mention") || msg.includes("mentioned")) return iconMap.mention;
  if (msg.includes("confirm") || msg.includes("registered") || msg.includes("rsvp")) return iconMap.confirm;
  return iconMap.event;
}

function NotificationCard({ notification, onMarkRead }) {
  const style = getStyle(notification);

  return (
    <div
      className={`bg-white rounded-2xl border-l-4 ${style.border} shadow-sm p-5 flex items-start gap-4 relative transition hover:shadow-md ${
        !notification.isRead ? "ring-1 ring-inset ring-blue-100" : ""
      }`}
    >
      {/* Icon */}
      <div className={`w-11 h-11 rounded-full ${style.bg} ${style.text} flex items-center justify-center flex-shrink-0 mt-0.5`}>
        {style.icon}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4">
          <p className="text-sm font-bold text-gray-900 leading-snug">
            {notification.message}
          </p>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-xs text-gray-400 whitespace-nowrap">
              {formatDistanceToNow(new Date(notification.createdAt))}
            </span>
            {!notification.isRead && (
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 flex-shrink-0" />
            )}
          </div>
        </div>

        {/* Event reference */}
        {notification.event?.title && (
          <p className="text-xs text-gray-500 mt-1">
            {notification.event.title}
          </p>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-3">
          {notification.event?.category && (
            <span className="px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">
              {notification.event.category}
            </span>
          )}
          {notification.event?.club?.name && (
            <span className="px-2.5 py-0.5 rounded-full bg-pink-100 text-pink-600 text-xs font-medium">
              {notification.event.club.name}
            </span>
          )}
        </div>

        {/* Mark as read */}
        {!notification.isRead && onMarkRead && (
          <button
            onClick={() => onMarkRead(notification._id)}
            className="mt-3 text-xs text-blue-600 font-semibold hover:underline"
          >
            Mark as read
          </button>
        )}
      </div>
    </div>
  );
}

export default NotificationCard;
