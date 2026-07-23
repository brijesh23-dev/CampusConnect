import { MdArrowUpward, MdArrowDownward } from "react-icons/md";

function StatCard({ title, value, change, positive, icon, iconBg, iconColor }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition duration-200">
      <div className="flex items-center justify-between mb-5">
        <div className={`w-12 h-12 rounded-2xl ${iconBg || "bg-violet-50"} ${iconColor || "text-violet-600"} flex items-center justify-center`}>
          {icon}
        </div>
        {change && (
          <span
            className={`text-xs font-semibold flex items-center gap-0.5 ${
              positive === true
                ? "text-green-600"
                : positive === false
                ? "text-red-500"
                : "text-gray-400"
            }`}
          >
            {positive === true && <MdArrowUpward className="text-xs" />}
            {positive === false && <MdArrowDownward className="text-xs" />}
            {change}
          </span>
        )}
      </div>
      <p className="text-gray-400 text-sm font-medium mb-1">{title}</p>
      <p className="text-3xl font-extrabold text-gray-900">
        {typeof value === "number" ? value.toLocaleString() : value}
      </p>
    </div>
  );
}

export default StatCard;
