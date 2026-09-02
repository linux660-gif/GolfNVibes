import {
  CalendarIcon,
  MapPinIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

interface ClubEvent {
  title: string;
  venue: string;
  date: string;
  status: string;
  image: string;
}

const CLUB_EVENTS: ClubEvent[] = [
  {
    title: "Member Exclusive: Sunset Scramble",
    venue: "Vipingo Ridge, Kenya",
    date: "18th August 2026",
    status: "Members Only",
    image: "https://golfnvibes.com/uploads/media/images/golfclub_img2.jpg",
  },
  {
    title: "Annual Club Championship & Gala",
    venue: "Mazagan Beach & Golf Resort, Morocco",
    date: "24th October 2026",
    status: "VIP Reserved",
    image: "https://golfnvibes.com/uploads/media/images/golfclub_img1.jpg",
  },
];

function EventCard({ event }: { event: ClubEvent }) {
  return (
    <a
      href="/Club#application-form"
      className="relative rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden group block focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none"
    >
      <div className="aspect-video w-full relative">
        <img
          src={event.image}
          alt={event.title}
          loading="lazy"
          decoding="async"
          width={640}
          height={360}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-zinc-950/80 border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] font-semibold tracking-wider flex items-center space-x-1">
          <LockClosedIcon className="w-3 h-3" />
          <span>{event.status}</span>
        </div>
      </div>

      <div className="p-6 space-y-3">
        <h3 className="text-xl font-serif font-bold text-white group-hover:text-[#D4AF37] transition-colors">
          {event.title}
        </h3>
        <div className="flex flex-wrap gap-4 text-xs text-zinc-400">
          <div className="flex items-center space-x-1.5">
            <MapPinIcon className="w-4 h-4 text-[#D4AF37]" />
            <span>{event.venue}</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <CalendarIcon className="w-4 h-4 text-[#D4AF37]" />
            <span>{event.date}</span>
          </div>
        </div>
      </div>
    </a>
  );
}

export default function UpcomingClubEvents() {
  return (
    <section className="rounded-4xl m-4 py-12 sm:py-20 px-4 sm:px-6 lg:px-12 bg-zinc-950 text-white border-t border-zinc-800">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-[10px] sm:text-xs tracking-widest font-semibold uppercase text-[#D4AF37]">
              Closed Fixtures
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white mt-1">
              Upcoming Club Gatherings
            </h2>
          </div>
          <p className="text-xs text-zinc-400 max-w-sm">
            Access to these gatherings is restricted to verified Golf n Vibes
            Club members.
          </p>
        </div>

        {CLUB_EVENTS.length === 0 ? (
          <p className="text-sm text-zinc-500 text-center py-12">
            No upcoming club gatherings at the moment — check back soon.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CLUB_EVENTS.map((event) => (
              <EventCard key={event.title} event={event} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
