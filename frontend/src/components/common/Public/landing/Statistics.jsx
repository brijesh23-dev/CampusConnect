const stats = [
  { id: 1, value: "10,000+", label: "Active Students" },
  { id: 2, value: "500+",    label: "Events This Semester" },
  { id: 3, value: "80+",     label: "Campus Clubs" },
  { id: 4, value: "98%",     label: "Satisfaction Rate" },
];

function Statistics() {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-600 to-violet-700">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {stats.map((stat) => (
            <div key={stat.id} className="space-y-1">
              <p className="text-4xl font-extrabold">{stat.value}</p>
              <p className="text-blue-100 text-sm font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Statistics;