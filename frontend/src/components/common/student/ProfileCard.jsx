import { Link } from "react-router-dom";
import { MdEdit, MdEmail, MdPerson, MdFavoriteBorder } from "react-icons/md";
import { Card } from "@/components/ui/card";

function ProfileCard({ user }) {
  const name = user?.name?.trim() || "Student";
  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
  const interests = user?.interests || [];

  return (
    <Card className="gap-0 p-5 text-left">
      <div className="flex min-w-0 items-center gap-4">
        <div
          aria-hidden="true"
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white"
        >
          {initials}
        </div>
        <div className="min-w-0">
          <h3 className="break-words text-base font-semibold leading-snug text-gray-900 dark:text-white">
            {name}
          </h3>
          <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-gray-500 dark:text-slate-400">
            <MdPerson aria-hidden="true" />
            Student
          </span>
        </div>
      </div>

      {user?.email && (
        <div className="mt-5 flex min-w-0 items-center gap-2.5 border-t border-gray-100 pt-4 text-sm text-gray-600 dark:border-slate-700 dark:text-slate-300">
          <MdEmail aria-hidden="true" className="shrink-0 text-base text-gray-400 dark:text-slate-400" />
          <span className="truncate" title={user.email}>{user.email}</span>
        </div>
      )}

      <div className="mt-5 border-t border-gray-100 pt-4 dark:border-slate-700">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h4 className="inline-flex items-center gap-2 text-sm font-semibold text-gray-800 dark:text-slate-100">
            <MdFavoriteBorder aria-hidden="true" className="text-base text-blue-600 dark:text-blue-300" />
            Interests
            <span className="text-xs font-medium text-gray-400 dark:text-slate-400">
              {interests.length}
            </span>
          </h4>
          <Link
            to="/student/interests"
            className="inline-flex shrink-0 items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold text-blue-700 transition hover:bg-blue-50 hover:text-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:text-blue-300 dark:hover:bg-blue-950/40 dark:hover:text-blue-200"
          >
            <MdEdit aria-hidden="true" />
            Edit
          </Link>
        </div>

        {interests.length === 0 ? (
          <p className="text-sm leading-5 text-gray-500 dark:text-slate-400">
            Choose interests to personalize your event recommendations.
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {interests.map((item) => (
              <span
                key={item}
                className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-medium capitalize text-blue-800 dark:bg-blue-950/40 dark:text-blue-200"
              >
                {item}
              </span>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}

export default ProfileCard;
