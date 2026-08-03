import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  MdAccessTime,
  MdArrowBack,
  MdCalendarToday,
  MdCheckCircle,
  MdEvent,
  MdLocationOn,
  MdOpenInNew,
  MdPeopleOutline,
} from "react-icons/md";
import { fetchEvents, fetchSingleEvent } from "../../redux/eventSlice";
import { fetchMyregistration, registerForEvent } from "../../redux/RegistrationSlice";

function EventDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleEvent, eventLoading, events = [], error: eventError } = useSelector((state) => state.events);
  const { registrations = [], loading: registrationLoading } = useSelector((state) => state.registrations);
  const { user } = useSelector((state) => state.auth);
  const [registrationMessage, setRegistrationMessage] = useState("");

  useEffect(() => {
    dispatch(fetchSingleEvent(id));
    dispatch(fetchEvents());
    if (user?.role === "student") dispatch(fetchMyregistration());
  }, [dispatch, id, user?.role]);

  const relatedEvents = useMemo(() => events
    .filter((event) => event._id !== id)
    .sort((first, second) => Number(second.category === singleEvent?.category) - Number(first.category === singleEvent?.category))
    .slice(0, 3), [events, id, singleEvent?.category]);

  const isRegistered = registrations.some((registration) => {
    const event = registration.event;
    return (typeof event === "string" ? event : event?._id) === id;
  });

  const handleRegister = async () => {
    setRegistrationMessage("");
    try {
      await dispatch(registerForEvent(id)).unwrap();
      setRegistrationMessage("You're registered. We'll keep this event in your registrations.");
    } catch (error) {
      setRegistrationMessage(error?.message || error || "We couldn't complete your registration. Please try again.");
    }
  };

  if (eventLoading) {
    return <div className="mx-auto flex min-h-[60vh] max-w-6xl items-center px-6"><div className="w-full animate-pulse space-y-5"><div className="h-80 rounded-3xl bg-gray-200" /><div className="h-10 w-2/3 rounded bg-gray-200" /><div className="h-28 rounded-2xl bg-gray-100" /></div></div>;
  }

  if (!singleEvent) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-2xl items-center px-6 py-16 text-center">
        <div className="w-full rounded-2xl border border-dashed border-gray-300 p-10">
          <MdEvent className="mx-auto mb-4 text-5xl text-gray-400" aria-hidden="true" />
          <h1 className="text-2xl font-bold text-gray-900">This event is unavailable</h1>
          <p className="mt-2 text-sm text-gray-600">{eventError || "It may have been removed, or the link is no longer valid."}</p>
          <Link to="/events" className="mt-6 inline-flex rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800">Browse events</Link>
        </div>
      </main>
    );
  }

  const dateText = new Date(singleEvent.date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
  const timeText = [singleEvent.startTime, singleEvent.endTime].filter(Boolean).join(" – ") || "Time to be announced";

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="relative h-72 overflow-hidden bg-blue-950 md:h-96">
        {singleEvent.image ? <img src={singleEvent.image} alt="" className="h-full w-full object-cover opacity-80" /> : <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-800 to-violet-800"><MdEvent className="text-8xl text-white/80" aria-hidden="true" /></div>}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute left-6 top-5 flex flex-wrap gap-2"><span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold capitalize text-white backdrop-blur">{singleEvent.category || "Campus event"}</span></div>
      </section>

      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <div>
              <Link to="/events" className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"><MdArrowBack /> All events</Link>
              <h1 className="text-4xl font-extrabold leading-tight text-gray-900">{singleEvent.title}</h1>
              <p className="mt-2 text-sm font-semibold text-violet-700">Hosted by {singleEvent.club?.name || "Campus club"}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex gap-3 rounded-2xl border border-gray-200 bg-white p-4"><MdCalendarToday className="mt-1 shrink-0 text-xl text-blue-700" /><div><p className="text-xs font-medium text-gray-500">Date and time</p><p className="mt-1 text-sm font-semibold text-gray-900">{dateText}</p><p className="mt-1 text-sm text-gray-600">{timeText}</p></div></div>
              <div className="flex gap-3 rounded-2xl border border-gray-200 bg-white p-4"><MdLocationOn className="mt-1 shrink-0 text-xl text-violet-700" /><div><p className="text-xs font-medium text-gray-500">Location</p><p className="mt-1 text-sm font-semibold text-gray-900">{singleEvent.venue || "Venue to be announced"}</p></div></div>
            </div>

            <section className="rounded-2xl border border-gray-200 bg-white p-6"><h2 className="text-lg font-bold text-gray-900">About this event</h2><p className="mt-3 whitespace-pre-line text-sm leading-7 text-gray-700">{singleEvent.description || "More event details will be shared by the organizer."}</p></section>

            {relatedEvents.length > 0 && <section><div className="mb-5 flex items-center justify-between gap-4"><div><h2 className="text-xl font-bold text-gray-900">More to explore</h2><p className="mt-1 text-sm text-gray-600">Other events happening around campus.</p></div><Link to="/events" className="inline-flex items-center gap-1 text-sm font-semibold text-blue-700 hover:underline">View all <MdOpenInNew /></Link></div><div className="grid gap-4 sm:grid-cols-3">{relatedEvents.map((event) => <Link key={event._id} to={`/events/${event._id}`} className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition-shadow hover:shadow-md"><div className="flex h-28 items-center justify-center bg-blue-50">{event.image ? <img src={event.image} alt="" className="h-full w-full object-cover" /> : <MdEvent className="text-3xl text-blue-500" />}</div><div className="p-4"><p className="text-xs font-semibold capitalize text-violet-700">{event.category || "Event"}</p><h3 className="mt-1 text-sm font-bold leading-snug text-gray-900 group-hover:text-blue-700">{event.title}</h3><p className="mt-2 flex items-center gap-1 text-xs text-gray-600"><MdAccessTime /> {event.startTime || "Time TBA"}</p></div></Link>)}</div></section>}
          </div>

          <aside className="space-y-5">
            <section className="sticky top-24 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"><h2 className="text-lg font-bold text-gray-900">Registration</h2><p className="mt-1 text-sm text-gray-600">General admission is free. Bring your student ID for check-in.</p><div className="my-5 border-y border-gray-100 py-3 text-sm font-semibold text-green-700">Free admission</div>{user?.role === "student" ? isRegistered ? <div className="flex items-center justify-center gap-2 rounded-xl bg-green-50 py-3 text-sm font-semibold text-green-800"><MdCheckCircle /> You’re registered</div> : <button onClick={handleRegister} disabled={registrationLoading} className="w-full rounded-xl bg-blue-700 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60">{registrationLoading ? "Registering…" : "Register now"}</button> : user ? <p className="rounded-xl bg-gray-100 p-3 text-sm text-gray-700">Sign in as a student to register for this event.</p> : <Link to={`/login?redirect=${encodeURIComponent(`/events/${id}`)}`} className="block w-full rounded-xl bg-blue-700 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-800">Sign in to register</Link>}{registrationMessage && <p className={`mt-3 text-sm ${isRegistered ? "text-green-700" : "text-red-700"}`}>{registrationMessage}</p>}</section>
            <section className="rounded-2xl border border-gray-200 bg-white p-6"><p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Organized by</p><div className="mt-4 flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-full bg-violet-100 font-bold text-violet-800">{singleEvent.club?.name?.[0] || "C"}</div><div><p className="text-sm font-bold text-gray-900">{singleEvent.club?.name || "Campus club"}</p><p className="text-xs text-gray-600">Campus event organizer</p></div></div><div className="mt-4 flex items-center gap-2 text-sm text-gray-600"><MdPeopleOutline /> Discover more campus activities</div></section>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default EventDetails;
