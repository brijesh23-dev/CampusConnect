import { Link } from "react-router-dom";

function CTA() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
          Ready to get started?
        </h2>
        <p className="text-gray-500 mb-8">
          Join thousands of students already discovering events on CampusConnect.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/register"
            className="px-8 py-3.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-md"
          >
            Sign Up Free
          </Link>
          <Link
            to="/events"
            className="px-8 py-3.5 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition"
          >
            Browse Events
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CTA;
