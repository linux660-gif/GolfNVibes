import { useState } from "react";
import {
  MapPinIcon,
  CalendarIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

interface Tournament {
  image: string;
  title: string;
  description: string;
  venue: string;
  date: string;
  purse: string;
  winner?: string;
}

const TOURNAMENTS: Tournament[] = [
  {
    image: "/pastevent3.jpg",
    title: "Road To Turkey Sigona",
    description:
      "A high-stakes weekend shootout under the Moroccan sun, blending fierce tournament play with evening desert oasis parties and live percussion.",
    venue: "Mazagan Golf Club, Morocco",
    date: "12th March 2026",
    purse: "25,000",
    winner: "Marcus Vance",
  },
  {
    image: "/pastevent1.jpg",
    title: "Naivasha Weekender",
    description:
      "Catch the ultimate tropical vibes at this exclusive night-golf exhibition, featuring glowing fairways, local DJ sets, and premium hospitality.",
    venue: "Black Mountain, Thailand",
    date: "28th April 2026",
    purse: "18,000",
    winner: "Elena Rostova",
  },

  {
    image: "/pastevent2.jpg",
    title: "Road To Morocco Limuru",
    description:
      "Compete on East Africa’s premier championship course where the fairways meet the wild. Includes an exclusive post-round bush dinner safari.",
    venue: "Vipingo Ridge, Kenya",
    date: "15th June 2026",
    purse: "30,000",
    winner: "Julian Sterling",
  },
];

export default function PastEvents() {
  const [selectedTournament, setSelectedTournament] =
    useState<Tournament | null>(null);

  return (
    <section className="min-h-screen rounded-4xl m-2 py-10 sm:py-16 px-4 sm:px-6 lg:px-12 bg-gray-200 text-zinc-100 font-sans transition-colors duration-300">
      <div className="max-w-7xl mx-auto text-center mb-10 sm:mb-16">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <span className="text-[10px] sm:text-xs tracking-widest font-semibold uppercase text-[#0a4d30] ">
            Archive Showcase
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-black">
          Past Golf Experiences
        </h1>
        <div className="w-16 h-0.5 bg-linear-to-r from-transparent via-[#D4AF37] to-transparent mx-auto my-4" />
        <p className="text-xs sm:text-sm text-zinc-700 max-w-2xl mx-auto px-4 leading-relaxed">
          Relive the moments of prestige, elite play, and world-class leisure
          from our past championship destinations.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:flex xl:grid-cols-4 gap-6 sm:gap-8">
        {TOURNAMENTS.map((item, index) => (
          <article
            key={`${item.title}-${index}`}
            className="group relative flex flex-col justify-between rounded-2xl bg-[oklch(.075_0_0)]  border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 transition-all duration-500 overflow-hidden shadow-2xl hover:shadow-[#D4AF37]/10 hover:-translate-y-1.5 backdrop-blur-sm"
          >
            <div>
              <div className="relative aspect-4/3 w-full overflow-hidden dark:bg-[oklch(.075_0_0)]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-90 object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-linear-to-t from-zinc-900 via-transparent to-black/30" />

                {/*  <div className="absolute top-3 right-3 bg-zinc-950/80 border border-[#D4AF37]/40 px-2.5 py-1 rounded-full backdrop-blur-md flex items-center space-x-1.5">
                  <CurrencyDollarIcon className="w-3.5 h-3.5 text-[#D4AF37]" />
                   <span className="text-[11px] font-semibold text-zinc-200">
                    {item.purse} USD
                  </span>
                 
                </div>
                 

                {item.winner && (
                  <div className="absolute bottom-3 left-3 bg-zinc-900/90 border border-zinc-700/60 px-2.5 py-1 rounded-lg backdrop-blur-md flex items-center space-x-1.5 text-xs text-zinc-300">
                    <TrophyIcon className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span className="text-[10px] tracking-wide uppercase text-zinc-400">
                      Winner:
                    </span>
                    <span className="font-semibold text-white">
                      {item.winner}
                    </span>
                  </div>
                )}
                  */}
              </div>

              <div className="p-5 sm:p-6 space-y-4">
                <h2 className="text-xl font-serif font-bold text-white group-hover:text-[#D4AF37] transition-colors duration-300">
                  {item.title}
                </h2>

                <div className="space-y-2 text-xs text-zinc-400 border-y border-zinc-800/80 py-3">
                  <div className="flex items-center space-x-2">
                    <MapPinIcon className="w-4 h-4 text-green-400 shrink-0" />
                    <span className="truncate">{item.venue}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CalendarIcon className="w-4 h-4 text-green-400 shrink-0" />
                    <span>{item.date}</span>
                  </div>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
                  {item.description}
                </p>
              </div>
            </div>

            <div className="p-5 sm:p-6 pt-0">
              <button
                onClick={() => setSelectedTournament(item)}
                className="w-full py-2.5 px-4 rounded-xl bg-white text-green-900 font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all duration-300 hover:brightness-110 active:scale-98 shadow-lg shadow-[#D4AF37]/20"
              >
                <span>Explore Details</span>
                <ArrowRightIcon className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>
          </article>
        ))}
      </div>

      {selectedTournament && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-2xl bg-zinc-900 border border-[#D4AF37]/40 p-6 sm:p-8 shadow-2xl">
            <h3 className="text-2xl font-serif font-bold text-white mb-2">
              {selectedTournament.title}
            </h3>
            <p className="text-xs text-[#D4AF37] mb-4 font-semibold uppercase tracking-wider">
              {selectedTournament.venue} — {selectedTournament.date}
            </p>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
              {selectedTournament.description}
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setSelectedTournament(null)}
                className="px-5 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-white transition-colors"
              >
                Close Showcase
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
