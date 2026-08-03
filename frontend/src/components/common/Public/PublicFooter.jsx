import { Link } from "react-router-dom";

function PublicFooter() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <Link to="/" className="text-xl font-extrabold text-blue-600">
              CampusConnect
            </Link>
            <p className="mt-3 text-sm text-gray-500 max-w-xs leading-relaxed">
              Empowering student life through connection and shared experiences.
            </p>
          </div>

          {/* Platform */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-4">Platform</p>
            <ul className="space-y-2.5">
              {[{ label: "Browse events", to: "/events" }, { label: "Explore clubs", to: "/clubs-directory" }, { label: "Create an account", to: "/register" }].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="text-sm text-gray-500 hover:text-blue-600 transition"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-4">Legal</p>
            <ul className="space-y-2.5">
              {["Privacy Policy", "Terms of Service"].map((item) => (
                <li key={item}>
                  <Link
                    to="#"
                    className="text-sm text-gray-500 hover:text-blue-600 transition"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <p className="text-xs text-gray-400">
            © 2024 CampusPulse. Empowering Student Life.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default PublicFooter;
