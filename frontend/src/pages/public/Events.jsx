import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import {
  MdCalendarToday,
  MdEvent,
  MdLocationOn,
  MdSearch,
  MdTune,
} from "react-icons/md";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { fetchEvents } from "../../redux/eventSlice";

const PAGE_SIZE = 6;
const categories = [
  { label: "All events", value: "all" },
  { label: "Technology", value: "technology" },
  { label: "Coding", value: "coding" },
  { label: "AI", value: "ai" },
  { label: "Arts & culture", value: "arts" },
  { label: "Sports", value: "sports" },
];

const isWithinDateRange = (dateValue, period) => {
  if (period === "all") return true;

  const eventDate = new Date(dateValue);
  if (Number.isNaN(eventDate.getTime())) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  eventDate.setHours(0, 0, 0, 0);

  if (period === "today") return eventDate.getTime() === today.getTime();

  const end = new Date(today);
  end.setDate(today.getDate() + (period === "week" ? 7 : 30));
  return eventDate >= today && eventDate <= end;
};

function Events() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { events = [], loading } = useSelector((state) => state.events);
  const initialQuery = searchParams.get("q") || "";

  const [search, setSearch] = useState(initialQuery);
  const [category, setCategory] = useState("all");
  const [dateRange, setDateRange] = useState("all");
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  useEffect(() => {
    const query = searchParams.get("q") || "";
    setSearch(query);
  }, [searchParams]);

  const filteredEvents = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return events.filter((event) => {
      const searchableText = [event.title, event.description, event.category, event.venue]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      const matchesSearch = !normalizedSearch || searchableText.includes(normalizedSearch);
      const matchesCategory = category === "all" || event.category?.toLowerCase() === category;

      return matchesSearch && matchesCategory && isWithinDateRange(event.date, dateRange);
    });
  }, [category, dateRange, events, search]);

  const totalPages = Math.max(1, Math.ceil(filteredEvents.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pagedEvents = filteredEvents.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const updateSearch = (value) => {
    setSearch(value);
    setPage(1);
    const nextParams = new URLSearchParams(searchParams);
    if (value.trim()) nextParams.set("q", value.trim());
    else nextParams.delete("q");
    setSearchParams(nextParams, { replace: true });
  };

  const clearFilters = () => {
    setSearch("");
    setCategory("all");
    setDateRange("all");
    setPage(1);
    setSearchParams({}, { replace: true });
  };

  return (
    <main className="min-h-screen bg-white">
      <section className="mx-auto max-w-7xl px-6 pb-6 pt-12">
        <h1 className="mb-2 text-4xl font-extrabold text-gray-900">Discover campus events</h1>
        <p className="max-w-2xl text-gray-600">
          Find workshops, performances, competitions, and communities worth showing up for.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6" aria-label="Event filters">
        <div className="mb-4 flex flex-col gap-3 md:flex-row">
          <label className="flex flex-1 items-center gap-2 rounded-xl bg-gray-100 px-4 py-3">
            <MdSearch className="shrink-0 text-xl text-gray-500" aria-hidden="true" />
            <span className="sr-only">Search events</span>
            <input
              type="search"
              placeholder="Search by event name, venue, or keyword"
              value={search}
              onChange={(event) => updateSearch(event.target.value)}
              className="w-full bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-500"
            />
          </label>

          <label className="sr-only" htmlFor="event-category">Category</label>
          <select
            id="event-category"
            value={category}
            onChange={(event) => { setCategory(event.target.value); setPage(1); }}
            className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-300"
          >
            {categories.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
            <option value="music">Music</option>
            <option value="business">Business</option>
            <option value="social">Social</option>
          </select>

          <label className="sr-only" htmlFor="event-date">Date</label>
          <select
            id="event-date"
            value={dateRange}
            onChange={(event) => { setDateRange(event.target.value); setPage(1); }}
            className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="all">Any date</option>
            <option value="today">Today</option>
            <option value="week">Next 7 days</option>
            <option value="month">Next 30 days</option>
          </select>

          <button onClick={clearFilters} className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300">
            <MdTune className="text-lg" aria-hidden="true" /> Clear filters
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              key={item.value}
              onClick={() => { setCategory(item.value); setPage(1); }}
              aria-pressed={category === item.value}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${category === item.value ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16 pt-10" aria-live="polite">
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-gray-900">Upcoming events</h2>
          <span className="text-sm text-gray-600">{filteredEvents.length} {filteredEvents.length === 1 ? "event" : "events"} found</span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => <div key={index} className="h-96 animate-pulse rounded-2xl bg-gray-100" />)}
          </div>
        ) : pagedEvents.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 px-6 py-20 text-center">
            <MdEvent className="mx-auto mb-3 text-4xl text-gray-400" aria-hidden="true" />
            <p className="text-lg font-bold text-gray-900">No events match those filters</p>
            <p className="mt-1 text-sm text-gray-600">Try a different search term or clear the filters.</p>
            <button onClick={clearFilters} className="mt-5 text-sm font-semibold text-blue-700 hover:underline">Clear all filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pagedEvents.map((event) => (
              <article key={event._id} className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-shadow duration-200 hover:shadow-lg">
                <div className="relative flex h-48 items-center justify-center overflow-hidden bg-blue-50">
                  {event.image ? <img src={event.image} alt="" className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105" /> : <MdEvent className="text-5xl text-blue-500" aria-hidden="true" />}
                  <span className="absolute left-3 top-3 rounded-full bg-blue-700 px-3 py-1 text-xs font-bold capitalize text-white">{event.category || "Campus event"}</span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="mb-1 truncate text-xs font-semibold text-violet-700">{event.club?.name || "Campus club"}</p>
                  <h3 className="mb-4 text-lg font-bold leading-snug text-gray-900">{event.title}</h3>
                  <div className="mb-5 space-y-2 text-sm text-gray-600">
                    <p className="flex items-center gap-2"><MdCalendarToday aria-hidden="true" /> {new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}{event.startTime ? ` · ${event.startTime}` : ""}</p>
                    <p className="flex items-center gap-2"><MdLocationOn aria-hidden="true" /> <span className="truncate">{event.venue || "Venue to be announced"}</span></p>
                  </div>
                  <div className="mt-auto flex gap-3">
                    <Link to={`/events/${event._id}`} className="flex-1 rounded-xl border border-gray-300 py-2.5 text-center text-sm font-semibold text-gray-800 transition hover:bg-gray-50">Details</Link>
                    <Link to={`/events/${event._id}`} className="flex-1 rounded-xl bg-blue-700 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-blue-800">Register</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {!loading && totalPages > 1 && (
          <nav className="mt-12 flex items-center justify-center gap-2" aria-label="Event pagination">
            <button onClick={() => setPage((value) => Math.max(1, value - 1))} disabled={currentPage === 1} className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 text-gray-700 disabled:opacity-40"><HiChevronLeft /></button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => <button key={number} onClick={() => setPage(number)} aria-current={currentPage === number ? "page" : undefined} className={`h-9 w-9 rounded-xl text-sm font-semibold ${currentPage === number ? "bg-blue-700 text-white" : "border border-gray-200 text-gray-700 hover:bg-gray-50"}`}>{number}</button>)}
            <button onClick={() => setPage((value) => Math.min(totalPages, value + 1))} disabled={currentPage === totalPages} className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 text-gray-700 disabled:opacity-40"><HiChevronRight /></button>
          </nav>
        )}
      </section>
    </main>
  );
}

export default Events;
