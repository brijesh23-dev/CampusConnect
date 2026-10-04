import { MdSearch, MdNotificationsActive, MdPeopleAlt, MdDashboard } from "react-icons/md";

const features = [
  {
    title: "Smart discovery",
    description: "Browse events tailored to your interests, clubs, and study life in one clean feed.",
    icon: <MdSearch className="text-xl text-blue-600" />,
    accent: "bg-blue-50 text-blue-600",
  },
  {
    title: "Live updates",
    description: "Stay on top of RSVP deadlines, club announcements, and event reminders without the noise.",
    icon: <MdNotificationsActive className="text-xl text-violet-600" />,
    accent: "bg-violet-50 text-violet-600",
  },
  {
    title: "Organized communities",
    description: "Track clubs, members, and upcoming activities from a simple dashboard built for campus life.",
    icon: <MdPeopleAlt className="text-xl text-pink-600" />,
    accent: "bg-pink-50 text-pink-600",
  },
  {
    title: "Everything in one place",
    description: "Manage your schedule, interests, and registrations with a calm, focused student dashboard.",
    icon: <MdDashboard className="text-xl text-slate-700" />,
    accent: "bg-slate-100 text-slate-700",
  },
];

function Features() {
  return (
    <section className="bg-slate-50 py-20 dark:bg-slate-900">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Why CampusConnect</p>
          <h2 className="text-3xl font-black tracking-[-0.05em] text-slate-900 dark:text-white sm:text-4xl">
            One place for your campus rhythm.
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.04)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_25px_55px_rgba(15,23,42,0.08)] dark:border-slate-700 dark:bg-slate-950"
            >
              <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl ${feature.accent}`}>
                {feature.icon}
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">{feature.title}</h3>
              <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;