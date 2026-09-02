import { Button } from "flowbite-react";
import { ArrowUpRight } from "lucide-react";
import Typewriter from "typewriter-effect";

export default function GNVHero() {
  return (
    <div className="relative w-full h-[70dvh] sm:h-[80dvh] lg:h-[85dvh] min-h-125 max-h-225 overflow-hidden bg-black">
      <div className="relative w-full h-full">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          preload="auto"
          playsInline
          disablePictureInPicture
          poster="/home_poster_hero.jpg"
          aria-hidden="true"
        >
          <source
            src="https://golfnvibes.com/uploads/media/videos/hero.webm"
            type="video/webm"
          />
          <source
            src="https://golfnvibes.com/uploads/media/videos/hero.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-6 sm:px-12 md:px-16 lg:px-24 pb-20 sm:pb-24 lg:pb-32 select-none z-20">
          <h1 className="flex flex-col items-center text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-wider leading-tight text-center">
            <span className="pt-20">Where Golf, Travel &</span>
            <span className="mb-3 sm:mb-4 animate-fade-in-down lg:flex">
              <Typewriter
                options={{
                  strings: [
                    "Community  Meet",
                    "Luxury  Meet",
                    "Leisure  Meet",
                    "Culture  Meet",
                    "Passion  Meet",
                  ],
                  autoStart: true,
                  loop: true,
                  cursor: '<span style="color: #046307;">_</span>',
                }}
              />
            </span>
          </h1>
          <p className="max-w-xl text-center text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed lg:line-clamp-3 line-clamp-none">
            Experience world-class golf holidays, unforgettable tournaments and
            a vibrant community of golfers who share your passion for the game.
          </p>
          <div className="pt-6 sm:pt-8 flex flex-wrap gap-4 sm:gap-6">
            <Button
              href="/GolfHolidays/PlanMyTrip"
              className="bg-white! flex gap-2 h-12 w-full font-semibold text-base text-black cursor-pointer rounded-2xl lg:w-45 mt-1 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Plan My Trip
              <ArrowUpRight color="black" size={20} />
            </Button>
            <Button
              href="/Club"
              className="bg-transparent! flex gap-2 h-12 font-semibold text-base text-white border cursor-pointer rounded-2xl lg:w-45 w-full mt-1 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Apply Membership
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
