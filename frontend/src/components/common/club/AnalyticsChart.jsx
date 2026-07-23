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
  const data = (eventStats || []).map((stat) => ({
    name: stat._id?.title || "Unknown",
    Registrations: stat.registrations || 0,
  }));

  // Fallback mock data if none exists
  const chartData = data.length > 0 ? data : [
    { name: "React Native Workshop", Registrations: 120 },
    { name: "Fall Mixer", Registrations: 350 },
    { name: "Spring Hackathon", Registrations: 240 },
    { name: "Design Workshop", Registrations: 180 },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col h-[380px]">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900">Registration Analytics</h3>
        <p className="text-xs text-gray-400 mt-0.5">Attendee registrations per event hosted by your club</p>
      </div>

      <div className="flex-1 w-full text-xs">
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
      </div>
    </div>
  );
}

export default AnalyticsChart;
