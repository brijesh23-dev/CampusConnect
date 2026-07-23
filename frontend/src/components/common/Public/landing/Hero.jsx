import { Link } from "react-router-dom";
import { MdArrowForward } from "react-icons/md";
import { BsBell } from "react-icons/bs";

function Hero() {
  return (
    <section className="min-h-[92vh] flex items-center bg-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-medium mb-8">
              <BsBell className="text-base" />
              Over 500+ events this week
            </div>

            <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900 mb-6">
              Discover College Events That Match Your{" "}
              <span className="text-blue-600">Interests</span>
            </h1>

            <p className="text-lg text-gray-500 leading-relaxed mb-10 max-w-lg">
              Never miss out on campus life. Connect with clubs, find workshops,
              and join social events tailored specifically to your academic and
              personal passions.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/events"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-md shadow-blue-200"
              >
                Explore Events
                <MdArrowForward className="text-lg" />
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition"
              >
                Join as Club
              </Link>
            </div>
          </div>

          {/* Right – Preview card */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm">
              {/* Main card */}
              <div className="rounded-3xl overflow-hidden bg-gray-100 shadow-2xl border border-gray-200 aspect-[4/5] flex items-center justify-center">
                <img
                  src="https://images.pexels.com/photos/38269597/pexels-photo-38269597.jpeg"
                  alt="Campus events"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>

              {/* Floating event preview */}
              <div className="absolute -bottom-5 left-0 right-4 mx-4 bg-white rounded-2xl shadow-xl p-4 border border-gray-100 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-lg">🎓</span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate">
                    Tech Symposium 2024
                  </p>
                  <p className="text-xs text-gray-500">
                    Today at 2:00 PM • Main Hall
                  </p>
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