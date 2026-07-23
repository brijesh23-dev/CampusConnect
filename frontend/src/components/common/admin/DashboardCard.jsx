function DashboardCard({ title, value, icon, iconBg, iconColor, subtitle }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition duration-200 flex items-center justify-between">
      <div>
        <p className="text-gray-400 text-sm font-medium mb-1">{title}</p>
        <p className="text-3xl font-extrabold text-gray-900">
          {typeof value === "number" ? value.toLocaleString() : value}
        </p>
        {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
      </div>
      <div className={`w-14 h-14 rounded-2xl ${iconBg || "bg-red-50"} ${iconColor || "text-red-600"} flex items-center justify-center`}>
        {icon}
      </div>
    </div>
  );
}

export default DashboardCard;
