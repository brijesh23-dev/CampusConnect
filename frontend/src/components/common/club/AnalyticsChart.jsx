import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function AnalyticsChart({ eventStats = [] }) {
  // Map analytics event stats to chart data
  const chartData = (eventStats || []).map((stat) => ({
    name: stat._id?.title || "Unknown",
    Registrations: stat.registrations || 0,
  }));

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col h-[380px]">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900">Registration Analytics</h3>
        <p className="text-xs text-gray-400 mt-0.5">Attendee registrations per event hosted by your club</p>
      </div>

      <div className="flex-1 w-full text-xs">
        {chartData.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-300">
            <svg className="w-12 h-12 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <p className="text-xs font-medium text-gray-400">No registration data yet</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorRegistrations" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis
                dataKey="name"
                stroke="#9ca3af"
                tickLine={false}
                axisLine={false}
                dy={10}
              />
              <YAxis
                stroke="#9ca3af"
                tickLine={false}
                axisLine={false}
                dx={-5}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #f3f4f6",
                  borderRadius: "12px",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05)",
                }}
              />
              <Area
                type="monotone"
                dataKey="Registrations"
                stroke="#8b5cf6"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorRegistrations)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

export default AnalyticsChart;
