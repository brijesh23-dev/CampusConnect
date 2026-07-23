import { Link } from "react-router-dom";
import {
  MdSearch,
  MdBolt,
  MdNotificationsActive,
  MdPeopleAlt,
  MdDashboard,
} from "react-icons/md";

const features = [
  {
    id: 1,
    icon: <MdSearch className="text-2xl text-blue-600" />,
    bg: "bg-blue-100",
    title: "Intelligent Event Discovery",
    description:
      "Find events that matter to you. Our algorithm learns your preferences and highlights workshops, parties, and study groups you'll love.",
    accent: false,
  },
  {
    id: 2,
    icon: <MdNotificationsActive className="text-2xl text-white" />,
    bg: "bg-violet-600",
    title: "Interest-Based Alerts",
    description:
      "Never miss an RSVP deadline. Get personalized push notifications for events matching your academic major or hobbies.",
    bullets: ["Hackathon Registration Open", "Design Club Meeting Today"],
    accent: true,
  },
  {
    id: 3,
    icon: <MdPeopleAlt className="text-2xl text-pink-600" />,
    bg: "bg-pink-100",
    title: "Club Management",
    description:
      "Streamline organization tasks, manage member rosters, and track event attendance all in one place.",
    accent: false,
  },
  {
    id: 4,
    icon: <MdDashboard className="text-2xl text-indigo-600" />,
    bg: "bg-indigo-100",
    title: "Student Dashboard",
    description:
      "View your upcoming schedule, past events, and saved interests on a clean, centralized calendar.",
    accent: false,
  },
];

function Features() {
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-bold text-gray-900">
            Everything You Need for Campus Life
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto">
            A unified platform designed to bring students and organizations
            together seamlessly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
          {features.map((feature, idx) => (
            <div
              key={feature.id}
              className={`rounded-2xl p-7 border transition hover:-translate-y-1 duration-200 ${
                feature.accent
                  ? "bg-violet-600 border-violet-500 text-white lg:row-span-2"
                  : "bg-gray-50 border-gray-100 text-gray-900"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${
                  feature.accent ? "bg-white/20" : feature.bg
                }`}
              >
                {feature.icon}
              </div>
              <h3
                className={`text-lg font-bold mb-3 ${
                  feature.accent ? "text-white" : "text-gray-900"
                }`}
              >
                {feature.title}
              </h3>
              <p
                className={`text-sm leading-relaxed ${
                  feature.accent ? "text-violet-100" : "text-gray-500"
                }`}
              >
                {feature.description}
              </p>
              {feature.bullets && (
                <ul className="mt-5 space-y-2">
                  {feature.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-center gap-2 text-sm text-violet-100"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-200 flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;