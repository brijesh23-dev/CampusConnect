import { Link } from "react-router-dom";
import {
  MdEdit,
  MdDelete,
  MdPeople,
  MdCalendarToday,
  MdEventAvailable,
  MdLocationOn,
  MdExpandMore,
} from "react-icons/md";

// Status metadata
const STATUS_META = {
  published: { label: "Published", bg: "bg-emerald-50 dark:bg-emerald-400/10", text: "text-emerald-700 dark:text-emerald-300", dot: "bg-emerald-500" },
  draft: { label: "Draft", bg: "bg-amber-50 dark:bg-amber-400/10", text: "text-amber-700 dark:text-amber-300", dot: "bg-amber-400" },
  cancelled: { label: "Cancelled", bg: "bg-red-50 dark:bg-red-400/10", text: "text-red-600 dark:text-red-300", dot: "bg-red-500" },
  // legacy values from DB
  approved: { label: "Published", bg: "bg-emerald-50 dark:bg-emerald-400/10", text: "text-emerald-700 dark:text-emerald-300", dot: "bg-emerald-500" },
  pending: { label: "Draft", bg: "bg-amber-50 dark:bg-amber-400/10", text: "text-amber-700 dark:text-amber-300", dot: "bg-amber-400" },
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
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm dark:bg-slate-900">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-left">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50 dark:border-slate-800 dark:bg-slate-800/60">
              <th scope="col" className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-400">Event</th>
              <th scope="col" className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-400">Category</th>
              <th scope="col" className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-400">Date & Venue</th>
              <th scope="col" className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-400">Status</th>
              <th scope="col" className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-400">RSVPs</th>
              <th scope="col" className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-400">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
            {events.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-12 text-center text-sm text-gray-500 dark:text-slate-400">
                  No events found. Start by creating one!
                </td>
              </tr>
            ) : (
              events.map((event) => {
                const currentStatus = event.status || "published";
                return (
                  <tr key={event._id} className="transition-colors hover:bg-gray-50/70 dark:hover:bg-slate-800/40">
                    {/* Title & Image */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                          {event?.image ? (
                            <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-100 to-violet-100 text-blue-500 dark:from-slate-800 dark:to-slate-700 dark:text-blue-300">
                              <MdEventAvailable aria-hidden="true" className="text-lg" />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="max-w-[180px] truncate text-sm font-semibold text-gray-900 dark:text-white">
                            {event?.title}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-5 py-4">
                      <span className="inline-flex rounded-full bg-violet-50 px-2.5 py-0.5 text-xs font-semibold capitalize text-violet-700 dark:bg-violet-400/10 dark:text-violet-300">
                        {event?.category}
                      </span>
                    </td>

                    {/* Date & Venue */}
                    <td className="px-5 py-4">
                      <div className="space-y-1 text-xs text-gray-600 dark:text-slate-300">
                        <p className="flex items-center gap-1">
                          <MdCalendarToday className="shrink-0 text-sm text-gray-400 dark:text-slate-500" />
                          {new Date(event?.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                        <p className="flex items-center gap-1">
                          <MdLocationOn className="shrink-0 text-sm text-gray-400 dark:text-slate-500" />
                          <span className="truncate max-w-[130px]">{event?.venue}</span>
                        </p>
                      </div>
                    </td>

                    {/* Status — quick-change dropdown if onStatusChange prop is provided */}
                    <td className="px-5 py-4">
                      {onStatusChange ? (
                        <div className="relative inline-block">
                          <select
                            value={currentStatus}
                            onChange={(e) => onStatusChange(event._id, e.target.value)}
                            disabled={event._statusLoading}
                            className={`appearance-none rounded-lg border border-gray-200 py-1.5 pl-2.5 pr-7 text-xs font-semibold outline-none transition focus-visible:ring-2 focus-visible:ring-violet-300 dark:border-slate-700 dark:bg-slate-800 ${STATUS_META[currentStatus]?.bg || "bg-gray-50 dark:bg-slate-800"
                              } ${STATUS_META[currentStatus]?.text || "text-gray-600 dark:text-slate-300"} ${event._statusLoading ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                              }`}
                            aria-label="Change event status"
                          >
                            {STATUS_OPTIONS.map((s) => (
                              <option key={s} value={s} className="bg-white text-gray-800">
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
                    <td className="px-5 py-4 text-center">
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-400/10 dark:text-blue-300">
                        <MdPeople className="text-sm" />
                        {event.registeredStudents?.length || 0}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/clubs/participants/${event?._id}`}
                          className="rounded-lg px-3 py-1.5 text-xs font-semibold text-gray-600 transition hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:text-slate-300 dark:hover:bg-slate-800"
                        >
                          Participants
                        </Link>
                        <Link
                          to={`/clubs/edit-event/${event?._id}`}
                          className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-blue-300"
                          title="Edit Event"
                          aria-label={`Edit ${event?.title || "event"}`}
                        >
                          <MdEdit className="text-base" />
                        </Link>
                        {onDelete && (
                          <button
                            onClick={() => onDelete(event?._id)}
                            className="rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 dark:text-slate-500 dark:hover:bg-red-950/40 dark:hover:text-red-300"
                            title="Delete Event"
                            aria-label={`Delete ${event?.title || "event"}`}
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
