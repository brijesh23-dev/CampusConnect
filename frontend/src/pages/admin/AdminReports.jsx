import { useState } from "react";
import {
  MdDownload,
  MdBarChart,
  MdPeople,
  MdEvent,
  MdGroups,
  MdCalendarToday,
  MdCheckCircle,
} from "react-icons/md";

const REPORTS = [
  {
    id: "monthly-registrations",
    title: "Monthly Registrations Report",
    description: "Complete breakdown of student event registrations grouped by month, category, and club.",
    icon: <MdBarChart className="text-xl" />,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    lastGenerated: "Jul 30, 2026",
    format: "CSV",
  },
  {
    id: "top-events",
    title: "Top Events Report",
    description: "Ranking of highest-attended events this semester with registration counts and engagement metrics.",
    icon: <MdEvent className="text-xl" />,
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
    lastGenerated: "Jul 28, 2026",
    format: "CSV",
  },
  {
    id: "club-activity",
    title: "Club Activity Report",
    description: "Per-club summary of events hosted, total registrations received, and member growth over time.",
    icon: <MdGroups className="text-xl" />,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    lastGenerated: "Jul 25, 2026",
    format: "CSV",
  },
  {
    id: "user-growth",
    title: "User Growth Report",
    description: "New student and club registrations over time, segmented by role and registration source.",
    icon: <MdPeople className="text-xl" />,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    lastGenerated: "Jul 20, 2026",
    format: "CSV",
  },
  {
    id: "event-calendar",
    title: "Upcoming Events Calendar",
    description: "Full calendar export of all approved events with date, time, venue, and organizer details.",
    icon: <MdCalendarToday className="text-xl" />,
    iconBg: "bg-pink-100",
    iconColor: "text-pink-600",
    lastGenerated: "Jul 31, 2026",
    format: "ICS",
  },
];

const SUMMARY_STATS = [
  { label: "Reports Generated", value: "148", sub: "This semester" },
  { label: "Last Export", value: "Today", sub: "Jul 31, 2026" },
  { label: "Active Exports", value: "3", sub: "CSV format" },
  { label: "Data Coverage", value: "100%", sub: "All modules" },
];

function AdminReports() {
  const [downloading, setDownloading] = useState(null);
  const [downloaded, setDownloaded] = useState([]);
  const [dateRange, setDateRange] = useState("this-semester");

  const handleDownload = (id) => {
    setDownloading(id);
    setTimeout(() => {
      setDownloading(null);
      setDownloaded((prev) => [...prev, id]);
      setTimeout(() => setDownloaded((prev) => prev.filter((d) => d !== id)), 3000);
    }, 1200);
  };

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Reports</h1>
          <p className="text-sm text-gray-400 mt-1">
            Generate and download platform reports in CSV or ICS format.
          </p>
        </div>

        {/* Date range filter */}
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="border border-gray-200 bg-white rounded-xl px-4 py-2 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500 transition"
        >
          <option value="this-week">This Week</option>
          <option value="this-month">This Month</option>
          <option value="this-semester">This Semester</option>
          <option value="all-time">All Time</option>
        </select>
      </div>

      {/* Summary tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {SUMMARY_STATS.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center">
            <p className="text-2xl font-extrabold text-gray-900">{s.value}</p>
            <p className="text-xs font-bold text-gray-500 mt-1">{s.label}</p>
            <p className="text-xs text-gray-400 mt-0.5">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Report cards */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Available Reports</h2>

        {REPORTS.map((report) => {
          const isDownloading = downloading === report.id;
          const isDone = downloaded.includes(report.id);

          return (
            <div
              key={report.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-all"
            >
              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl ${report.iconBg} ${report.iconColor} flex items-center justify-center flex-shrink-0`}>
                {report.icon}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-1">
                  <h3 className="text-sm font-bold text-gray-900">{report.title}</h3>
                  <span className="flex-shrink-0 px-2 py-0.5 rounded-md bg-gray-100 text-gray-500 text-xs font-bold">
                    {report.format}
                  </span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed mb-2">{report.description}</p>
                <p className="text-xs text-gray-400">
                  Last generated: <span className="font-semibold text-gray-600">{report.lastGenerated}</span>
                </p>
              </div>

              {/* Download button */}
              <button
                onClick={() => handleDownload(report.id)}
                disabled={isDownloading || isDone}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                  isDone
                    ? "bg-emerald-500 text-white"
                    : "bg-slate-900 hover:bg-slate-700 text-white"
                } disabled:opacity-60`}
              >
                {isDownloading ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Generating…
                  </>
                ) : isDone ? (
                  <><MdCheckCircle className="text-sm" /> Downloaded</>
                ) : (
                  <><MdDownload className="text-sm" /> Download</>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Footer note */}
      <p className="text-xs text-gray-400 text-center pb-4">
        Reports are generated from live platform data for the selected date range.
        Large exports may take a few seconds.
      </p>
    </div>
  );
}

export default AdminReports;
