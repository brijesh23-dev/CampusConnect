import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminStats, fetchPlatformAnalytics } from "../../redux/adminSlice";
import {
  MdDownload,
  MdPeople,
  MdEvent,
  MdGroups,
  MdCalendarToday,
  MdCheckCircle,
} from "react-icons/md";


// Report definitions (static metadata; data pulled dynamically on download)
const REPORTS = [
  {
    id: "top-events",
    title: "Top Events Report",
    description: "Ranking of highest-attended events this semester with registration counts and engagement metrics.",
    icon: <MdEvent className="text-xl" />,
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
    format: "CSV",
  },
  {
    id: "club-activity",
    title: "Club Activity Report",
    description: "Per-club summary of events hosted, total registrations received, and member growth over time.",
    icon: <MdGroups className="text-xl" />,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    format: "CSV",
  },
  {
    id: "user-growth",
    title: "User Growth Report",
    description: "New student and club registrations over time, segmented by role.",
    icon: <MdPeople className="text-xl" />,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    format: "CSV",
  },
  {
    id: "event-calendar",
    title: "Platform Statistics",
    description: "Full snapshot of platform totals: users, clubs, events, and RSVPs.",
    icon: <MdCalendarToday className="text-xl" />,
    iconBg: "bg-pink-100",
    iconColor: "text-pink-600",
    format: "CSV",
  },
];

function AdminReports() {
  const dispatch = useDispatch();
  const { stats, analytics, loading } = useSelector((state) => state.admin);
  const [downloading, setDownloading] = useState(null);
  const [downloaded, setDownloaded] = useState([]);
  const [dateRange, setDateRange] = useState("this-semester");

  useEffect(() => {
    dispatch(fetchAdminStats());
    dispatch(fetchPlatformAnalytics());
  }, [dispatch]);

  // Build summary tiles from real API data
  const summaryTiles = [
    {
      label: "Total Events",
      value: loading ? "…" : (stats?.totalEvents ?? "—"),
      sub: "All platform events",
    },
    {
      label: "Total RSVPs",
      value: loading ? "…" : (stats?.totalRegistrations ?? "—"),
      sub: "Student registrations",
    },
    {
      label: "Active Clubs",
      value: loading ? "…" : (stats?.totalClubs ?? "—"),
      sub: "Club accounts",
    },
    {
      label: "Total Students",
      value: loading ? "…" : (stats?.totalStudents ?? "—"),
      sub: "Student accounts",
    },
  ];

  // Generate and download a CSV from live analytics data
  const generateCSV = (id) => {
    let rows = [];
    const now = new Date().toLocaleDateString("en-US");

    if (id === "top-events") {
      rows = [["Event Title", "Category", "RSVPs"]];
      (analytics?.registrationsByEvent || []).forEach((item) => {
        rows.push([item._id?.title || "Unknown", item._id?.category || "", item.count]);
      });
    } else if (id === "club-activity") {
      rows = [["Club Name", "RSVPs"]];
      (analytics?.topClubs || []).forEach((c) => {
        rows.push([c._id?.name || "Unknown", c.registrations]);
      });
    } else if (id === "user-growth") {
      rows = [["Role", "Count"]];
      rows.push(["Students", stats?.totalStudents ?? 0]);
      rows.push(["Clubs", stats?.totalClubs ?? 0]);
      rows.push(["Total Users", stats?.totalUsers ?? 0]);
    } else if (id === "event-calendar") {
      rows = [["Metric", "Value", "As of"]];
      rows.push(["Total Events", stats?.totalEvents ?? 0, now]);
      rows.push(["Total RSVPs", stats?.totalRegistrations ?? 0, now]);
      rows.push(["Active Clubs", stats?.totalClubs ?? 0, now]);
      rows.push(["Total Students", stats?.totalStudents ?? 0, now]);
    }

    const csvContent = rows.map((r) => r.map(String).join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${id}-${now.replace(/\//g, "-")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownload = (id) => {
    setDownloading(id);
    setTimeout(() => {
      generateCSV(id);
      setDownloading(null);
      setDownloaded((prev) => [...prev, id]);
      setTimeout(() => setDownloaded((prev) => prev.filter((d) => d !== id)), 3000);
    }, 800);
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

      {/* Summary tiles — real data from API */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryTiles.map((s) => (
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
