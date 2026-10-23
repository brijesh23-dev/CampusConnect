import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { fetchAnalytics } from "../../redux/dashboardSlice";
import {
  MdPersonAdd,
  MdEventNote,
  MdCalendarToday,
  MdArrowForward,
  MdRefresh,
} from "react-icons/md";
import StatCard from "../../components/common/club/StatCard";
import RecentRegistrations from "../../components/common/club/RecentRegistrations";
import AnalyticsChart from "../../components/common/club/AnalyticsChart";

const statCards = (analytics) => [
  {
    id: "registrations",
    title: "Total Registrations",
    value: analytics?.totalRegistrations ?? 0,
    icon: <MdPersonAdd className="text-2xl" />,
    iconBg: "bg-blue-50 dark:bg-blue-400/10",
    iconColor: "text-blue-600 dark:text-blue-300",
  },
  {
    id: "events",
    title: "Total Events",
    value: analytics?.totalEvents ?? 0,
    icon: <MdEventNote className="text-2xl" />,
    iconBg: "bg-violet-50 dark:bg-violet-400/10",
    iconColor: "text-violet-600 dark:text-violet-300",
  },
  {
    id: "upcoming",
    title: "Upcoming Events",
    value: analytics?.upcomingEvents ?? 0,
    icon: <MdCalendarToday className="text-2xl" />,
    iconBg: "bg-emerald-50 dark:bg-emerald-400/10",
    iconColor: "text-emerald-700 dark:text-emerald-300",
  },
];

function ClubDashboard() {
  const { user } = useSelector((state) => state.auth);
  const { analytics, loading, error } = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();

  const loadAnalytics = useCallback(
    () => dispatch(fetchAnalytics()),
    [dispatch],
  );

  useEffect(() => {
    loadAnalytics();
  }, [loadAnalytics]);

  const stats = statCards(analytics);

  if (loading) {
    return (
      <div
        className="flex h-64 items-center justify-center"
        role="status"
        aria-label="Loading club analytics"
      >
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent dark:border-blue-400 dark:border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-full bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl space-y-7">
        <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-medium text-blue-700 dark:text-blue-300">
              Welcome, {user?.name || "Club manager"}
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Club overview
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-slate-300">
              Track your events and attendee activity in one place.
            </p>
          </div>
          <Link
            to="/clubs/create-event"
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500"
          >
            Create Event
          </Link>
        </header>

        {error && (
          <div
            role="alert"
            className="flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-200 sm:flex-row sm:items-center sm:justify-between"
          >
            <p>{error}</p>
            <button
              type="button"
              onClick={loadAnalytics}
              disabled={loading}
              className="inline-flex min-h-9 items-center justify-center gap-2 self-start rounded-lg px-3 font-semibold text-red-800 transition hover:bg-red-100 disabled:cursor-wait disabled:opacity-60 dark:text-red-200 dark:hover:bg-red-900/40 sm:self-auto"
            >
              <MdRefresh
                className={loading ? "animate-spin" : ""}
                aria-hidden="true"
              />
              Try again
            </button>
          </div>
        )}

        <section
          aria-label="Club statistics"
          className="grid grid-cols-1 gap-4 sm:grid-cols-3"
        >
          {stats.map((stat) => (
            <StatCard
              key={stat.id}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              iconBg={stat.iconBg}
              iconColor={stat.iconColor}
            />
          ))}
        </section>

        <section
          aria-label="Event activity"
          className="grid grid-cols-1 gap-5 lg:grid-cols-3"
        >
          <div className="lg:col-span-2">
            <AnalyticsChart eventStats={analytics?.eventStats || []} />
          </div>
          <div>
            <RecentRegistrations
              registrations={analytics?.recentRegistrations || []}
            />
          </div>
        </section>

        <div className="flex justify-end pb-2">
          <Link
            to="/clubs/events"
            className="group inline-flex min-h-10 items-center gap-2 rounded-lg px-3 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:text-blue-300 dark:hover:bg-blue-400/10"
          >
            Manage events
            <MdArrowForward
              className="transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ClubDashboard;
