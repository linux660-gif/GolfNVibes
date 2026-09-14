
//import { ArrowUpRightIcon } from "@heroicons/react/24/outline";

export default function PlanTripHero() {
  return (
    <div className="relative flex min-h-150 w-full items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat bg-[url('https://golfnvibes.com/uploads/media/images/DSC07574.JPG')] lg:min-h-[700px] lg:bg-[url('https://golfnvibes.com/uploads/media/images/vipingogolfexperience.jpeg')]">
      <div className="absolute inset-0 bg-black/50" />

      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]" />

      <div className="relative z-10 flex w-full items-center justify-center px-6 py-20 sm:px-12 md:px-16 lg:px-24">
        <div className="flex w-full max-w-4xl flex-col items-center justify-center text-center">
          <div className="mb-4 flex items-center justify-center gap-4">
            <div className="h-px w-20 bg-zinc-100 sm:w-32" />
            <span className="text-sm font-bold uppercase tracking-[0.25em] text-[#bd982e] lg:text-sm">
              Customize Trip
            </span>

            <div className="h-px w-20 bg-zinc-100 sm:w-32" />
          </div>

          <h1 className="mb-6 text-3xl font-light uppercase leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-5xl">
            Everything you need for
            <br />
            an exceptional golf experience
          </h1>

          <p className="mb-10 max-w-2xl text-sm font-bold leading-relaxed text-gray-300 sm:text-base">
            Our platform blends elegant design with powerful features to bring
            players, clubs, and enthusiasts together.
          </p>

          {/* <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="/Club"
              className="inline-flex items-center space-x-3 rounded-full bg-[oklch(.075_0_0)] px-6 py-3 text-sm font-medium text-white shadow-md transition-colors hover:bg-zinc-800 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <span>Join Club</span>

              <span className="rounded-full bg-zinc-700/60 p-1">
                <ArrowUpRightIcon className="h-3.5 w-3.5 text-white" />
              </span>
            </a>

            <a
              href="/Gallery"
              className="rounded-full border border-zinc-200 bg-white px-7 py-3 text-sm font-medium text-[oklch(.075_0_0)] shadow-md transition-colors hover:bg-zinc-100 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Recent Event
            </a>
          </div> */}
        </div>
      </div>
    </div>
  );
}
