import { Link ,useNavigate, useParams} from "react-router-dom";
import { useSelector ,useDispatch} from "react-redux";
import NotificationsIcon from '@mui/icons-material/Notifications';
import InterestsIcon from '@mui/icons-material/Interests';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import {fetchMyregistration,} from '../../redux/RegistrationSlice'
import { useEffect } from "react";

function StudentDashboard() {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth);

  const {registrations} = useSelector((state)=>state.registrations);

  useEffect(()=>{
    dispatch(fetchMyregistration())
  },[dispatch])
  console.log(registrations)
  
  const interests = user?.interests || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 px-6 py-10">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}

        <div className="bg-white rounded-3xl shadow-lg p-8 mb-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-60"></div>

          <h1 className="text-5xl font-bold mb-3">
            Welcome Back 
          </h1>

          <p className="text-gray-600 text-lg">
            Hello {user?.name}, explore events and stay updated with your interests.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {interests.length > 0 ? (
              interests.map((interest) => (
                <span
                  key={interest}
                  className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium hover:scale-105 transition"
                >
                  {interest}
                </span>
              ))
            ) : (
              <p className="text-gray-500">
                No interests selected yet
              </p>
            )}
          </div>
        </div>

        {/* Dashboard Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Browse Events */}

          <Link
            to="/events"
            className="group bg-white p-8 rounded-3xl shadow-md hover:shadow-2xl transition duration-300 hover:-translate-y-2"
          >
            <div className="text-5xl mb-5 group-hover:scale-110 transition">
              <EmojiEventsIcon fontSize="inherit" color="primary"/>
            </div>

            <h2 className="text-2xl font-bold mb-3">
              Browse Events
            </h2>

            <p className="text-gray-600">
              Discover upcoming college events and activities.
            </p>
          </Link>

          {/* Notifications */}

          <Link
            to="/notifications"
            className="group bg-white p-8 rounded-3xl shadow-md hover:shadow-2xl transition duration-300 hover:-translate-y-2"
          >
            <div className="text-5xl mb-5 group-hover:rotate-12 transition">
              <NotificationsIcon fontSize="inherit" color="primary"/>
            </div>

            <h2 className="text-2xl font-bold mb-3">
              Notifications
            </h2>

            <p className="text-gray-600">
              View notifications related to your interests.
            </p>
          </Link>

          {/* Interests */}

          <Link
            to="/manage-interests"
            className="group bg-white p-8 rounded-3xl shadow-md hover:shadow-2xl transition duration-300 hover:-translate-y-2"
          >
            <div className="text-5xl mb-5 group-hover:scale-125 transition">
              <InterestsIcon fontSize="inherit" color="primary" />
            </div>

            <h2 className="text-2xl font-bold mb-3">
              My Interests
            </h2>

            <p className="text-gray-600">
              Manage your interests for personalized event recommendations.
            </p>
          </Link>
             {/* Registered*/}
          <Link
            to="/my-registrations"
            className="group bg-white p-8 rounded-3xl shadow-md hover:shadow-2xl transition duration-300 hover:-translate-y-2"
          >
            <div className="text-5xl mb-5 group-hover:scale-125 transition">
              <InterestsIcon fontSize="inherit" color="primary" />
            </div>

            <h2 className="text-2xl font-bold mb-3">
              Registered Event
            </h2>

            <p className="text-gray-600">
              Manage your interests for personalized event recommendations.
            </p>
          </Link>
        </div>

        {/* Quick Stats */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white rounded-3xl p-6 shadow-md hover:shadow-xl transition hover:scale-105">
            <h3 className="text-gray-500 mb-2">
              Selected Interests
            </h3>

            <p className="text-4xl font-bold text-blue-600">
              {interests.length}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-md hover:shadow-xl transition hover:scale-105">
            <h3 className="text-gray-500 mb-2">
              Notifications
            </h3>

            <p className="text-4xl font-bold text-purple-600">
              12
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-md hover:shadow-xl transition hover:scale-105">
            <h3 className="text-gray-500 mb-2">
              Registered Events
            </h3>

            <p className="text-4xl font-bold text-green-600">
              {registrations.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;