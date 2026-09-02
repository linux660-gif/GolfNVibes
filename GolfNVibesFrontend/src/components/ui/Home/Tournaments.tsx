import { Button } from "flowbite-react";
import { ArrowUpRight } from "lucide-react";

export default function Tournament() {
  return (
    <div className="relative rounded-3xl sm:rounded-4xl m-2 sm:m-4 min-h-95 sm:min-h-105 md:min-h-115 overflow-hidden flex items-center bg-gray-800">
      <img
        src="https://golfnvibes.com/uploads/media/images/home_tournament.jpg"
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/60 to-transparent z-0" />

      <div className="relative z-10 p-6 sm:p-10 md:p-14 lg:p-16 max-w-xl md:max-w-2xl w-full">
        <div className="flex flex-col gap-3 sm:gap-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight capitalize text-white leading-tight">
            READY TO PLAY?
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed">
            With Our Golf Tournaments you have access to unlimited golf games
            like Longest drive, closet to the pin and Much More! There is
            something for all ages to enjoy.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <Button
              href="/Tournaments"
              size="lg"
              className="w-full sm:w-auto bg-[#046307]! flex items-center justify-center gap-2 cursor-pointer hover:opacity-90 transition-opacity focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Our Tournaments
              <ArrowUpRight size={22} className="ml-1 shrink-0" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
