// import { useState } from "react";
// import {
//   MapPinIcon,
//   CalendarIcon,
//   ArrowRightIcon,
// } from "@heroicons/react/24/outline";

// interface Tournament {
//   image: string;
//   title: string;
//   description: string;
//   venue: string;
//   date: string;
//   purse: string;
//   winner?: string;
// }

// const TOURNAMENTS: Tournament[] = [
//   {
//     image: "/pastevent3.jpg",
//     title: "Road To Turkey Sigona",
//     description:
//       "A high-stakes weekend shootout under the Moroccan sun, blending fierce tournament play with evening desert oasis parties and live percussion.",
//     venue: "Mazagan Golf Club, Morocco",
//     date: "12th March 2026",
//     purse: "25,000",
//     winner: "Marcus Vance",
//   },
//   {
//     image: "/pastevent1.jpg",
//     title: "Naivasha Weekender",
//     description:
//       "Catch the ultimate tropical vibes at this exclusive night-golf exhibition, featuring glowing fairways, local DJ sets, and premium hospitality.",
//     venue: "Black Mountain, Thailand",
//     date: "28th April 2026",
//     purse: "18,000",
//     winner: "Elena Rostova",
//   },

//   {
//     image: "/pastevent2.jpg",
//     title: "Road To Morocco Limuru",
//     description:
//       "Compete on East Africa’s premier championship course where the fairways meet the wild. Includes an exclusive post-round bush dinner safari.",
//     venue: "Vipingo Ridge, Kenya",
//     date: "15th June 2026",
//     purse: "30,000",
//     winner: "Julian Sterling",
//   },
// ];

// export default function PastEvents() {
//   const [selectedTournament, setSelectedTournament] =
//     useState<Tournament | null>(null);

//   return (
//     <section className="min-h-screen rounded-4xl m-2 py-10 sm:py-16 px-4 sm:px-6 lg:px-12 bg-gray-200 text-zinc-100 font-sans transition-colors duration-300">
//       <div className="max-w-7xl mx-auto text-center mb-10 sm:mb-16">
//         <div className="flex items-center justify-center space-x-2 mb-2">
//           <span className="text-[10px] sm:text-xs tracking-widest font-semibold uppercase text-[#0a4d30] ">
//             Archive Showcase
//           </span>
//         </div>
//         <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-black">
//           Past Golf Experiences
//         </h1>
//         <div className="w-16 h-0.5 bg-linear-to-r from-transparent via-[#D4AF37] to-transparent mx-auto my-4" />
//         <p className="text-xs sm:text-sm text-zinc-700 max-w-2xl mx-auto px-4 leading-relaxed">
//           Relive the moments of prestige, elite play, and world-class leisure
//           from our past championship destinations.
//         </p>
//       </div>

//       <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:flex xl:grid-cols-4 gap-6 sm:gap-8">
//         {TOURNAMENTS.map((item, index) => (
//           <article
//             key={`${item.title}-${index}`}
//             className="group relative flex flex-col justify-between rounded-2xl bg-[oklch(.075_0_0)]  border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 transition-all duration-500 overflow-hidden shadow-2xl hover:shadow-[#D4AF37]/10 hover:-translate-y-1.5 backdrop-blur-sm"
//           >
//             <div>
//               <div className="relative aspect-4/3 w-full overflow-hidden dark:bg-[oklch(.075_0_0)]">
//                 <img
//                   src={item.image}
//                   alt={item.title}
//                   className="w-full h-90 object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
//                 />
//                 <div className="absolute inset-0 bg-linear-to-t from-zinc-900 via-transparent to-black/30" />

//                 {/*  <div className="absolute top-3 right-3 bg-zinc-950/80 border border-[#D4AF37]/40 px-2.5 py-1 rounded-full backdrop-blur-md flex items-center space-x-1.5">
//                   <CurrencyDollarIcon className="w-3.5 h-3.5 text-[#D4AF37]" />
//                    <span className="text-[11px] font-semibold text-zinc-200">
//                     {item.purse} USD
//                   </span>

//                 </div>

//                 {item.winner && (
//                   <div className="absolute bottom-3 left-3 bg-zinc-900/90 border border-zinc-700/60 px-2.5 py-1 rounded-lg backdrop-blur-md flex items-center space-x-1.5 text-xs text-zinc-300">
//                     <TrophyIcon className="w-3.5 h-3.5 text-[#D4AF37]" />
//                     <span className="text-[10px] tracking-wide uppercase text-zinc-400">
//                       Winner:
//                     </span>
//                     <span className="font-semibold text-white">
//                       {item.winner}
//                     </span>
//                   </div>
//                 )}
//                   */}
//               </div>

//               <div className="p-5 sm:p-6 space-y-4">
//                 <h2 className="text-xl font-serif font-bold text-white group-hover:text-[#D4AF37] transition-colors duration-300">
//                   {item.title}
//                 </h2>

//                 <div className="space-y-2 text-xs text-zinc-400 border-y border-zinc-800/80 py-3">
//                   <div className="flex items-center space-x-2">
//                     <MapPinIcon className="w-4 h-4 text-green-400 shrink-0" />
//                     <span className="truncate">{item.venue}</span>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <CalendarIcon className="w-4 h-4 text-green-400 shrink-0" />
//                     <span>{item.date}</span>
//                   </div>
//                 </div>

//                 <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
//                   {item.description}
//                 </p>
//               </div>
//             </div>

//             <div className="p-5 sm:p-6 pt-0">
//               <button
//                 onClick={() => setSelectedTournament(item)}
//                 className="w-full py-2.5 px-4 rounded-xl bg-white text-green-900 font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all duration-300 hover:brightness-110 active:scale-98 shadow-lg shadow-[#D4AF37]/20"
//               >
//                 <span>Explore Details</span>
//                 <ArrowRightIcon className="w-3.5 h-3.5 stroke-[2.5]" />
//               </button>
//             </div>
//           </article>
//         ))}
//       </div>

//       {selectedTournament && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
//           <div className="relative w-full max-w-lg rounded-2xl bg-zinc-900 border border-[#D4AF37]/40 p-6 sm:p-8 shadow-2xl">
//             <h3 className="text-2xl font-serif font-bold text-white mb-2">
//               {selectedTournament.title}
//             </h3>
//             <p className="text-xs text-[#D4AF37] mb-4 font-semibold uppercase tracking-wider">
//               {selectedTournament.venue} — {selectedTournament.date}
//             </p>
//             <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
//               {selectedTournament.description}
//             </p>
//             <div className="flex justify-end">
//               <button
//                 onClick={() => setSelectedTournament(null)}
//                 className="px-5 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-white transition-colors"
//               >
//                 Close Showcase
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }

import {
  CalendarIcon,
  MapPinIcon,
  TrophyIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
//import { TrophyIcon as TrophyIconSolid } from "@heroicons/react/24/solid";

export interface PastTournament {
  id: string;
  title: string;
  venue: string;
  date: string;
  image: string;
  href?: string;
}

interface PastGolfTournamentsProps {
  tournaments?: PastTournament[];
  eyebrow?: string;
  heading?: string;
  description?: string;
  priorityCount?: number;
  viewAllHref?: string;
  className?: string;
}

const DEFAULT_TOURNAMENTS: PastTournament[] = [
  {
    id: "road-to-morroco",
    title: "Road to Morocco",
    venue: "Limuru",
    date: "17th April 2026",
    image: "https://golfnvibes.com/uploads/media/images/Gallery/holidays/road_to_morocco.webp",
  },
  {
    id: "naivasha-weekender",
    title: "Naivasha Weekender",
    venue: "Great Rift Valley Lodge & Kipipiri",
    date: "24th - 25th October 2025",
    
    image: "https://golfnvibes.com/uploads/media/images/Gallery/holidays/naivasha_weekender.webp",
  },
  {
    id: "road-antalya",
    title: "Road to Antalya",
    venue: "Sigona Golf Club",
    date: "October 2025",
    image: "https://golfnvibes.com/uploads/media/images/Gallery/holidays/road_to_antalya.webp",
  },
];

function TournamentCard({
  tournament,
  priority,
}: {
  tournament: PastTournament;
  priority: boolean;
}) {
  const CardTag = tournament.href ? "a" : "div";

  return (
    <CardTag
      {...(tournament.href ? { href: tournament.href } : {})}
      className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
    >
      <div className="relative aspect-4/3 w-full overflow-hidden bg-zinc-200">
        <img
          src={tournament.image}
          alt={`${tournament.title} at ${tournament.venue}`}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent"
        />
        {/* <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-black shadow-md backdrop-blur-sm">
          <TrophyIconSolid className="h-3.5 w-3.5 text-black" />
          {tournament.champion}
        </div> */}
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="text-sm sm:text-base font-bold tracking-tight text-black leading-snug">
          {tournament.title}
        </h3>

        <div className="mt-2 flex flex-col gap-1 text-xs text-zinc-500">
          <span className="flex items-center gap-1.5">
            <MapPinIcon className="h-3.5 w-3.5 shrink-0 text-zinc-400" />
            {tournament.venue}
          </span>
          <span className="flex items-center gap-1.5">
            <CalendarIcon className="h-3.5 w-3.5 shrink-0 text-zinc-400" />
            {tournament.date}
          </span>
        </div>

        {/* <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-3 text-xs">
          <div>
            <p className="text-[10px] uppercase tracking-wide text-zinc-400">
              Format
            </p>
            <p className="mt-0.5 font-semibold text-black">
              {tournament.format}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-wide text-zinc-400">
              Field Size
            </p>
            <p className="mt-0.5 font-semibold text-black">
              {tournament.fieldSize} players
            </p>
          </div>
        </div> */}

        {tournament.href && (
          <span className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-black transition-transform duration-300 group-hover:translate-x-1">
            View Results
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </span>
        )}
      </div>
    </CardTag>
  );
}

export default function PastGolfTournaments({
  tournaments = DEFAULT_TOURNAMENTS,
  eyebrow = "On The Record",
  heading = "Past Golf Tournaments",
  description = "Results, champions, and highlights from the competitions we've hosted across our global calendar.",
  priorityCount = 2,
  viewAllHref = "",
  className = "",
}: PastGolfTournamentsProps) {
  return (
    <section
      className={`rounded-3xl sm:rounded-4xl m-2 sm:m-4 bg-zinc-50 px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20 border border-zinc-200 ${className}`}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 sm:mb-14 flex flex-col items-center text-center gap-3 sm:gap-4">
          <span className="flex items-center gap-2 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
            <TrophyIcon className="h-3.5 w-3.5" />
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

        {tournaments.length === 0 ? (
          <p className="text-center text-sm text-zinc-500 py-16">
            No past tournaments to show yet — check back soon.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 sm:gap-6">
            {tournaments.map((tournament, i) => (
              <TournamentCard
                key={tournament.id}
                tournament={tournament}
                priority={i < priorityCount}
              />
            ))}
          </div>
        )}

        {viewAllHref && (
          <div className="mt-10 sm:mt-14 flex justify-center">
            <a
              href={viewAllHref}
              className="inline-flex items-center gap-2 rounded-full border border-black bg-black px-7 py-3 text-xs sm:text-sm font-semibold uppercase tracking-widest text-white transition-colors duration-300 hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
            >
              View Tournament Results
              <ArrowRightIcon className="h-4 w-4" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
