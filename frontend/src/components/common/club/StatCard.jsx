import { MdArrowUpward, MdArrowDownward } from "react-icons/md";

function StatCard({ title, value, change, positive, icon, iconBg, iconColor }) {
  return (
    <article className="group rounded-2xl bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md dark:bg-slate-900 sm:p-6">
      <div className="mb-5 flex items-center justify-between">
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconBg || "bg-violet-50 dark:bg-violet-400/10"} ${iconColor || "text-violet-600 dark:text-violet-300"} transition-transform duration-200 group-hover:scale-105`}>
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
      <p className="mb-1 text-sm font-medium text-gray-600 dark:text-slate-300">{title}</p>
      <p className="text-3xl font-bold tabular-nums tracking-tight text-gray-900 dark:text-white">
        {typeof value === "number" ? value.toLocaleString() : value}
      </p>
    </article>
  );
}

export default StatCard;
