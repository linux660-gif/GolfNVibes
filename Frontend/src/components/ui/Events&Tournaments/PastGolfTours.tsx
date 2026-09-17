import {  ArrowRightIcon } from "@heroicons/react/24/outline";

export interface PastTour {
  id: string;
  title: string;
  image: string;
  href?: string;
}

interface PastGolfToursProps {
  tours?: PastTour[];
  eyebrow?: string;
  heading?: string;
  description?: string;
  priorityCount?: number;
  viewAllHref?: string;
  className?: string;
}

const DEFAULT_TOURS: PastTour[] = [
  {
    id: "morocco-desert-swing",
    title: "Morocco Desert Swing",
    image: "https://golfnvibes.com/uploads/media/images/Gallery/tournaments/morocco_desert_swing.webp",
  },
  {
    id: "antalya-golf-escape",
    title: "Antalya Golf Escape",
    image: "https://golfnvibes.com/uploads/media/images/Gallery/tournaments/antalya_golf_escape.webp",
  },
  {
    id: "arusha-golf-safari",
    title: "The Arusha Golf Safari",
    image: "https://golfnvibes.com/uploads/media/images/Gallery/tournaments/arusha_golf_safari.webp",
  },
  {
    id: "vipingo-weekender",
    title: "Vipingo Weekender",
    image: "https://golfnvibes.com/uploads/media/images/Gallery/tournaments/vipingo_weekender.webp",
  },
];

function TourCard({
  tour,
  priority,
}: {
  tour: PastTour;
  priority: boolean;
}) {
  const CardTag = tour.href ? "a" : "div";

  return (
    <CardTag
      {...(tour.href ? { href: tour.href } : {})}
      className="group relative block aspect-3/4 w-full overflow-hidden rounded-2xl bg-zinc-200 shadow-md ring-1 ring-black/5 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
    >
      <img
        src={tour.image}
        alt={`${tour.title}`}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        width={480}
        height={640}
        className="h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:grayscale-0"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-500 group-hover:from-black/95"
      />

      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
        <h3 className="text-sm sm:text-base font-bold tracking-tight text-white leading-snug">
          {tour.title}
        </h3>
        <div className="mt-2 flex flex-col gap-1 text-[11px] sm:text-xs text-zinc-300">
          {/* <span className="flex items-center gap-1.5">
            <MapPinIcon className="h-3.5 w-3.5 shrink-0 text-zinc-400" />
            {tour.location}
          </span> */}
          {/* <span className="flex items-center gap-1.5">
            <CalendarIcon className="h-3.5 w-3.5 shrink-0 text-zinc-400" />
            {tour.date}
          </span> */}
        </div>
      </div>

      <div className="absolute inset-0 ring-1 ring-inset ring-white/10 transition-colors duration-500 group-hover:ring-white/30" />
    </CardTag>
  );
}

export default function PastGolfTours({
  tours = DEFAULT_TOURS,
  eyebrow = "Where We've Played",
  heading = "Past Golf Tours",
  description = "A look back at the fairways, destinations, and moments that made every trip unforgettable.",
  priorityCount = 2,
  viewAllHref = "/Gallery",
  className = "",
}: PastGolfToursProps) {
  return (
    <section
      className={`rounded-3xl sm:rounded-4xl m-2 sm:m-4 bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20 border border-zinc-200 ${className}`}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 sm:mb-14 flex flex-col items-center text-center gap-3 sm:gap-4">
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
            {eyebrow}
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-black">
            {heading}
          </h2>
          <div className="h-0.5 w-12 bg-black" />
          <p className="max-w-xl text-sm sm:text-base text-zinc-600 leading-relaxed">
            {description}
          </p>
        </div>

        {tours.length === 0 ? (
          <p className="text-center text-sm text-zinc-500 py-16">
            No past tours to show yet — check back soon.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
            {tours.map((tour, i) => (
              <TourCard key={tour.id} tour={tour} priority={i < priorityCount} />
            ))}
          </div>
        )}

        {viewAllHref && (
          <div className="mt-10 sm:mt-14 flex justify-center">
            <a
              href={viewAllHref}
              className="inline-flex items-center gap-2 rounded-full border border-black bg-black px-7 py-3 text-xs sm:text-sm font-semibold uppercase tracking-widest text-white transition-colors duration-300 hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
            >
              View Full Gallery
              <ArrowRightIcon className="h-4 w-4" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}