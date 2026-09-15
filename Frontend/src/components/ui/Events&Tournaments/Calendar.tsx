import { useState } from "react";
import {
  EllipsisHorizontalIcon,
  CalendarIcon,
  MapPinIcon,
  FlagIcon,
  UserGroupIcon,
  PlusIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface GolfEvent {
  id: string;
  title: string;
  host: string;
  avatar: string;
  dateTime: string;
  course: string;
  spotsLeft: number;
}

const GOLF_EVENTS: GolfEvent[] = [
  {
    id: "1",
    title: "Phuket TakeOver 2026",
    host: "Phuket, Thailand",
    avatar: "https://golfnvibes.com/uploads/media/images/galleryimage2.jpg",
    dateTime: "21st October - 28th October 2026",
    course: "Laguna Golf Phuket",
    spotsLeft: 0,
  },
  {
    id: "2",
    title: "Mediterranean Swing(Portugal.Marbella.Mallorca)",
    host: "",
    avatar: "https://golfnvibes.com/uploads/media/images/galleryimage10.jpg",
    dateTime: "17th September - 26th September 2027",
    course: "Coming Soon",
    spotsLeft: 45,
  },

   {
    id: "3",
    title: "Turkey Golf Escape 22-29 April",
    host: "",
    avatar: "https://golfnvibes.com/uploads/media/images/GalleryImage3.JPG",
    dateTime: "22nd April - 29th April 2027",
    course: "Coming Soon",
    spotsLeft: 45,
  },
];

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

function AvailabilityBadge({ spotsLeft }: { spotsLeft: number }) {
  if (spotsLeft === 0) {
    return (
      <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-red-600 bg-red-50 border border-red-200 px-3 py-1 rounded-full">
        <XCircleIcon className="w-3.5 h-3.5" />
        No Spots Left
      </span>
    );
  }

  if (spotsLeft <= 2) {
    return (
      <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
        <UserGroupIcon className="w-3.5 h-3.5" />
        {spotsLeft} {spotsLeft === 1 ? "spot" : "spots"} left
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#0a4d30] bg-[#0a4d30]/10 border border-[#0a4d30]/20 px-3 py-1 rounded-full">
      <UserGroupIcon className="w-3.5 h-3.5" />
      Coming Soon
    </span>
  );
}

export default function EventCalendar({ id }: { id?: string }) {
  const [value, onChange] = useState<Value>(new Date());
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  return (
    <div id={id} className="p-3 sm:p-6 lg:p-12 font-sans">
      <div className="max-w-7xl mx-auto text-center mb-8 sm:mb-12">
        <h2 className="mt-1 text-2xl sm:text-4xl font-serif font-bold tracking-tight text-black">
          Events Calendar
        </h2>
        <div className="w-12 sm:w-16 h-0.5 bg-[#D4AF37] mx-auto my-2 sm:my-3" />
        <p className="text-xs sm:text-sm text-zinc-700 max-w-xl mx-auto px-2">
          Discover executive scrambles, match play challenges, and elite range
          sessions.
        </p>
      </div>

      <div className="max-w-7xl mx-auto border border-[#D4AF37]/25 rounded-xl sm:rounded-2xl shadow-2xl bg-white p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          <div className="lg:col-span-7 flex flex-col space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-[#D4AF37]/10 rounded-xl border border-[#D4AF37]/30 text-[#D4AF37]">
                  <FlagIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-serif font-bold text-black tracking-wide flex items-center gap-2">
                    Exclusive{" "}
                    <span className="text-[#0a4d30] text-xs font-sans font-semibold px-2.5 py-0.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30">
                      Fixtures
                    </span>
                  </h3>
                  <p className="text-xs text-zinc-500">
                    Curated tee times and social rounds
                  </p>
                </div>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {GOLF_EVENTS.map((event) => {
                const isSoldOut = event.spotsLeft === 0;
                return (
                  <div
                    key={event.id}
                    className={`py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group ${
                      isSoldOut ? "" : ""
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <img
                        src={event.avatar}
                        alt={`${event.host} event photo`}
                        loading="lazy"
                        decoding="async"
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-full object-cover border-2 border-[#D4AF37]/40 shadow-md shrink-0"
                      />

                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold text-black group-hover:text-[#bd982e] transition-colors">
                          {event.title}
                        </h4>
                        <p className="text-xs text-zinc-600">
                          Host:{" "}
                          <span className="text-zinc-700 font-medium">
                            {event.host}
                          </span>
                        </p>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs pt-1">
                          <div className="flex items-center space-x-1.5 text-black">
                            <CalendarIcon className="w-3.5 h-3.5 text-[#D4AF37]" />
                            <span>{event.dateTime}</span>
                          </div>
                          <div className="flex items-center space-x-1.5 text-zinc-700">
                            <MapPinIcon className="w-3.5 h-3.5 text-[#D4AF37]" />
                            <span>{event.course}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100 relative">
                      <AvailabilityBadge spotsLeft={event.spotsLeft} />

                      <button
                        type="button"
                        aria-label={`More options for ${event.title}`}
                        aria-haspopup="menu"
                        aria-expanded={openMenuId === event.id}
                        onClick={() =>
                          setOpenMenuId(
                            openMenuId === event.id ? null : event.id,
                          )
                        }
                        className="text-black hover:text-[#bd982e] transition-colors p-2 rounded-xl hover:bg-gray-100"
                      >
                        <EllipsisHorizontalIcon className="w-10 h-6" />
                      </button>

                      {openMenuId === event.id && (
                        <div
                          role="menu"
                          className="absolute right-0 top-full mt-1 w-40 rounded-xl border border-gray-200 bg-white shadow-lg py-1 z-20"
                        >
                          <a
                            role="menuitem"
                            href={`#`}
                            className="block px-4 py-2 text-xs text-zinc-700 hover:bg-gray-50"
                          >
                            Book
                          </a>

                          <a
                            role="menuitem"
                            href="#"
                            className="block px-4 py-2 text-xs text-zinc-700 hover:bg-gray-50"
                          >
                            Set Reminder
                          </a>

                          <a
                            role="menuitem"
                            href="/ContactUs"
                            className="block px-4 py-2 text-xs text-zinc-700 hover:bg-gray-50"
                          >
                            Inquire
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col space-y-6 pt-6 lg:pt-0 lg:pl-8 lg:border-l lg:border-gray-200">
            <div className="gnv-calendar">
              <Calendar onChange={onChange} value={value} />
            </div>

            <a
              href="/ContactUs"
              className="w-full py-3 px-6 rounded-xl bg-linear-to-r from-[#D4AF37] to-[#B89028] text-zinc-950 font-bold text-xs uppercase tracking-widest flex items-center justify-center space-x-2 transition-all duration-300 hover:brightness-110 active:scale-95 shadow-lg shadow-[#D4AF37]/20 focus-visible:ring-2 focus-visible:ring-[#0a4d30] focus-visible:ring-offset-2"
            >
              <PlusIcon className="w-4 h-4 stroke-3" />
              <span>Inquire / Host Round</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}