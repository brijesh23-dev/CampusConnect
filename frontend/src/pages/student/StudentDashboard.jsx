import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchMyregistration } from "../../redux/RegistrationSlice";
import {
  MdCalendarToday,
  MdLocationOn,
  MdAccessTime,
  MdAdd,
  MdEventAvailable,
  MdFavoriteBorder,
  MdGroups,
} from "react-icons/md";
import DashboardCard from "../../components/common/student/DashboardCard";
import ProfileCard from "../../components/common/student/ProfileCard";

// Mock club data
const mockClubs = [
  { id: 1, name: "Computer Science Society", members: 128, icon: "💻" },
  { id: 2, name: "Design Collective", members: 84, icon: "🎨" },
  { id: 3, name: "Model UN", members: 45, icon: "🌍" },
];

// Mock recommended events
const forYouMock = [
  {
    id: "fy1",
    title: "Spring Tech Career Fair 2024",
    tags: ["RECOMMENDED", "CAREER"],
    date: "MAR 15",
    time: "10:00 AM - 4:00 PM",
    venue: "Student Union Grand Hall",
    status: "Open",
    featured: true,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=700&auto=format",
  },
  {
    id: "fy2",
    title: "Campus Jazz Ensemble...",
    tags: ["MUSIC"],
    date: "MAR 18",
    dateDay: "18",
    dateMonth: "MAR",
    time: "7:00 PM",
    venue: "Arts Center Theater",
    status: "Open",
    featured: false,
    image: "",
  },
];

function StudentDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { registrations } = useSelector((state) => state.registrations);

  useEffect(() => {
    dispatch(fetchMyregistration());
  }, [dispatch]);

  const interests = user?.interests || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main content columns (2/3 width on desktop) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Welcome banner */}
            <div className="bg-gradient-to-br from-blue-50 to-violet-50 rounded-3xl p-8 border border-blue-100 relative overflow-hidden">
              <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-violet-100 opacity-60 blur-3xl" />
              <div className="relative z-10">
                <h1 className="text-3xl font-bold  text-gray-900 mb-2">
                  Welcome back, {user?.name?.split(" ")[0] || "Alex"}! 
                </h1>
                <p className="text-gray-500 text-sm max-w-md">
                  You have {registrations?.length || 2} events coming up this week.
                  {interests.length > 0 &&
                    ` Events tailored to your ${interests[0]} interest are highly recommended.`}
                </p>
                {/* Interest tags */}
                {interests.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {interests.map((interest) => (
                      <span
                        key={interest}
                        className="px-3 py-1 rounded-full bg-white border border-blue-200 text-blue-700 text-xs font-semibold capitalize"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Quick stats cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <DashboardCard
                title="Registered Events"
                value={registrations?.length || 0}
                change="+2 new"
                positive={true}
                icon={<MdEventAvailable className="text-2xl" />}
                iconBg="bg-blue-50"
                iconColor="text-blue-600"
              />
              <DashboardCard
                title="Your Interests"
                value={interests.length}
                change="Active"
                positive={null}
                icon={<MdFavoriteBorder className="text-2xl" />}
                iconBg="bg-violet-50"
                iconColor="text-violet-600"
              />
              <DashboardCard
                title="Clubs Joined"
                value={mockClubs.length}
                change="Manage"
                positive={null}
                icon={<MdGroups className="text-2xl" />}
                iconBg="bg-green-50"
                iconColor="text-green-600"
              />
            </div>

            {/* For You section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">For You</h2>
                <Link
                  to="/events"
                  className="text-sm text-blue-600 font-semibold hover:underline"
                >
                  View Calendar →
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Featured card */}
                <div className="md:col-span-2 bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition group">
                  <div className="relative h-52 overflow-hidden">
                    {forYouMock[0].image ? (
                      <img
                        src={forYouMock[0].image}
                        alt={forYouMock[0].title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-400 to-violet-600" />
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                      <div className="flex gap-2 mb-2">
                        {forYouMock[0].tags.map((t) => (
                          <span key={t} className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-white uppercase tracking-wide">
                            {t}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-white font-bold text-lg leading-snug">
                        {forYouMock[0].title}
                      </h3>
                    </div>
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-white/90 rounded-full px-3 py-1 text-xs font-semibold text-green-600">
                      <span className="w-2 h-2 rounded-full bg-green-500" />
                      {forYouMock[0].status}
                    </div>
                  </div>

                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className="text-xs font-bold text-blue-600 uppercase">{forYouMock[0].date.split(" ")[0]}</p>
                        <p className="text-2xl font-extrabold text-gray-900">{forYouMock[0].date.split(" ")[1]}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <MdAccessTime className="text-base" /> {forYouMock[0].time}
                        </p>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <MdLocationOn className="text-base" /> {forYouMock[0].venue}
                        </p>
                      </div>
                    </div>
                    <button className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition shadow">
                      RSVP
                    </button>
                  </div>
                </div>

                {/* Small card */}
                <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition">
                  <div className="h-32 bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                    <span className="text-4xl">🎷</span>
                  </div>
                  <div className="p-4">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                      {forYouMock[1].tags[0]}
                    </span>
                    <h3 className="text-sm font-bold text-gray-900 mt-1 mb-3 leading-snug">
                      {forYouMock[1].title}
                    </h3>
                    <div className="space-y-1 text-xs text-gray-500">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-blue-600 flex flex-col items-center justify-center text-white">
                          <span className="text-[8px] font-bold leading-none">{forYouMock[1].dateMonth}</span>
                          <span className="text-xs font-extrabold leading-none">{forYouMock[1].dateDay}</span>
                        </div>
                        <span>{forYouMock[1].time}</span>
                      </div>
                      <p className="flex items-center gap-1">
                        <MdLocationOn className="text-sm" /> {forYouMock[1].venue}
                      </p>
                    </div>
                    {/* Attendee avatars */}
                    <div className="flex items-center gap-2 mt-3">
                      <div className="flex -space-x-2">
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className={`w-6 h-6 rounded-full border-2 border-white bg-gradient-to-br ${["from-blue-400 to-blue-600","from-violet-400 to-violet-600","from-pink-400 to-pink-600"][i]}`} />
                        ))}
                      </div>
                      <span className="text-xs text-gray-400">+12</span>
                      <button className="ml-auto text-xs text-blue-600 font-semibold hover:underline">Details</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Your Clubs */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Your Clubs</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {mockClubs.map((club) => (
                  <div
                    key={club.id}
                    className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition text-center cursor-pointer"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-3xl mx-auto mb-3">
                      {club.icon}
                    </div>
                    <p className="text-sm font-bold text-gray-900 leading-snug">
                      {club.name}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{club.members} Members</p>
                  </div>
                ))}

                {/* Find clubs CTA */}
                <Link
                  to="/events"
                  className="bg-white rounded-2xl p-5 border-2 border-dashed border-gray-200 hover:border-blue-300 transition text-center flex flex-col items-center justify-center gap-2 group"
                >
                  <div className="w-12 h-12 rounded-full bg-gray-100 group-hover:bg-blue-50 flex items-center justify-center transition">
                    <MdAdd className="text-2xl text-gray-400 group-hover:text-blue-600 transition" />
                  </div>
                  <p className="text-sm font-semibold text-gray-400 group-hover:text-blue-600 transition">
                    Find Clubs
                  </p>
                </Link>
              </div>
            </div>
          </div>

          {/* Profile & Settings Column (1/3 width on desktop) */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Your Profile</h2>
            <ProfileCard user={user} />
          </div>

        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;