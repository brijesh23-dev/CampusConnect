import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import HubIcon from "@mui/icons-material/Hub";
import { logoutUser } from "../redux/authSlice";


function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between px-8 py-3 shadow-md bg-white sticky top-0 z-10 ">
      <div className="flex items-center  text-blue-600">
        <Link to="/" className="text-2xl font-bold">
          <span className="font-bold mr-3 text-shadow-lg font-Inter">
            <HubIcon></HubIcon> <span className="">CampusConnect</span>
          </span>
        </Link>
      </div>

      <div className="flex gap-5 items-center">
        {
          user&& <>
          <Link to="/events" className="nav-btn">
          events
        </Link>
          </>
        }

        {!user && (
          <>
            <Link to="/login" className="nav-btn  ">
              Login
            </Link>
            <Link to="/register" className="nav-btn">
              Register
            </Link>
          </>
        )}

        {user?.role === "student" && (
          <>
            <Link to="/student/dashboard" className="nav-btn">
              Dashboard
            </Link>

            <Link to="/notifications" className="nav-btn">
              Notifications
            </Link>
          </>
        )}

        {user?.role === "club" && (
          <>
            <Link
              to="/club/dashboard"
              className="nav-btn"
            >
              Dashboard
            </Link>

            {/* <Link
              to="/create-event"
              className="nav-btn"
            >
              Create Event
            </Link> */}

            {/* <Link
              to="/my-events"
              className="nav-btn"
            >
              My Events
            </Link> */}
          </>
        )}

        {user && (
          <button onClick={handleLogout} className="nav-btn">
            Logout
          </button>
        )}

      </div>
    </nav>
  );
}

export default Navbar;
