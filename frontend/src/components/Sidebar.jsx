import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/authSlice";
import { MdPeopleOutline } from "react-icons/md";
import {
    CiChat1,
  CiCircleChevDown,
  CiCircleRemove,
  CiCompass1,
  CiLogin,
  CiLogout,
  CiPaperplane,
  CiTrophy,
} from "react-icons/ci";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed right-3 top-0 z-50 flex h-14 w-14 items-center justify-center  text-blue-800 transition-all duration-200 ease-in lg:hidden"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <CiCircleRemove className="text-3xl" /> : <CiCircleChevDown className="text-3xl" />}
      </button>

      <aside
        className={`fixed right-0 top-0 z-40 h-screen w-64  bg-white shadow-xl transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0 opacity-100" : "translate-x-[18rem] "
        }`}
      >
        <div className="flex h-full flex-col justify-between p-4 ">
          <div className="divide-y-[2px] divide-neutral-200">
            <div className="mb-6 flex items-center gap-3 r">
              <MdPeopleOutline className="text-3xl" />
              <span className="text-lg font-semibold">CampusConnect</span>
            </div>

            <nav className="flex flex-col  divide-y-[2px] divide-neutral-200">
              <Link
                to="/events"
                className="sidebar-link"
              >
                <CiTrophy className="text-2xl" />
                <span className="ml-5">Events</span>
              </Link>

              {!user && (
                <>
                  <Link
                    to="/login"
                    className="sidebar-link"
                  >
                    <CiLogin className="text-2xl" />
                    <span className="ml-5">Login</span>
                  </Link>

                  <Link
                    to="/register"
                    className="sidebar-link"
                  >
                    <CiPaperplane className="text-2xl" />
                    <span className="ml-5">Register</span>
                  </Link>
                </>
              )}

              {user?.role === "student" && (
                <>
                  <Link
                    to="/student/dashboard"
                    className="sidebar-link"
                  >
                    <CiCompass1 className="text-2xl" />
                    <span className="ml-5">Dashboard</span>
                  </Link>

                  <Link
                    to="/notifications"
                    className="sidebar-link"
                  >
                    <CiChat1 className="text-2xl" />
                    <span className="ml-5">Notifications</span>
                  </Link>
                </>
              )}
            </nav>
          </div>

          {user && (
            <button
              onClick={handleLogout}
              className=""
            ><span className="sidebar-link">
                <CiLogout className="text-2xl"/>
              <span className="ml-5">Logout</span>
            </span>
            </button>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;