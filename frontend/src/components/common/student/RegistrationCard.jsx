import { Link } from "react-router-dom";
import { MdCalendarToday, MdLocationOn, MdCategory, MdEventBusy } from "react-icons/md";

function RegistrationCard({ registration, onCancel, cancelling }) {
  const event = registration?.event || {};
  const dateStr = event.date
    ? new Date(event.date).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "TBA";

  // Determine if event is upcoming or past
  const isPast = event.date ? new Date(event.date) < new Date() : false;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden">
      {/* Category bar */}
      <div className="h-1.5 bg-gradient-to-r from-violet-500 to-blue-500 w-full" />

      <div className="p-5 flex-1">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-violet-50 text-violet-700 text-xs font-semibold uppercase tracking-wide flex-shrink-0">
            <MdCategory className="text-xs" />
            {event.category || "General"}
          </span>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold flex-shrink-0 ${
              isPast
                ? "bg-gray-100 text-gray-500"
                : "bg-green-50 text-green-600"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isPast ? "bg-gray-400" : "bg-green-500"
              }`}
            />
            {isPast ? "Past" : "Confirmed"}
          </span>
        </div>

        <h3 className="text-base font-bold text-gray-900 leading-snug mb-3 line-clamp-2">
          {event.title || "Untitled Event"}
        </h3>

        <div className="space-y-1.5 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <MdCalendarToday className="text-sm text-gray-400 flex-shrink-0" />
            <span>
              {dateStr}
              {event.time && <span className="text-gray-400"> · {event.time}</span>}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MdLocationOn className="text-sm text-gray-400 flex-shrink-0" />
            <span className="truncate">{event.venue || "TBA"}</span>
          </div>
        </div>
      </div>

      {/* Footer actions */}
      <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex gap-2">
        <Link
          to={`/events/${event._id}`}
          className="flex-1 text-center py-2 rounded-xl bg-white border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-100 transition"
        >
          View Details
        </Link>
        {onCancel && !isPast && (
          <button
            onClick={() => onCancel(registration._id)}
            disabled={cancelling}
            className={`flex items-center gap-1 px-3 py-2 rounded-xl border text-xs font-semibold transition flex-shrink-0 ${
              cancelling
                ? "border-red-100 text-red-300 bg-red-50 cursor-not-allowed"
                : "border-red-200 text-red-500 hover:bg-red-50"
            }`}
            title="Cancel RSVP"
          >
            {cancelling ? (
              <>
                <svg className="animate-spin w-3.5 h-3.5 text-red-400" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                Cancelling…
              </>
            ) : (
              <><MdEventBusy className="text-sm" />Cancel</>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default RegistrationCard;
