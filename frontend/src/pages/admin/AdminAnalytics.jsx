import {
  AreaChart,
  Area,
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
import { MdPeople, MdEvent, MdGroups, MdTrendingUp } from "react-icons/md";

// ── Mock data ──────────────────────────────────────────────────────────────────
const USER_GROWTH = [
  { month: "Jan", students: 420, clubs: 12 },
  { month: "Feb", students: 680, clubs: 18 },
  { month: "Mar", students: 1100, clubs: 26 },
  { month: "Apr", students: 1580, clubs: 34 },
  { month: "May", students: 2200, clubs: 48 },
  { month: "Jun", students: 3100, clubs: 58 },
  { month: "Jul", students: 4400, clubs: 72 },
];

const REGISTRATION_TRENDS = [
  { week: "W1", registrations: 120 },
  { week: "W2", registrations: 340 },
  { week: "W3", registrations: 210 },
  { week: "W4", registrations: 480 },
  { week: "W5", registrations: 390 },
  { week: "W6", registrations: 620 },
  { week: "W7", registrations: 510 },
  { week: "W8", registrations: 780 },
];

const CATEGORY_BREAKDOWN = [
  { name: "Technology", value: 38, color: "#6366f1" },
  { name: "Arts", value: 16, color: "#ec4899" },
  { name: "Business", value: 22, color: "#10b981" },
  { name: "Sports", value: 12, color: "#f97316" },
  { name: "Music", value: 8, color: "#a855f7" },
  { name: "Other", value: 4, color: "#94a3b8" },
];

const TOP_CLUBS = [
  { name: "Campus Tech Society", registrations: 1248, events: 24 },
  { name: "Sports Federation", registrations: 980, events: 38 },
  { name: "Entrepreneurship Cell", registrations: 742, events: 20 },
  { name: "Coding Club", registrations: 698, events: 31 },
  { name: "Music Society", registrations: 520, events: 14 },
];

const STAT_CARDS = [
  { title: "Total Users", value: "10,248", change: "+12%", positive: true, icon: <MdPeople className="text-2xl" />, iconBg: "bg-blue-100", iconColor: "text-blue-600" },
  { title: "Active Clubs", value: "84", change: "+5%", positive: true, icon: <MdGroups className="text-2xl" />, iconBg: "bg-violet-100", iconColor: "text-violet-600" },
  { title: "Events This Month", value: "127", change: "+31%", positive: true, icon: <MdEvent className="text-2xl" />, iconBg: "bg-amber-100", iconColor: "text-amber-600" },
  { title: "Total RSVPs", value: "14,890", change: "+18%", positive: true, icon: <MdTrendingUp className="text-2xl" />, iconBg: "bg-emerald-100", iconColor: "text-emerald-600" },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-100 shadow-lg rounded-xl px-4 py-3 text-xs">
      <p className="font-bold text-gray-700 mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} style={{ color: p.color }}>
          {p.name}: <span className="font-bold">{p.value.toLocaleString()}</span>
        </p>
      ))}
    </div>
  );
};

function AdminAnalytics() {
  return (
    <div className="max-w-6xl mx-auto py-6 px-4 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Platform Analytics</h1>
        <p className="text-sm text-gray-400 mt-1">Real-time overview of platform growth and activity.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STAT_CARDS.map((card) => (
          <div key={card.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className={`w-10 h-10 rounded-xl ${card.iconBg} ${card.iconColor} flex items-center justify-center`}>
                {card.icon}
              </div>
              <span className={`text-xs font-bold ${card.positive ? "text-green-600" : "text-red-500"}`}>
                {card.change}
              </span>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-gray-900">{card.value}</p>
              <p className="text-xs text-gray-400 font-medium mt-0.5">{card.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* User Growth + Registration Trend */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* User growth */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-sm font-bold text-gray-900 mb-1">User Growth</h3>
          <p className="text-xs text-gray-400 mb-5">Students & clubs registered over time</p>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={USER_GROWTH}>
              <defs>
                <linearGradient id="gStudents" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gClubs" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ec4899" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
              <Area type="monotone" dataKey="students" name="Students" stroke="#6366f1" fill="url(#gStudents)" strokeWidth={2} dot={false} />
              <Area type="monotone" dataKey="clubs" name="Clubs" stroke="#ec4899" fill="url(#gClubs)" strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Registration trends */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-sm font-bold text-gray-900 mb-1">Weekly Registrations</h3>
          <p className="text-xs text-gray-400 mb-5">Event RSVPs per week this semester</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={REGISTRATION_TRENDS} barSize={24}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="week" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="registrations" name="RSVPs" fill="#6366f1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Breakdown + Top Clubs */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Pie chart */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-sm font-bold text-gray-900 mb-1">Event Category Breakdown</h3>
          <p className="text-xs text-gray-400 mb-5">Distribution of events by category</p>
          <div className="flex items-center justify-between gap-4">
            <ResponsiveContainer width="55%" height={180}>
              <PieChart>
                <Pie data={CATEGORY_BREAKDOWN} cx="50%" cy="50%" innerRadius={48} outerRadius={72} paddingAngle={3} dataKey="value">
                  {CATEGORY_BREAKDOWN.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => `${v}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2">
              {CATEGORY_BREAKDOWN.map((c) => (
                <div key={c.name} className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-gray-600 font-medium">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: c.color }} />
                    {c.name}
                  </span>
                  <span className="font-bold text-gray-800">{c.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top clubs table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-sm font-bold text-gray-900 mb-1">Top Clubs by Activity</h3>
          <p className="text-xs text-gray-400 mb-5">Ranked by total student registrations</p>
          <div className="space-y-3">
            {TOP_CLUBS.map((club, idx) => (
              <div key={club.name} className="flex items-center gap-3">
                <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0 ${
                  idx === 0 ? "bg-amber-400 text-white" :
                  idx === 1 ? "bg-gray-300 text-white" :
                  idx === 2 ? "bg-orange-400 text-white" :
                  "bg-gray-100 text-gray-500"
                }`}>{idx + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-900 truncate">{club.name}</p>
                  <p className="text-xs text-gray-400">{club.events} events</p>
                </div>
                <span className="text-sm font-bold text-gray-900 flex-shrink-0">
                  {club.registrations.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminAnalytics;
