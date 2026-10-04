import { Link } from "react-router-dom";

function CTA() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-r from-slate-900 via-slate-800 to-violet-900 px-6 py-10 text-center shadow-[0_30px_80px_rgba(15,23,42,0.2)] sm:px-10 lg:px-16">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-300">Start now</p>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.05em] text-white sm:text-4xl">
            Make your campus feel more connected.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
            Join students and clubs building a more active, discoverable campus community.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/register"
              className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Create account
            </Link>
            <Link
              to="/events"
              className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Browse events
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTA;
