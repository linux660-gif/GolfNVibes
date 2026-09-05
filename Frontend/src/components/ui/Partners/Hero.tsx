
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function PartnersHero() {
  return (
    <div className="relative flex items-center justify-center w-full min-h-125 overflow-hidden bg-cover bg-center bg-no-repeat bg-[url('https://golfnvibes.com/uploads/media/images/dsc07453.jpg')]">
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 flex w-full items-center justify-center px-6 py-20 sm:px-12 md:px-16 lg:px-24">
        <div className="flex w-full max-w-4xl flex-col items-center justify-center gap-6 text-center">
          <h1 className="py-3 text-3xl font-light tracking-tight text-white sm:text-5xl lg:text-6xl">
            Our Valued Partners & Sponsors
          </h1>

          <p className="max-w-2xl text-base font-light leading-relaxed text-white md:text-lg">
            We collaborate with world-class golf clubs, luxury resorts,
            commercial airlines, and tourism boards to deliver unmatched luxury
            experiences.
          </p>

          <div className="flex items-center justify-center gap-4 pt-2">
            <a
              href="#partner-inquiry"
              className="flex w-auto items-center justify-center space-x-2 rounded-xl bg-white px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-black shadow-lg shadow-[#D4AF37]/20 transition-all duration-300 hover:brightness-110 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <span>Apply Partnership</span>
              <ArrowRightIcon className="h-4 w-4 stroke-[2.5]" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
