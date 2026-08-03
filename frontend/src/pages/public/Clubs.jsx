import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllClubs } from "../../redux/clubSlice";
import {
  MdSearch,
  MdGroups,
  MdEvent,
  MdArrowForward,
  MdExplore,
} from "react-icons/md";

// Fallback mock data shown while API is connected
const MOCK_CLUBS = [
  { _id: "c1", name: "Campus Tech Society", description: "Building the next generation of engineers and innovators through hands-on workshops, hackathons, and industry connections.", category: "Technology", eventsCount: 24, membersCount: 312, avatar: "T" },
  { _id: "c2", name: "Fine Arts Collective", description: "A vibrant creative community hosting exhibitions, life drawing sessions, and collaborative art projects throughout the year.", category: "Arts", eventsCount: 18, membersCount: 156, avatar: "A" },
  { _id: "c3", name: "Coding Club", description: "Weekly coding challenges, competitive programming sessions, and collaborative open-source projects for all skill levels.", category: "Technology", eventsCount: 31, membersCount: 248, avatar: "C" },
  { _id: "c4", name: "Music Society", description: "From classical to contemporary — we celebrate all genres. Join jam sessions, open-mic nights, and annual concerts.", category: "Music", eventsCount: 14, membersCount: 198, avatar: "M" },
  { _id: "c5", name: "Entrepreneurship Cell", description: "Connect with founders, investors, and mentors. We run pitch competitions, speaker sessions, and startup incubation programs.", category: "Business", eventsCount: 20, membersCount: 290, avatar: "E" },
  { _id: "c6", name: "Sports Federation", description: "Coordinating inter-college sports events, tournaments, and fitness bootcamps to keep campus life active and healthy.", category: "Sports", eventsCount: 38, membersCount: 420, avatar: "S" },
  { _id: "c7", name: "Photography Club", description: "Explore the art of visual storytelling. Weekly photo walks, editing workshops, and a thriving campus gallery.", category: "Arts", eventsCount: 12, membersCount: 134, avatar: "P" },
  { _id: "c8", name: "Robotics & AI Lab", description: "Designing autonomous systems, competing in national robotics competitions, and pushing the boundaries of machine intelligence.", category: "Technology", eventsCount: 16, membersCount: 112, avatar: "R" },
];

const CATEGORIES = ["All", "Technology", "Arts", "Music", "Business", "Sports"];

// Full Tailwind class strings must be written in full so Tailwind's scanner
// can detect and include them in the production CSS bundle.
const categoryGradients = {
  Technology: "bg-gradient-to-br from-blue-500 to-indigo-600",
  Arts:       "bg-gradient-to-br from-pink-500 to-rose-500",
  Music:      "bg-gradient-to-br from-violet-500 to-purple-600",
  Business:   "bg-gradient-to-br from-emerald-500 to-green-600",
  Sports:     "bg-gradient-to-br from-orange-500 to-amber-600",
  Default:    "bg-gradient-to-br from-slate-500 to-gray-600",
};

function Clubs() {
  const dispatch = useDispatch();
  const { clubs, loading } = useSelector((state) => state.clubs);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    dispatch(fetchAllClubs());
  }, [dispatch]);

  // Use real data if available, otherwise mock
  const sourceData = clubs?.length > 0 ? clubs : MOCK_CLUBS;

  const filtered = useMemo(() => {
    return sourceData.filter((club) => {
      const name = club.name || "";
      const desc = club.description || "";
      const matchesSearch =
        name.toLowerCase().includes(search.toLowerCase()) ||
        desc.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        activeCategory === "All" || club.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [sourceData, search, activeCategory]);

  const gradientClass = (cat) => categoryGradients[cat] || categoryGradients.Default;

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
                <div
                  key={club._id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col overflow-hidden group"
                >
                  {/* Club color bar */}
                  <div className={`h-2 ${gradientClass(club.category)} w-full`} />

                  <div className="p-5 flex-1 flex flex-col">
                    {/* Avatar + name */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 rounded-xl ${gradientClass(club.category)} flex items-center justify-center text-white text-lg font-black shadow-sm flex-shrink-0`}>
                        {club.avatar || club.name?.[0]?.toUpperCase() || "C"}
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm font-bold text-gray-900 leading-tight truncate">
                          {club.name}
                        </h3>
                        <span className="text-xs text-gray-400 font-medium capitalize">
                          {club.category || "Club"}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-3 flex-1 mb-4">
                      {club.description || "No description provided."}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                      <span className="flex items-center gap-1">
                        <MdEvent className="text-sm text-gray-300" />
                        {club.eventsCount ?? club.events?.length ?? 0} events
                      </span>
                      <span className="flex items-center gap-1">
                        <MdGroups className="text-sm text-gray-300" />
                        {club.membersCount ?? club.members?.length ?? 0} members
                      </span>
                    </div>

                    {/* CTA */}
                    <Link
                      to={`/clubs-directory/${club._id}`}
                      className={`flex items-center justify-center gap-1.5 w-full py-2 rounded-xl ${gradientClass(club.category)} text-white text-xs font-bold hover:opacity-90 transition group-hover:shadow-md`}
                    >
                      View Club <MdArrowForward className="text-sm" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Clubs;
