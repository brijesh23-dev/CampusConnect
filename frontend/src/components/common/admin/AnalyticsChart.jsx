import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const COLORS = ["#6366f1", "#8b5cf6", "#a78bfa", "#7c3aed", "#4f46e5", "#818cf8", "#c4b5fd", "#ddd6fe"];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-100 shadow-lg rounded-xl px-4 py-3 text-xs">
      <p className="font-bold text-gray-700 mb-1.5 truncate max-w-[180px]">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} className="flex items-center gap-1.5" style={{ color: p.color }}>
          <span className="inline-block w-2 h-2 rounded-full flex-shrink-0" style={{ background: p.color }} />
          RSVPs:{" "}
          <span className="font-bold text-gray-800">{p.value.toLocaleString()}</span>
        </p>
      ))}
    </div>
  );
};

// Skeleton bar placeholder
function SkeletonBar({ width = "w-full" }) {
  return (
    <div className={`${width} bg-gray-100 rounded-lg animate-pulse`} style={{ height: "180px" }} />
  );
}

function AnalyticsChart({ analytics, loading }) {
  // Build chart data from live analytics.registrationsByEvent
  const chartData =
    analytics?.registrationsByEvent
      ?.map((item) => ({
        name: item._id?.title
          ? item._id.title.length > 18
            ? item._id.title.slice(0, 18) + "…"
            : item._id.title
          : "Unknown",
        fullName: item._id?.title || "Unknown",
        registrations: item.count,
      }))
      .sort((a, b) => b.registrations - a.registrations)
      .slice(0, 8) || [];

  const totalRSVPs = chartData.reduce((sum, d) => sum + d.registrations, 0);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-sm font-bold text-gray-900">Top Events by RSVPs</h3>
        {!loading && chartData.length > 0 && (
          <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
            {totalRSVPs.toLocaleString()} total RSVPs
          </span>
        )}
      </div>
      <p className="text-xs text-gray-400 mb-5">Registration volume per event (live)</p>

      {loading ? (
        <div className="flex items-end gap-2 h-[220px] pt-4">
          {[60, 85, 45, 100, 70, 55, 90, 40].map((h, i) => (
            <div
              key={i}
              className="flex-1 bg-gray-100 rounded-t-lg animate-pulse"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      ) : chartData.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[220px] text-gray-300">
          <svg className="w-12 h-12 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <p className="text-xs font-medium text-gray-400">No registration data yet</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 10, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="registrations" name="RSVPs" radius={[4, 4, 0, 0]}>
              {chartData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default AnalyticsChart;
