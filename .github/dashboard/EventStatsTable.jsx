function EventStatsTable({ stats }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4">
        Event Statistics
      </h2>

      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3">
              Event
            </th>

            <th className="text-left py-3">
              Registrations
            </th>
          </tr>
        </thead>

        <tbody>
          {stats?.map((item) => (
            <tr
              key={item._id?._id}
              className="border-b"
            >
              <td className="py-3">
                {item._id?.title}
              </td>

              <td className="py-3">
                {item.registrations}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EventStatsTable;