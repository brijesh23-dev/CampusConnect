import { Link } from "react-router-dom";
import {
  MdEdit,
  MdDelete,
  MdPeople,
  MdCalendarToday,
  MdLocationOn,
  MdExpandMore,
} from "react-icons/md";

// Status metadata
const STATUS_META = {
  published: { label: "Published", bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500" },
  draft: { label: "Draft", bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-400" },
  cancelled: { label: "Cancelled", bg: "bg-red-50", text: "text-red-600", dot: "bg-red-500" },
  // legacy values from DB
  approved: { label: "Published", bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500" },
  pending: { label: "Draft", bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-400" },
};

const STATUS_OPTIONS = ["published", "draft", "cancelled"];

function StatusBadge({ status }) {
  const meta = STATUS_META[status] || STATUS_META.draft;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${meta.bg} ${meta.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${meta.dot}`} />
      {meta.label}
    </span>
  );
}

function EventTable({ events = [], onDelete, onStatusChange }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Event</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Category</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Date & Venue</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">RSVPs</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {events.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-12 text-center text-gray-400 text-sm">
                  No events found. Start by creating one!
                </td>
              </tr>
            ) : (
              events.map((event) => {
                const currentStatus = event.status || "published";
                return (
                  <tr key={event._id} className="hover:bg-gray-50/50 transition">
                    {/* Title & Image */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                          {event?.image ? (
                            <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-violet-100 flex items-center justify-center text-lg">
                              🎓
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-gray-900 truncate max-w-[180px]">
                            {event?.title}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2.5 py-0.5 rounded-full bg-violet-50 text-violet-600 text-xs font-bold capitalize">
                        {event?.category}
                      </span>
                    </td>

                    {/* Date & Venue */}
                    <td className="px-6 py-4">
                      <div className="space-y-0.5 text-xs text-gray-500">
                        <p className="flex items-center gap-1">
                          <MdCalendarToday className="text-sm text-gray-400 flex-shrink-0" />
                          {new Date(event?.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                        <p className="flex items-center gap-1">
                          <MdLocationOn className="text-sm text-gray-400 flex-shrink-0" />
                          <span className="truncate max-w-[130px]">{event?.venue}</span>
                        </p>
                      </div>
                    </td>

                    {/* Status — quick-change dropdown if onStatusChange prop is provided */}
                    <td className="px-6 py-4">
                      {onStatusChange ? (
                        <div className="relative inline-block">
                          <select
                            value={currentStatus}
                            onChange={(e) => onStatusChange(event._id, e.target.value)}
                            disabled={event._statusLoading}
                            className={`appearance-none pl-2.5 pr-7 py-1.5 rounded-lg text-xs font-semibold border cursor-pointer transition outline-none focus:ring-2 focus:ring-violet-200 ${STATUS_META[currentStatus]?.bg || "bg-gray-50"
                              } ${STATUS_META[currentStatus]?.text || "text-gray-600"} border-gray-200 ${event._statusLoading ? "opacity-50 cursor-not-allowed" : ""
                              }`}
                            aria-label="Change event status"
                          >
                            {STATUS_OPTIONS.map((s) => (
                              <option key={s} value={s} className="text-gray-800 bg-white">
                                {s.charAt(0).toUpperCase() + s.slice(1)}
                              </option>
                            ))}
                          </select>
                          <MdExpandMore className="absolute right-1.5 top-1/2 -translate-y-1/2 text-sm pointer-events-none text-gray-500" />
                        </div>
                      ) : (
                        <StatusBadge status={currentStatus} />
                      )}
                    </td>

                    {/* Count */}
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold">
                        <MdPeople className="text-sm" />
                        {event.registeredStudents?.length || 0}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/clubs/participants/${event?._id}`}
                          className="px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-100 transition"
                        >
                          Participants
                        </Link>
                        <Link
                          to={`/clubs/edit-event/${event?._id}`}
                          className="p-1.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-100 hover:text-blue-600 transition"
                          title="Edit Event"
                        >
                          <MdEdit className="text-base" />
                        </Link>
                        {onDelete && (
                          <button
                            onClick={() => onDelete(event?._id)}
                            className="p-1.5 rounded-xl border border-gray-200 text-gray-400 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition"
                            title="Delete Event"
                          >
                            <MdDelete className="text-base" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EventTable;
