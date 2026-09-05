import { Button } from "flowbite-react";

export default function EventHero() {
  return (
    <div className="relative w-full min-h-125 overflow-hidden bg-cover bg-center bg-no-repeat bg-[url('https://golfnvibes.com/uploads/media/images/golfnvibesgroup3.jpg')]">
      <div className="absolute inset-0 bg-black/50" />
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]" />
      <div className="relative z-10 mx-auto max-w-4xl px-4 py-20 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
        <div className="text-center">
          <h1 className="text-balance text-4xl mt-8 font-extralight tracking-tight text-white sm:text-6xl lg:text-7xl">
            Good Golf, Great Company
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-base text-gray-300 sm:text-lg">
            Book Your Next Event Or Secure Your Spot In Our Upcoming Event
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            <Button
              href="#event-calendar"
              size="lg"
              className="w-full sm:w-auto bg-[#bd982e]! cursor-pointer hover:bg-white/30! hover:text-[#bd982e]! focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Event Calendar
            </Button>
            <Button
              href="/GolfHolidays/PlanMyTrip"
              size="lg"
              className="w-full sm:w-auto bg-transparent! border cursor-pointer focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Customize Your Trip
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
