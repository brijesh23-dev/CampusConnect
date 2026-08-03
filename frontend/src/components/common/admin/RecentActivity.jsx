import {
  MdPersonAdd,
  MdEvent,
  MdHowToReg,
  MdDeleteOutline,
  MdGroups,
  MdAccessTime,
} from "react-icons/md";

// Simulated recent platform activity
const ACTIVITIES = [
  {
    id: 1,
    type: "register",
    message: "New student registered",
    detail: "priya.sharma@campus.edu",
    time: "2 min ago",
    icon: <MdPersonAdd className="text-lg" />,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    id: 2,
    type: "event",
    message: "New event created",
    detail: "React Native Workshop · Campus Tech Society",
    time: "14 min ago",
    icon: <MdEvent className="text-lg" />,
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
  },
  {
    id: 3,
    type: "rsvp",
    message: "Event RSVP",
    detail: "12 students registered for 'AI Summit 2026'",
    time: "31 min ago",
    icon: <MdHowToReg className="text-lg" />,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    id: 4,
    type: "club",
    message: "New club joined",
    detail: "Photography Society · Arts",
    time: "1 hr ago",
    icon: <MdGroups className="text-lg" />,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
  },
  {
    id: 5,
    type: "delete",
    message: "Event removed",
    detail: "'Cancelled: Annual Sports Fest' by admin",
    time: "2 hr ago",
    icon: <MdDeleteOutline className="text-lg" />,
    iconBg: "bg-red-100",
    iconColor: "text-red-500",
  },
  {
    id: 6,
    type: "rsvp",
    message: "Event RSVP",
    detail: "8 students registered for 'Photography Walk'",
    time: "3 hr ago",
    icon: <MdHowToReg className="text-lg" />,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
];

function RecentActivity() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-bold text-gray-900">Recent Activity</h3>
          <p className="text-xs text-gray-400 mt-0.5">Latest platform events</p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <MdAccessTime className="text-base" />
          Live
        </div>
      </div>

      <div className="space-y-4">
        {ACTIVITIES.map((activity, idx) => (
          <div key={activity.id} className="flex items-start gap-3">
            {/* Icon */}
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${activity.iconBg} ${activity.iconColor}`}
            >
              {activity.icon}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 pt-0.5">
              <p className="text-xs font-semibold text-gray-800 truncate">
                {activity.message}
              </p>
              <p className="text-xs text-gray-400 truncate mt-0.5">{activity.detail}</p>
            </div>

            {/* Time */}
            <span className="text-xs text-gray-300 font-medium flex-shrink-0 pt-0.5">
              {activity.time}
            </span>

            {/* Connector line (except last) */}
            {idx < ACTIVITIES.length - 1 && (
              <div className="absolute left-[2.8rem] mt-9 w-px h-4 bg-gray-100" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentActivity;
