import { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdArrowBack, MdArrowForward, MdCalendarToday, MdEvent, MdGroups, MdLocationOn, MdMail, MdLanguage } from "react-icons/md";
import { fetchEvents } from "../../redux/eventSlice";
import { fetchClubById } from "../../redux/clubSlice";

const FALLBACK_CLUBS = {
  c1: { _id: "c1", name: "Campus Tech Society", category: "Technology", description: "A student-led community for workshops, hackathons, and conversations with people building the future.", email: "cts@university.edu", website: "https://campustechsociety.edu", membersCount: 312, eventsCount: 24, avatar: "T" },
};

function ClubDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleClub, loading, error } = useSelector((state) => state.clubs);
  const { events = [] } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(fetchClubById(id));
    dispatch(fetchEvents());
  }, [dispatch, id]);

  const club = singleClub || FALLBACK_CLUBS[id];
  const clubEvents = useMemo(() => {
    if (!club) return [];
    const fromClub = club.events || [];
    const fromEvents = events.filter((event) => (typeof event.club === "string" ? event.club : event.club?._id) === id);
    return (fromClub.length ? fromClub : fromEvents).filter((event) => new Date(event.date) >= new Date()).sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [club, events, id]);

  if (loading && !club) return <div className="mx-auto flex min-h-[55vh] max-w-5xl items-center px-6"><div className="w-full animate-pulse space-y-5"><div className="h-48 rounded-3xl bg-gray-200" /><div className="h-32 rounded-2xl bg-gray-100" /></div></div>;
  if (!club) return <main className="mx-auto flex min-h-[55vh] max-w-2xl items-center px-6 py-16 text-center"><div className="w-full rounded-2xl border border-dashed border-gray-300 p-10"><MdGroups className="mx-auto mb-4 text-5xl text-gray-400" /><h1 className="text-2xl font-bold text-gray-900">Club not found</h1><p className="mt-2 text-sm text-gray-600">{error || "This club may no longer be available."}</p><Link to="/clubs-directory" className="mt-6 inline-flex rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white">Browse clubs</Link></div></main>;

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white"><div className="mx-auto max-w-5xl px-6 pb-10 pt-8"><Link to="/clubs-directory" className="mb-7 inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white"><MdArrowBack /> All clubs</Link><div className="flex flex-col gap-5 sm:flex-row sm:items-center"><div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-3xl font-black">{club.avatar || club.name?.[0]?.toUpperCase() || "C"}</div><div><span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold capitalize">{club.category || "Campus life"}</span><h1 className="mt-3 text-3xl font-black">{club.name}</h1><div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-300"><span className="inline-flex items-center gap-1.5"><MdGroups className="text-blue-300" /> {club.membersCount || 0} members</span><span className="inline-flex items-center gap-1.5"><MdEvent className="text-blue-300" /> {club.eventsCount ?? clubEvents.length} events hosted</span></div></div></div></div></section>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-6 py-10 lg:grid-cols-3"><section className="space-y-6 lg:col-span-2"><div><h2 className="text-xl font-extrabold text-gray-900">Upcoming events</h2><p className="mt-1 text-sm text-gray-600">See what this club is hosting next.</p></div>{clubEvents.length === 0 ? <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center"><MdEvent className="mx-auto mb-3 text-4xl text-gray-400" /><p className="font-semibold text-gray-900">No upcoming events yet</p><p className="mt-1 text-sm text-gray-600">Check back soon for the next club gathering.</p></div> : <div className="space-y-4">{clubEvents.map((event) => <article key={event._id} className="flex gap-4 rounded-2xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md"><div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-blue-50 text-blue-700"><span className="text-xs font-bold uppercase">{new Date(event.date).toLocaleDateString("en-US", { month: "short" })}</span><span className="text-xl font-black leading-none">{new Date(event.date).getDate()}</span></div><div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-3"><h3 className="font-bold leading-snug text-gray-900">{event.title}</h3><span className="shrink-0 rounded-full bg-violet-50 px-2 py-0.5 text-xs font-bold capitalize text-violet-700">{event.category || "Event"}</span></div><div className="mt-2 flex flex-wrap gap-3 text-xs text-gray-600"><span className="inline-flex items-center gap-1"><MdLocationOn /> {event.venue || "Venue TBA"}</span><span className="inline-flex items-center gap-1"><MdCalendarToday /> {event.startTime || "Time TBA"}</span></div><Link to={`/events/${event._id}`} className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-blue-700 hover:underline">View and register <MdArrowForward /></Link></div></article>)}</div>}</section>

        <aside className="space-y-5"><section className="rounded-2xl border border-gray-200 bg-white p-5"><h2 className="text-sm font-bold text-gray-900">About</h2><p className="mt-3 text-sm leading-6 text-gray-700">{club.description || "This club has not added a description yet."}</p></section><section className="rounded-2xl border border-gray-200 bg-white p-5"><h2 className="text-sm font-bold text-gray-900">Contact</h2><div className="mt-4 space-y-3">{club.email && <a href={`mailto:${club.email}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-700"><MdMail /> {club.email}</a>}{club.website && <a href={club.website} target="_blank" rel="noreferrer" className="flex items-center gap-2 truncate text-sm text-gray-600 hover:text-blue-700"><MdLanguage /> {club.website.replace(/^https?:\/\//, "")}</a>}{!club.email && !club.website && <p className="text-sm text-gray-600">Contact details coming soon.</p>}</div></section><Link to="/events" className="flex items-center justify-center gap-2 rounded-xl bg-gray-900 py-3 text-sm font-semibold text-white hover:bg-gray-800">Browse all events <MdArrowForward /></Link></aside>
      </div>
    </main>
  );
}

export default ClubDetails;
