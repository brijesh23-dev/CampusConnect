import { Link, useNavigate } from "react-router-dom";
import { MdHome, MdArrowBack, MdSearch } from "react-icons/md";

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse pointer-events-none" style={{ animationDelay: "1.5s" }} />

      {/* Content */}
      <div className="relative z-10 text-center max-w-lg">
        {/* 404 number */}
        <div className="relative mb-6 select-none">
          <span className="text-[10rem] font-black leading-none bg-gradient-to-br from-blue-600 via-violet-500 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <MdSearch className="text-5xl text-white/60" />
          </div>
        </div>

        {/* Icon + Title */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-widest mb-5">
          Page Not Found
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3 leading-tight">
          Looks like you're lost in campus!
        </h1>
        <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-8">
          The page you're looking for doesn't exist or has been moved. Head back
          to the homepage or try exploring events.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-bold shadow-md hover:opacity-90 transition-all"
          >
            <MdHome className="text-lg" />
            Go to Homepage
          </Link>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-all"
          >
            <MdArrowBack className="text-lg" />
            Go Back
          </button>
        </div>

        {/* Quick links */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {[
            { label: "Browse Events", to: "/events" },
            { label: "Login", to: "/login" },
            { label: "Register", to: "/register" },
          ].map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-xs text-gray-400 hover:text-blue-600 hover:underline font-medium transition"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;