import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlatformAnalytics, fetchAdminStats } from "../../redux/adminSlice";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  MdPeople,
  MdEvent,
  MdGroups,
  MdTrendingUp,
  MdBarChart,
} from "react-icons/md";

// ── Helpers ────────────────────────────────────────────────────────────────────

const CATEGORY_COLORS = [
  "#6366f1", "#ec4899", "#10b981", "#f97316",
  "#a855f7", "#0ea5e9", "#f59e0b", "#94a3b8",
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-100 shadow-lg rounded-xl px-4 py-3 text-xs">
      <p className="font-bold text-gray-700 mb-1 truncate max-w-[180px]">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} style={{ color: p.color }}>
          {p.name}: <span className="font-bold">{p.value?.toLocaleString()}</span>
        </p>
      ))}
    </div>
  );
};

// Skeleton card placeholder
function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 animate-pulse">
      <div className="flex justify-between mb-3">
        <div className="w-10 h-10 bg-gray-100 rounded-xl" />
        <div className="w-12 h-4 bg-gray-100 rounded-full" />
      </div>
      <div className="h-7 bg-gray-100 rounded-full w-1/2 mb-2" />
      <div className="h-3 bg-gray-100 rounded-full w-2/3" />
    </div>
  );
}

function SkeletonChart() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 animate-pulse">
      <div className="h-4 bg-gray-100 rounded-full w-1/3 mb-2" />
      <div className="h-3 bg-gray-100 rounded-full w-1/2 mb-6" />
      <div className="flex items-end gap-2 h-[180px]">
        {[60, 85, 45, 100, 70, 55, 90, 40].map((h, i) => (
          <div key={i} className="flex-1 bg-gray-100 rounded-t-lg" style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────

function AdminAnalytics() {
  const dispatch = useDispatch();
  const { analytics, stats, loading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchPlatformAnalytics());
    dispatch(fetchAdminStats());
  }, [dispatch]);

  // ── Derive chart data from API response ──────────────────────────────────────

  // Stat cards
  const statCards = [
    {
      title: "Total Users",
      value: stats?.totalUsers ?? analytics?.stats?.totalUsers,
      icon: <MdPeople className="text-2xl" />,
      iconBg: "bg-blue-100", iconColor: "text-blue-600",
    },
    {
      title: "Active Clubs",
      value: stats?.totalClubs ?? analytics?.stats?.totalClubs,
      icon: <MdGroups className="text-2xl" />,
      iconBg: "bg-violet-100", iconColor: "text-violet-600",
    },
    {
      title: "Total Events",
      value: stats?.totalEvents ?? analytics?.stats?.totalEvents,
      icon: <MdEvent className="text-2xl" />,
      iconBg: "bg-amber-100", iconColor: "text-amber-600",
    },
    {
      title: "Total RSVPs",
      value: stats?.totalRegistrations ?? analytics?.stats?.totalRegistrations,
      icon: <MdTrendingUp className="text-2xl" />,
      iconBg: "bg-emerald-100", iconColor: "text-emerald-600",
    },
  ];

  // Category breakdown pie
  const categoryData = (analytics?.categoryBreakdown || []).map((c, i) => ({
    name: c._id || "Other",
    value: c.count,
    color: CATEGORY_COLORS[i % CATEGORY_COLORS.length],
  }));

  // Top events bar chart (registrationsByEvent)
  const eventsBarData = (analytics?.registrationsByEvent || [])
    .map((item) => ({
      name: item._id?.title
        ? item._id.title.length > 20 ? item._id.title.slice(0, 20) + "…" : item._id.title
        : "Unknown",
      fullName: item._id?.title || "Unknown",
      RSVPs: item.count,
    }))
    .sort((a, b) => b.RSVPs - a.RSVPs)
    .slice(0, 8);

  // Top clubs leaderboard
  const topClubs = (analytics?.topClubs || []).map((c) => ({
    name: c._id?.name || "Unknown Club",
    registrations: c.registrations,
  }));

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Platform Analytics</h1>
        <p className="text-sm text-gray-400 mt-1">Live overview of platform growth and activity.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
          : statCards.map((card) => (
              <div key={card.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 rounded-xl ${card.iconBg} ${card.iconColor} flex items-center justify-center`}>
                    {card.icon}
                  </div>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-gray-900">
                    {card.value !== undefined && card.value !== null
                      ? Number(card.value).toLocaleString()
                      : "—"}
                  </p>
                  <p className="text-xs text-gray-400 font-medium mt-0.5">{card.title}</p>
                </div>
              </div>
            ))}
      </div>

      {/* Top Events by RSVPs + Category Breakdown */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Events bar chart */}
        {loading ? (
          <SkeletonChart />
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-sm font-bold text-gray-900 mb-1">Top Events by RSVPs</h3>
            <p className="text-xs text-gray-400 mb-5">Registration count per event</p>
            {eventsBarData.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[220px] text-gray-300">
                <MdBarChart className="text-5xl mb-2" />
                <p className="text-xs text-gray-400">No event data yet</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={eventsBarData} barSize={22}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="RSVPs" name="RSVPs" radius={[6, 6, 0, 0]}>
                    {eventsBarData.map((_, i) => (
                      <Cell key={i} fill={CATEGORY_COLORS[i % CATEGORY_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        )}

        {/* Category breakdown pie */}
        {loading ? (
          <SkeletonChart />
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-sm font-bold text-gray-900 mb-1">Event Category Breakdown</h3>
            <p className="text-xs text-gray-400 mb-5">Distribution of events by category</p>
            {categoryData.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[220px] text-gray-300">
                <MdBarChart className="text-5xl mb-2" />
                <p className="text-xs text-gray-400">No category data yet</p>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <ResponsiveContainer width="55%" height={180}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={48}
                      outerRadius={72}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {categoryData.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v, name) => [v, name]} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex-1 space-y-2">
                  {categoryData.map((c) => (
                    <div key={c.name} className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1.5 text-gray-600 font-medium">
                        <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: c.color }} />
                        {c.name}
                      </span>
                      <span className="font-bold text-gray-800">{c.value} events</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Top Clubs leaderboard */}
      {loading ? (
        <SkeletonChart />
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-sm font-bold text-gray-900 mb-1">Top Clubs by Activity</h3>
          <p className="text-xs text-gray-400 mb-5">Ranked by total student RSVPs</p>
          {topClubs.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">No club data yet</p>
          ) : (
            <div className="space-y-3">
              {topClubs.map((club, idx) => {
                const maxReg = topClubs[0]?.registrations || 1;
                const pct = Math.round((club.registrations / maxReg) * 100);
                return (
                  <div key={club.name} className="flex items-center gap-4">
                    <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0 ${
                      idx === 0 ? "bg-amber-400 text-white"
                      : idx === 1 ? "bg-gray-300 text-white"
                      : idx === 2 ? "bg-orange-400 text-white"
                      : "bg-gray-100 text-gray-500"
                    }`}>{idx + 1}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between mb-1">
                        <p className="text-xs font-bold text-gray-900 truncate">{club.name}</p>
                        <span className="text-xs font-bold text-gray-700 flex-shrink-0 ml-2">
                          {club.registrations.toLocaleString()} RSVPs
                        </span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-violet-500 to-blue-500 rounded-full transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AdminAnalytics;
