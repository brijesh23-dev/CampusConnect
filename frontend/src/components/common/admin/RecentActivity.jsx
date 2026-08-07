import {
  MdPersonAdd,
  MdEvent,
  MdHowToReg,
  MdGroups,
  MdAccessTime,
} from "react-icons/md";

// Derive activity feed from live analytics + stats objects
function buildActivityFeed(analytics, stats) {
  const items = [];

  // Top RSVPed events → RSVP activity items
  if (analytics?.registrationsByEvent?.length) {
    analytics.registrationsByEvent.slice(0, 3).forEach((item, i) => {
      const title = item._id?.title || "an event";
      items.push({
        id: `rsvp-${i}`,
        type: "rsvp",
        message: "Event RSVPs",
        detail: `${item.count} student${item.count !== 1 ? "s" : ""} registered for "${title}"`,
        icon: <MdHowToReg className="text-lg" />,
        iconBg: "bg-emerald-100",
        iconColor: "text-emerald-600",
      });
    });
  }

  // Category breakdown → club/events activity
  if (analytics?.categoryBreakdown?.length) {
    const top = analytics.categoryBreakdown[0];
    if (top) {
      items.push({
        id: "cat-top",
        type: "event",
        message: "Top event category",
        detail: `${top._id || "General"} — ${top.count} event${top.count !== 1 ? "s" : ""} on platform`,
        icon: <MdEvent className="text-lg" />,
        iconBg: "bg-violet-100",
        iconColor: "text-violet-600",
      });
    }
  }

  // Top clubs by registrations
  if (analytics?.topClubs?.length) {
    const club = analytics.topClubs[0];
    if (club) {
      const clubName = club._id?.name || "A club";
      items.push({
        id: "top-club",
        type: "club",
        message: "Most active club",
        detail: `${clubName} — ${club.registrations} total RSVPs`,
        icon: <MdGroups className="text-lg" />,
        iconBg: "bg-amber-100",
        iconColor: "text-amber-600",
      });
    }
  }

  // User registrations stat
  if (stats?.totalStudents !== undefined) {
    items.push({
      id: "students",
      type: "register",
      message: "Total students",
      detail: `${stats.totalStudents} student account${stats.totalStudents !== 1 ? "s" : ""} on platform`,
      icon: <MdPersonAdd className="text-lg" />,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    });
  }

  return items.slice(0, 6);
}

function RecentActivity({ analytics, stats, loading }) {
  const activities = !loading ? buildActivityFeed(analytics, stats) : [];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-bold text-gray-900">Platform Insights</h3>
          <p className="text-xs text-gray-400 mt-0.5">Live analytics summary</p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <MdAccessTime className="text-base" />
          Live
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-start gap-3 animate-pulse">
              <div className="w-9 h-9 rounded-xl bg-gray-100 flex-shrink-0" />
              <div className="flex-1 space-y-1.5 pt-1">
                <div className="h-2.5 bg-gray-100 rounded-full w-2/3" />
                <div className="h-2 bg-gray-100 rounded-full w-full" />
              </div>
            </div>
          ))}
        </div>
      ) : activities.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-gray-300">
          <MdAccessTime className="text-4xl mb-2" />
          <p className="text-xs font-medium text-gray-400">No activity data yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {activities.map((activity) => (
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecentActivity;
