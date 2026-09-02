export default function ClubHero() {
  return (
    <div className="relative flex min-h-150 w-full items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat bg-[url('https://golfnvibes.com/uploads/media/images/GalleryImage2.JPG')] lg:min-h-[660px]">
      <div className="absolute inset-0 bg-black/50" />

      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]" />

      <div className="relative z-10 flex w-full items-center justify-center px-6 py-16 sm:px-12 lg:px-24">
        <div className="flex w-full max-w-4xl flex-col items-center justify-center text-center">
          <div className="mb-6 flex items-center justify-center gap-4">
            <div className="h-px w-20 bg-zinc-100 sm:w-32" />
            <span className="text-sm font-bold uppercase tracking-[0.25em] text-[#bd982e]">
              Golf Club
            </span>

            <div className="h-px w-20 bg-zinc-100 sm:w-32" />
          </div>

          <h1 className="mb-6 text-4xl font-light uppercase leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
            The Art of
            <br />
            Modern Golf
          </h1>

          <p className="mb-10 max-w-2xl text-sm font-normal leading-relaxed text-zinc-300 sm:text-base">
            Our platform blends elegant design with powerful features to bring
            players, clubs, and enthusiasts together.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#application-form"
              className="inline-flex w-full items-center justify-center space-x-3 rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white shadow-md transition-colors hover:bg-zinc-800 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:w-auto"
            >
              <span>Join Club</span>

              <span className="rounded-full bg-zinc-700/60 p-1">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3.5 w-3.5 text-white"
                  aria-hidden="true"
                >
                  <path d="M7 17 17 7" />
                  <path d="M7 7h10v10" />
                </svg>
              </span>
            </a>

            <a
              href="/Gallery"
              className="w-full rounded-full border border-zinc-200 bg-white px-7 py-3 text-sm font-medium text-zinc-900 shadow-md transition-colors hover:bg-zinc-100 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:w-auto"
            >
              Recent Event
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
