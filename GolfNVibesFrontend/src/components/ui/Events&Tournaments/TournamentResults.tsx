import { useState } from "react";
import {
  TrophyIcon,
  ChevronRightIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  FlagIcon,
  CalendarIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

interface LeaderboardEntry {
  rank: number | string;
  player: string;
  country: string;
  flagCode: string;
  totalScore: string;
  parScore: number;
  rounds: number[];
  thru: string;
  status: "Active" | "Finished" | "Cut";
}

interface Tournament {
  id: string;
  name: string;
  course: string;
  location: string;
  dates: string;
  par: number;
  purse: string;
  leaderboard: LeaderboardEntry[];
}

const TOURNAMENTS_DATA: Tournament[] = [
  {
    id: "masters-2026",
    name: "The Invitational Masters",
    course: "Augusta National Golf Club",
    location: "Augusta, Georgia, USA",
    dates: "Apr 9 - Apr 12",
    par: 72,
    purse: "$18,000,000",
    leaderboard: [
      {
        rank: 1,
        player: "Jon Rahm",
        country: "Spain",
        flagCode: "ES",
        totalScore: "272",
        parScore: -16,
        rounds: [68, 67, 69, 68],
        thru: "F",
        status: "Finished",
      },
      {
        rank: 2,
        player: "Scottie Scheffler",
        country: "USA",
        flagCode: "US",
        totalScore: "274",
        parScore: -14,
        rounds: [67, 70, 68, 69],
        thru: "F",
        status: "Finished",
      },
      {
        rank: 3,
        player: "Rory McIlroy",
        country: "Northern Ireland",
        flagCode: "GB",
        totalScore: "276",
        parScore: -12,
        rounds: [71, 68, 68, 69],
        thru: "F",
        status: "Finished",
      },
      {
        rank: 4,
        player: "Viktor Hovland",
        country: "Norway",
        flagCode: "NO",
        totalScore: "278",
        parScore: -10,
        rounds: [70, 69, 70, 69],
        thru: "F",
        status: "Finished",
      },
      {
        rank: 5,
        player: "Ludvig Åberg",
        country: "Sweden",
        flagCode: "SE",
        totalScore: "280",
        parScore: -8,
        rounds: [72, 68, 71, 69],
        thru: "F",
        status: "Finished",
      },
      {
        rank: 6,
        player: "Brooks Koepka",
        country: "USA",
        flagCode: "US",
        totalScore: "281",
        parScore: -7,
        rounds: [69, 71, 71, 70],
        thru: "F",
        status: "Finished",
      },
      {
        rank: 7,
        player: "Hideki Matsuyama",
        country: "Japan",
        flagCode: "JP",
        totalScore: "282",
        parScore: -6,
        rounds: [73, 67, 72, 70],
        thru: "F",
        status: "Finished",
      },
      {
        rank: "CUT",
        player: "Sergio Garcia",
        country: "Spain",
        flagCode: "ES",
        totalScore: "147",
        parScore: +3,
        rounds: [74, 73],
        thru: "CUT",
        status: "Cut",
      },
    ],
  },
  {
    id: "open-2026",
    name: "The Championship Open",
    course: "St Andrews Links",
    location: "Fife, Scotland",
    dates: "Jul 16 - Jul 19",
    par: 72,
    purse: "$16,500,000",
    leaderboard: [
      {
        rank: 1,
        player: "Tommy Fleetwood",
        country: "England",
        flagCode: "GB",
        totalScore: "201",
        parScore: -15,
        rounds: [66, 67, 68],
        thru: "16",
        status: "Active",
      },
      {
        rank: 2,
        player: "Collin Morikawa",
        country: "USA",
        flagCode: "US",
        totalScore: "203",
        parScore: -13,
        rounds: [68, 67, 68],
        thru: "15",
        status: "Active",
      },
      {
        rank: 3,
        player: "Shane Lowry",
        country: "Ireland",
        flagCode: "IE",
        totalScore: "205",
        parScore: -11,
        rounds: [67, 70, 68],
        thru: "17",
        status: "Active",
      },
      {
        rank: 4,
        player: "Xander Schauffele",
        country: "USA",
        flagCode: "US",
        totalScore: "206",
        parScore: -10,
        rounds: [70, 68, 68],
        thru: "F",
        status: "Active",
      },
    ],
  },
];

export default function TournamentResults() {
  const [selectedTournament, setSelectedTournament] = useState<Tournament>(
    TOURNAMENTS_DATA[0],
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedPlayer, setExpandedPlayer] = useState<string | null>(null);

  const filteredLeaderboard = selectedTournament.leaderboard.filter(
    (entry) =>
      entry.player.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.country.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen rounded-4xl py-6 sm:py-12 px-3 sm:px-6 lg:px-8 bg-white shadow-2xl m-4 text-zinc-900  font-sans transition-colors duration-300">
      <div className="max-w-5xl mx-auto text-center mb-6 sm:mb-10">
        <span className="text-[10px] sm:text-xs tracking-widest font-semibold uppercase text-black">
          Golf n Vibes
        </span>
      <h1 className="mt-1 text-2xl sm:text-4xl font-serif font-bold tracking-tight text-zinc-900">
          Championship Results
        </h1>
        <div className="w-12 sm:w-16 h-0.5 bg-[#D4AF37] mx-auto my-2 sm:my-3" />
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto px-2">
          Live leaderboards and historical performance metrics from premier
          tournaments.
        </p>
      </div>

      <div className="max-w-5xl mx-auto bg-white border border-[#D4AF37]/25 rounded-xl sm:rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm">
        <div className="bg-zinc-100/80 border-b border-[#D4AF37]/20 px-4 sm:px-8 py-4 sm:py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <div className="flex items-center space-x-3">
                <select
                  value={selectedTournament.id}
                  onChange={(e) => {
                    const found = TOURNAMENTS_DATA.find(
                      (t) => t.id === e.target.value,
                    );
                    if (found) setSelectedTournament(found);
                  }}
                  className="bg-transparent font-serif text-lg sm:text-2xl font-bold text-zinc-900 focus:outline-none focus:ring-0 border-b border-[#D4AF37] pb-1 cursor-pointer"
                >
                  {TOURNAMENTS_DATA.map((t) => (
                    <option
                      key={t.id}
                      value={t.id}
                      className=" text-sm font-sans"
                    >
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-zinc-600">
                <span className="flex items-center space-x-1">
                  <MapPinIcon className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>
                    {selectedTournament.course}, {selectedTournament.location}
                  </span>
                </span>
                <span className="flex items-center space-x-1">
                  <CalendarIcon className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{selectedTournament.dates}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 border-b border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-xs">
            <MagnifyingGlassIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Search player or country..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm rounded-lg bg-zinc-50 text-zinc-900  border border-zinc-300 focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
            />
          </div>

          <div className="flex items-center space-x-2 text-xs text-zinc-500">
            <FunnelIcon className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Par: {selectedTournament.par}</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-200  bg-zinc-50/50  text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-zinc-500 ">
                <th className="py-3 px-3 sm:px-6 text-center w-12 sm:w-16">
                  Pos
                </th>
                <th className="py-3 px-3 sm:px-6">Player</th>
                <th className="py-3 px-3 sm:px-6 text-center">To Par</th>
                <th className="py-3 px-3 sm:px-6 text-center">Thru</th>
                <th className="py-3 px-3 sm:px-6 text-center hidden md:table-cell">
                  R1
                </th>
                <th className="py-3 px-3 sm:px-6 text-center hidden md:table-cell">
                  R2
                </th>
                <th className="py-3 px-3 sm:px-6 text-center hidden md:table-cell">
                  R3
                </th>
                <th className="py-3 px-3 sm:px-6 text-center hidden md:table-cell">
                  R4
                </th>
                <th className="py-3 px-3 sm:px-6 text-center">Tot</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200  text-xs sm:text-sm">
              {filteredLeaderboard.map((entry) => {
                const isWinner = entry.rank === 1;
                const isExpanded = expandedPlayer === entry.player;

                return (
                  <tr
                    key={entry.player}
                    onClick={() =>
                      setExpandedPlayer(isExpanded ? null : entry.player)
                    }
                    className={`group cursor-pointer transition-colors hover:bg-zinc-100/60 ${
                      isWinner ? "bg-[#D4AF37]/5" : ""
                    }`}
                  >
                    <td className="py-3.5 px-3 sm:px-6 text-center font-bold">
                      <span
                        className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs ${
                          isWinner
                            ? "bg-[#D4AF37] text-zinc-950 font-bold shadow-xs"
                            : "text-zinc-700"
                        }`}
                      >
                        {entry.rank}
                      </span>
                    </td>

                    <td className="py-3.5 px-3 sm:px-6">
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <img
                          src={`https://flagcdn.com/24x18/${entry.flagCode.toLowerCase()}.png`}
                          alt={entry.country}
                          className="w-4 h-3 sm:w-5 sm:h-3.5 rounded-xs object-cover border border-zinc-200"
                        />
                        <div>
                          <div className="font-semibold text-zinc-900 flex items-center space-x-1.5">
                            <span>{entry.player}</span>
                            {isWinner && (
                              <TrophyIcon className="w-3.5 h-3.5 text-[#D4AF37]" />
                            )}
                          </div>
                          <span className="text-[10px] text-zinc-500 block md:hidden">
                            Rounds: {entry.rounds.join(", ")}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-3 sm:px-6 text-center font-bold">
                      <span
                        className={
                          entry.parScore < 0
                            ? "text-red-600"
                            : entry.parScore > 0
                              ? "text-zinc-600 "
                              : "text-emerald-600"
                        }
                      >
                        {entry.parScore < 0
                          ? entry.parScore
                          : entry.parScore === 0
                            ? "E"
                            : `+${entry.parScore}`}
                      </span>
                    </td>

                    <td className="py-3.5 px-3 sm:px-6 text-center text-zinc-600 text-xs">
                      {entry.thru}
                    </td>

                    {[0, 1, 2, 3].map((idx) => (
                      <td
                        key={idx}
                        className="py-3.5 px-3 sm:px-6 text-center text-zinc-500  hidden md:table-cell text-xs"
                      >
                        {entry.rounds[idx] ?? "-"}
                      </td>
                    ))}

                    <td className="py-3.5 px-3 sm:px-6 text-center font-bold text-zinc-900">
                      <div className="flex items-center justify-center space-x-1">
                        <span>{entry.totalScore}</span>
                        <ChevronRightIcon
                          className={`w-3 h-3 text-zinc-400 transition-transform ${isExpanded ? "rotate-90" : ""}`}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="bg-zinc-100/50 dark:bg-zinc-950/40 border-t border-zinc-200 dark:border-zinc-800 px-4 sm:px-6 py-3 flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400">
          <div className="flex items-center space-x-2">
            <FlagIcon className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Official Scoring Rules Applied</span>
          </div>
          <div>Updated Real-Time</div>
        </div>
      </div>
    </div>
  );
}
