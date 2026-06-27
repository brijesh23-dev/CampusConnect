function Footer() {
  return (
    
    <footer className="bg-black text-white  w-full">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}

          <div>
            <h1 className="text-3xl font-bold mb-4">
              CampusConnect
            </h1>

            <p className="text-gray-400 leading-7">
              A modern college event management platform
              connecting students with clubs, workshops,
              hackathons, and campus activities.
            </p>
          </div>

          {/* Quick Links */}

          <div>
            <h2 className="text-xl font-semibold mb-4">
              Quick Links
            </h2>

            <ul className="space-y-3 text-gray-400">
              <li>
                <a
                  href="/events"
                  className="hover:text-white transition"
                >
                  Events
                </a>
              </li>

              <li>
                <a
                  href="/student/dashboard"
                  className="hover:text-white transition"
                >
                  Dashboard
                </a>
              </li>

              <li>
                <a
                  href="/notifications"
                  className="hover:text-white transition"
                >
                  Notifications
                </a>
              </li>

              <li>
                <a
                  href="/register"
                  className="hover:text-white transition"
                >
                  Register
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}

          <div>
            <h2 className="text-xl font-semibold mb-4">
              Contact
            </h2>

            <div className="space-y-3 text-gray-400">
              <p>📍 Ahmedabad, India</p>

              <p>📧 support@campusconnect.com</p>

              <p>📞 +91 9876543210</p>
            </div>
          </div>
        </div>

        {/* Bottom */}

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © 2026 CampusConnect. All rights reserved.
          </p>

          <div className="flex gap-5 mt-4 md:mt-0">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition"
            >
              Instagram
            </a>

            <a
              href="#"
              className="text-gray-400 hover:text-white transition"
            >
              LinkedIn
            </a>

            <a
              href="#"
              className="text-gray-400 hover:text-white transition"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;