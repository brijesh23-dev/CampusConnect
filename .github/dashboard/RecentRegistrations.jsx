function RecentRegistrations({
  registrations,
}) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4">
        Recent Registrations
      </h2>

      <div className="space-y-4">
        {registrations?.map((reg) => (
          <div
            key={reg._id}
            className="border-b pb-3"
          >
            <h3 className="font-medium">
              {reg.student?.name}
            </h3>

            <p className="text-sm text-gray-500">
              Registered for{" "}
              {reg.event?.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentRegistrations;