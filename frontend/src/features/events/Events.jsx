import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchEvents } from "../../redux/eventSlice";
import { Button, Card, Image, Text } from "@chakra-ui/react";

function Events() {
  const dispatch = useDispatch();

  const { events, loading } = useSelector((state) => state.events);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(search.toLowerCase()) ||
        event.description.toLowerCase().includes(search.toLowerCase());

      const matchesCategory = category === "all" || event.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [events, search, category]);

  if (loading) {
    return (
      <div className="flex justify-center mt-20">
        <h1 className="text-2xl font-semibold">Loading events...</h1>
      </div>
    );
  }

  return (
    <div className="h-full px-6 pt-10 max-h-max font-Inter">
      <div className="max-w-7xl mx-auto max-h-max  mb-5">
        <h1 className="text-4xl font-bold mb-8 text-blue-600  font-Inter  ">
          College Events
        </h1>

        {/* Search + Filter */}

        <div className="flex flex-col md:flex-row gap-4 mb-10 shadow-sm">
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border p-3 rounded-xl bg-white    focus:outline-none focus:border-none hover:outline hover:outline-offset-1 hover:outline-blue-400"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-3 rounded-xl bg-white"
          >
            <option value="all">All Categories</option>

            <option value="technology">Technology</option>

            <option value="coding">Coding</option>

            <option value="ai">AI</option>

            <option value="sports">Sports</option>

            <option value="music">Music</option>

            <option value="business">Business</option>
          </select>
        </div>

        {/* Event Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {filteredEvents.map((event) => (
            <div
              key={event._id}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition flex flex-col justify-between relative"
            >
              <div> 
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold font-Inter text-neutral-800">
                    {event.title}
                  </h2>

                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm transition-all duration-200 ease-in-out  hover:text-white hover:bg-blue-700">
                    {event.category}
                  </span>
                </div> 
                <div>
                  {event.image && (
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )}
                </div>

                <p className="text-neutral-700 mb-4 ">{event.description}</p>

                <div className="space-y-2 text-sm text-gray-700">
                  <p> {new Date(event.date).toLocaleDateString()}</p>

                  <p>{event.time}</p>

                  <p> {event.venue}</p>

                  <p>{event.club?.name || "Club"}</p>
                </div> 
              </div>
              <div >
                <Link
                  to={`/events/${event._id}`}
                  className="block text-center w-full mt-6 bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition position-absolute bottom-4"
                >
                  View Details
                </Link>
               
              </div>
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center mt-20">
            <h2 className="text-2xl font-semibold">No events found</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default Events;
