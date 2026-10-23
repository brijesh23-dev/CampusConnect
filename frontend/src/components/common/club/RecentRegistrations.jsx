import { MdPerson, MdCalendarToday } from "react-icons/md";
import { formatDistanceToNow } from "../../../utilities/dateUtils";

function RecentRegistrations({ registrations = [] }) {
  return (
    <section className="flex h-full min-h-[380px] flex-col overflow-hidden rounded-2xl bg-white shadow-sm dark:bg-slate-900">
      <div className="px-5 py-5 sm:px-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Recent registrations
        </h2>
        <p className="mt-1 text-xs text-gray-600 dark:text-slate-300">
          Latest attendee sign-ups
        </p>
      </div>

      <div className="flex-1 overflow-y-auto">
        {registrations.length === 0 ? (
          <div className="flex min-h-[240px] flex-col items-center justify-center px-6 text-center">
            <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
              <MdPerson className="text-xl" aria-hidden="true" />
            </span>
            <p className="text-sm font-medium text-gray-700 dark:text-slate-200">
              No registrations yet
            </p>
            <p className="mt-1 text-xs leading-5 text-gray-600 dark:text-slate-400">
              Student sign-ups will show here.
            </p>
          </div>
        ) : (
          <ul className="px-4 pb-3">
            {registrations.map((reg) => (
              <li
                key={reg._id}
                className="flex items-start gap-3 rounded-xl px-2 py-3"
              >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-700 dark:bg-blue-400/10 dark:text-blue-200">
                {reg.student?.name?.[0]?.toUpperCase() || <MdPerson />}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold leading-snug text-gray-900 dark:text-white">
                  {reg.student?.name || "Student"}
                </p>
                <p className="mt-0.5 truncate text-xs text-gray-600 dark:text-slate-300">
                  Registered for{" "}
                  <span className="font-medium text-gray-800 dark:text-slate-100">
                    {reg.event?.title || "Event"}
                  </span>
                </p>
                <span className="mt-1 flex items-center gap-1 text-[11px] text-gray-500 dark:text-slate-400">
                  <MdCalendarToday className="text-xs" />
                  {reg.createdAt
                    ? formatDistanceToNow(new Date(reg.createdAt))
                    : "Just now"}
                </span>
              </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default RecentRegistrations;
