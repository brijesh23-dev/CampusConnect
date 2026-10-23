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
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200/80 bg-white transition-colors duration-200 hover:border-gray-300 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-600">
      <div className="flex-1 p-5">
        {/* Header */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex max-w-full items-center gap-1.5 rounded-full bg-violet-50 px-2.5 py-1 text-xs font-semibold capitalize text-violet-700 dark:bg-violet-950/40 dark:text-violet-300">
            <MdCategory aria-hidden="true" className="shrink-0 text-sm" />
            {event.category || "General"}
          </span>
          <span
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
              isPast
                ? "bg-gray-100 text-gray-600 dark:bg-slate-800 dark:text-slate-300"
                : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                isPast ? "bg-gray-400" : "bg-emerald-500"
              }`}
            />
            {isPast ? "Past" : "Confirmed"}
          </span>
        </div>

        <h3 className="mb-4 line-clamp-2 text-base font-bold leading-snug text-gray-900 dark:text-white">
          {event.title || "Untitled Event"}
        </h3>

        <div className="space-y-2 text-xs text-gray-600 dark:text-slate-300">
          <div className="flex items-center gap-2">
            <MdCalendarToday aria-hidden="true" className="shrink-0 text-base text-gray-400 dark:text-slate-400" />
            <span className="min-w-0">
              {dateStr}
              {event.time && <span className="text-gray-500 dark:text-slate-400"> · {event.time}</span>}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MdLocationOn aria-hidden="true" className="shrink-0 text-base text-gray-400 dark:text-slate-400" />
            <span className="min-w-0 truncate">{event.venue || "TBA"}</span>
          </div>
        </div>
      </div>

      {/* Footer actions */}
      <div className="mt-auto flex flex-wrap gap-2 border-t border-gray-100 bg-gray-50/70 px-5 py-3 dark:border-slate-700 dark:bg-slate-800/60">
        <Link
          to={`/events/${event._id}`}
          className="flex-1 rounded-lg bg-white px-3 py-2 text-center text-xs font-semibold text-gray-700 transition hover:bg-gray-100 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-700"
        >
          View Details
        </Link>
        {onCancel && !isPast && (
          <button
            onClick={() => onCancel(registration._id)}
            disabled={cancelling}
            className={`flex shrink-0 items-center gap-1 rounded-lg px-3 py-2 text-xs font-semibold transition ${
              cancelling
                ? "cursor-not-allowed bg-red-50 text-red-300 dark:bg-red-950/30 dark:text-red-300/60"
                : "bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-950/30 dark:text-red-300 dark:hover:bg-red-950/50"
            }`}
            title="Cancel RSVP"
          >
            {cancelling ? (
              <>
                <svg className="h-3.5 w-3.5 animate-spin text-red-400" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                Cancelling…
              </>
            ) : (
              <><MdEventBusy aria-hidden="true" className="text-sm" />Cancel</>
            )}
          </button>
        )}
      </div>
    </article>
  );
}

export default RegistrationCard;
