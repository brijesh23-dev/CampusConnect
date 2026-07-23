import { Link } from "react-router-dom";
import { MdEdit, MdDelete, MdPeople, MdCalendarToday, MdLocationOn } from "react-icons/md";

function EventTable({ events = [], onDelete }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Event Details</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Category</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Date & Venue</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Registrations</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {events.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-12 text-center text-gray-400 text-sm">
                  No events found. Start by creating one!
                </td>
              </tr>
            ) : (
              events.map((event) => (
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
                        <p className="text-sm font-bold text-gray-900 truncate max-w-[200px]">
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
                        <MdCalendarToday className="text-sm text-gray-400" />
                        {new Date(event?.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </p>
                      <p className="flex items-center gap-1">
                        <MdLocationOn className="text-sm text-gray-400" />
                        <span className="truncate max-w-[150px]">{event?.venue}</span>
                      </p>
                    </div>
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
                        to={`/participants/${event?._id}`}
                        className="px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-100 transition"
                      >
                        Participants
                      </Link>
                      <Link
                        to={`/club/edit-event/${event?._id}`}
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
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EventTable;
