import { MdStar } from "react-icons/md";

const testimonials = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "President, Tech Club",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    quote: "CampusConnect completely transformed how we organize hackathons. We reached twice as many students and managed RSVPs seamlessly in one place.",
    rating: 5,
  },
  {
    id: 2,
    name: "Alex Rivera",
    role: "Computer Science Student",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    quote: "I love the personalized recommendations. I found a robotics club and two coding workshops within my first week of using the app!",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Chen",
    role: "VP, Fine Arts Collective",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    quote: "The analytics tools are fantastic. We can see exactly which events generate the most student interest, allowing us to plan better mixers.",
    rating: 5,
  },
];

function Testimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Loved by Students and Clubs Alike
          </h2>
          <p className="text-gray-500 mt-3 max-w-lg mx-auto">
            Hear from the student leaders and active campus members who use CampusConnect daily.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-gray-50 rounded-2xl p-8 border border-gray-100 flex flex-col justify-between hover:shadow-lg transition duration-300"
            >
              <div>
                {/* Rating stars */}
                <div className="flex gap-1 mb-5 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <MdStar key={i} className="text-lg" />
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed italic mb-6">
                  "{t.quote}"
                </p>
              </div>

              {/* User details */}
              <div className="flex items-center gap-4 border-t border-gray-200/60 pt-5">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border border-gray-200"
                />
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">{t.name}</h4>
                  <p className="text-gray-400 text-xs font-medium">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
