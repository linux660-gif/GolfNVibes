import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function AboutHero() {
  return (
    <div className="relative h-[70dvh] min-h-100 max-h-150 w-full overflow-hidden bg-black sm:h-[80dvh] lg:h-[85dvh]">
      <div className="relative h-full w-full">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
          preload="auto"
          poster="https://golfnvibes.com/uploads/media/images/about_hero_poster.jpg"
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

        <div className="relative z-20 flex h-full w-full items-center justify-center px-6 text-center text-white sm:px-12 lg:px-24">
          <div className="flex w-full max-w-4xl flex-col items-center justify-center gap-5">
            <h1 className="text-3xl font-light tracking-tight text-zinc-100 sm:text-5xl lg:text-6xl">
              The New Wave Of Golf
            </h1>

            <p className="max-w-2xl text-sm leading-relaxed text-gray-200 sm:text-base md:text-lg">
              Whether you're hunting birdies or hanging out at the clubhouse,
              we build premium apparel, curate unforgettable events, and bring
              golfers together.
            </p>

            <div className="flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row sm:gap-6">
              <a
                href="#our-story"
                className="flex w-full cursor-pointer items-center justify-center space-x-2 rounded-xl bg-[#bd982e] px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-black shadow-lg shadow-[#D4AF37]/20 transition-all duration-300 hover:brightness-110 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:w-auto"
              >
                <span>Learn More</span>
                <ArrowRightIcon className="h-4 w-4 stroke-[2.5]" />
              </a>

              <a
                href="/ContactUs"
                className="flex w-full cursor-pointer items-center justify-center space-x-2 rounded-xl border border-white bg-transparent px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-white shadow-lg shadow-[#D4AF37]/20 transition-all duration-300 hover:brightness-110 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:w-auto"
              >
                <span>Contact Us</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
