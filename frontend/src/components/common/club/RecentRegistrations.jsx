import { MdPerson, MdCalendarToday } from "react-icons/md";
import { formatDistanceToNow } from "../../../utilities/dateUtils";

function RecentRegistrations({ registrations = [] }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
      <div className="px-6 py-5 border-b border-gray-100">
        <h3 className="text-lg font-bold text-gray-900">Recent Registrations</h3>
        <p className="text-xs text-gray-400 mt-0.5">Latest sign-ups across all your events</p>
      </div>

      <div className="divide-y divide-gray-50 flex-1 overflow-y-auto max-h-[350px]">
        {registrations.length === 0 ? (
          <div className="p-8 text-center text-gray-400 text-sm">
            No registrations received yet.
          </div>
        ) : (
          registrations.map((reg) => (
            <div key={reg._id} className="flex items-start gap-3.5 px-6 py-4 hover:bg-gray-50/50 transition">
              <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 font-bold text-sm">
                {reg.student?.name?.[0]?.toUpperCase() || <MdPerson />}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-gray-900 leading-snug truncate">
                  {reg.student?.name || "Student"}
                </p>
                <p className="text-xs text-gray-500 mt-0.5 truncate">
                  Registered for: <span className="font-semibold text-gray-700">{reg.event?.title || "Event"}</span>
                </p>
                <span className="text-[10px] text-gray-400 mt-1 flex items-center gap-1">
                  <MdCalendarToday className="text-xs" />
                  {reg.createdAt ? formatDistanceToNow(new Date(reg.createdAt)) : "Just now"}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default RecentRegistrations;
