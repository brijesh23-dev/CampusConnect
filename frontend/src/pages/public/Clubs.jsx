import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllClubs } from "../../redux/clubSlice";
import {
  MdSearch,
  MdGroups,
  MdArrowForward,
  MdExplore,
  MdEventAvailable,
} from "react-icons/md";


const CATEGORIES = ["All", "Technology", "Arts", "Music", "Business", "Sports"];

function Clubs() {
  const dispatch = useDispatch();
  const { clubs, loading } = useSelector((state) => state.clubs);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    dispatch(fetchAllClubs());
  }, [dispatch]);

  // Always use real API data; show empty state if no clubs yet
  const filtered = useMemo(() => {
    return (clubs || []).filter((club) => {
      const name = club.name || "";
      const desc = club.description || "";
      const matchesSearch =
        name.toLowerCase().includes(search.toLowerCase()) ||
        desc.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        activeCategory === "All" || club.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [clubs, search, activeCategory]);

  return (
    <div className="min-h-screen bg-white">
      {/* Page Hero */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-widest mb-5">
            <MdGroups className="text-base" />
            Campus Clubs Directory
          </div>
          <h1 className="text-4xl sm:text-5xl font-black mb-4 leading-tight">
            Find Your{" "}
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              Community
            </span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-8">
            Discover clubs that match your passions, attend their events, and connect with like-minded students.
          </p>

          {/* Search */}
          <div className="max-w-xl mx-auto relative">
            <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
            <input
              type="text"
              placeholder="Search clubs by name or description…"
              value={search}
              onChange={(e) => { setSearch(e.target.value); }}
              className="w-full pl-11 pr-5 py-3.5 rounded-2xl bg-white/10 backdrop-blur border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition"
            />
          </div>
        </div>
      </div>

      {/* Category tabs */}
      <div className="border-b border-gray-100 bg-white sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 flex gap-1 overflow-x-auto py-3 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeCategory === cat
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Club grid */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <MdExplore className="text-3xl text-gray-300" />
            </div>
            <p className="text-gray-500 font-medium mb-2">No clubs found</p>
            <button
              onClick={() => { setSearch(""); setActiveCategory("All"); }}
              className="text-sm text-blue-600 font-semibold hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-400 font-medium mb-6">
              Showing <span className="text-gray-900 font-bold">{filtered.length}</span> club{filtered.length !== 1 ? "s" : ""}
              {activeCategory !== "All" && ` in ${activeCategory}`}
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((club) => (
                <article
                  key={club._id}
                  className="group flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-5 transition-colors hover:border-blue-300 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-blue-500/60"
                >
                  <div className="flex flex-1 flex-col">
                    <div className="mb-4 flex items-start gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-lg font-bold text-blue-700 dark:bg-blue-950/50 dark:text-blue-200">
                        {club.avatar || club.name?.trim()?.[0]?.toUpperCase() || (
                          <MdGroups aria-hidden="true" className="text-xl" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="line-clamp-2 min-h-10 break-words text-sm font-semibold leading-5 text-gray-900 dark:text-white">
                          {club.name}
                        </h3>
                      </div>
                    </div>

                    <span className="mb-2 w-fit rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 dark:bg-slate-800 dark:text-slate-300">
                      {club.category || "Campus club"}
                    </span>

                    <p className="mb-5 line-clamp-3 min-h-[3.75rem] text-sm leading-5 text-gray-600 dark:text-slate-300">
                      {club.description || "This club hasn’t added a description yet."}
                    </p>

                    <div className="mb-4 mt-auto flex items-center gap-5 border-t border-gray-100 pt-3 text-xs text-gray-500 dark:border-slate-700 dark:text-slate-400">
                      <span className="inline-flex items-center gap-1.5">
                        <MdEventAvailable aria-hidden="true" className="text-base text-gray-400 dark:text-slate-400" />
                        {club.eventsCount ?? club.events?.length ?? 0} events
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <MdGroups aria-hidden="true" className="text-base text-gray-400 dark:text-slate-400" />
                        {club.membersCount ?? club.members?.length ?? 0} members
                      </span>
                    </div>

                    <Link
                      to={`/clubs-directory/${club._id}`}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-700 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500"
                    >
                      View club <MdArrowForward aria-hidden="true" className="text-base transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Clubs;
