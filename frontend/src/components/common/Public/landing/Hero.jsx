import { Link } from "react-router-dom";
import { MdArrowForward, MdCheck } from "react-icons/md";

const highlights = ["Campus events", "Club communities", "Student-only updates"];

function Hero() {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.12),transparent_30%)]" />

      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:py-24">
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 backdrop-blur-sm shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              500+ events this week on campus
            </div>

            <h1 className="max-w-xl text-4xl font-black tracking-[-0.06em] text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
              Your campus life,
              <span className="block bg-gradient-to-r from-blue-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent">
                organized beautifully.
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
              Discover the right events, follow the clubs you care about, and stay connected to everything happening around you.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/events"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-200 transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                Explore events
                <MdArrowForward className="text-base" />
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
              >
                Start a club
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {highlights.map((item) => (
                <div key={item} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                  <MdCheck className="text-blue-600" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-6 top-10 h-32 w-32 rounded-full bg-blue-200/60 blur-3xl" />
            <div className="absolute -right-8 bottom-0 h-32 w-32 rounded-full bg-violet-200/60 blur-3xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-3 shadow-[0_35px_80px_rgba(15,23,42,0.12)] dark:border-slate-700 dark:bg-slate-900">
              <img
                src="https://images.pexels.com/photos/38269597/pexels-photo-38269597.jpeg"
                alt="Students at a campus event"
                className="h-[540px] w-full rounded-[1.5rem] object-cover"
              />

              <div className="absolute left-8 right-8 top-8 flex items-center justify-between rounded-2xl border border-white/40 bg-white/75 px-4 py-3 shadow-lg backdrop-blur-md">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">This week</p>
                  <p className="mt-1 text-sm font-bold text-slate-900">Campus Week</p>
                </div>
                <div className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                  Live
                </div>
              </div>

              <div className="absolute bottom-8 left-8 right-8 rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-xl backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/95">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">Featured event</p>
                    <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white">Tech Symposium</p>
                  </div>
                  <div className="rounded-xl bg-slate-900 px-3 py-2 text-xs font-semibold text-white">Today 2:00 PM</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;