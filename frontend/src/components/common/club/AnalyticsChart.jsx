import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { MdInsights } from "react-icons/md";
import { useTheme } from "../../../contexts/ThemeContext";

function AnalyticsChart({ eventStats = [] }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const chartData = eventStats.map((stat) => ({
    name: stat._id?.title || "Unknown",
    registrations: stat.registrations || 0,
  }));
  const axisColor = isDark ? "#94a3b8" : "#737b8c";
  const gridColor = isDark ? "#303747" : "#e9edf4";

  return (
    <section className="flex h-[380px] flex-col rounded-2xl bg-white p-5 shadow-sm dark:bg-slate-900 sm:p-6">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Registration analytics
        </h2>
        <p className="mt-1 text-xs text-gray-600 dark:text-slate-300">
          Registrations by event
        </p>
      </div>

      <div className="w-full flex-1 text-xs">
        {chartData.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <MdInsights
              className="mb-3 text-4xl text-slate-400 dark:text-slate-500"
              aria-hidden="true"
            />
            <p className="text-sm font-medium text-gray-700 dark:text-slate-200">
              No registrations yet
            </p>
            <p className="mt-1 max-w-xs text-xs leading-5 text-gray-600 dark:text-slate-400">
              Registration activity will appear here when students sign up for
              your events.
            </p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id="clubRegistrationFill"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#4f46e5"
                    stopOpacity={isDark ? 0.35 : 0.2}
                  />
                  <stop offset="100%" stopColor="#4f46e5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke={gridColor} />
              <XAxis
                dataKey="name"
                stroke={axisColor}
                tick={{ fill: axisColor, fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                dy={10}
                tickFormatter={(name) =>
                  name.length > 14 ? `${name.slice(0, 12)}…` : name
                }
                interval="preserveStartEnd"
              />
              <YAxis
                stroke={axisColor}
                tick={{ fill: axisColor, fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                dx={-5}
                allowDecimals={false}
              />
              <Tooltip
                cursor={{
                  stroke: isDark ? "#64748b" : "#a5b4fc",
                  strokeWidth: 1,
                }}
                contentStyle={{
                  backgroundColor: isDark ? "#1e293b" : "#ffffff",
                  border: `1px solid ${isDark ? "#334155" : "#e2e8f0"}`,
                  borderRadius: "10px",
                  color: isDark ? "#f1f5f9" : "#1e293b",
                  boxShadow: "0 8px 20px -8px rgba(15, 23, 42, 0.25)",
                }}
              />
              <Area
                type="monotone"
                dataKey="registrations"
                name="Registrations"
                stroke="#4f46e5"
                strokeWidth={2.5}
                activeDot={{
                  r: 4,
                  strokeWidth: 2,
                  stroke: isDark ? "#1e293b" : "#ffffff",
                }}
                fillOpacity={1}
                fill="url(#clubRegistrationFill)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </section>
  );
}

export default AnalyticsChart;
