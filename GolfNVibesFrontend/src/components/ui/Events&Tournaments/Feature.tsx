export default function EventsFeature() {
  return (
    <section className="relative overflow-hidden text-black bg-white rounded-2xl sm:rounded-3xl my-6 sm:my-12 py-10 sm:py-16 md:py-20 px-5 sm:px-8 lg:px-14 mx-auto max-w-7xl shadow-2xl">
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none"
      />

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 sm:gap-14 lg:gap-16">
        <div className="w-full lg:max-w-xl text-center lg:text-left space-y-4 sm:space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gray-100 border border-[#D4AF37]/30">
            <span className="text-[11px] sm:text-xs font-semibold text-black uppercase tracking-widest">
              Why Golf N Vibes Events?
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight text-black leading-tight">
            Play bold,{" "}
            <span className="text-black italic font-normal">stay calm.</span>
          </h2>

          <div className="w-16 h-0.5 bg-linear-to-r from-[#D4AF37] to-transparent mx-auto lg:mx-0" />

          <p className="text-xs sm:text-sm md:text-base leading-relaxed text-zinc-800 font-light max-w-2xl">
            Welcome to the ultimate fusion of sport and atmosphere. At{" "}
            <span className="text-[#0a4d30] font-bold">Golf n Vibes</span>, our
            mission is to redefine the traditional golf experience by blending
            the excitement of the game with an electric, social environment.
          </p>

          <p className="text-xs sm:text-sm md:text-base leading-relaxed text-zinc-700 font-light max-w-2xl">
            Whether you are stepping up to the tee for a serene daytime round on
            a pristine fairway or diving into one of our high-energy, neon-lit
            glow-in-the-dark events under the stars, we curate experiences that
            bring people together through play, music, and community.
          </p>
        </div>

        <div className="w-full lg:w-auto flex justify-center lg:justify-end">
          <div className="relative group w-full max-w-md sm:max-w-lg lg:max-w-xl">
            <div className="absolute -inset-1 rounded-2xl sm:rounded-3xl bg-linear-to-tr from-[#D4AF37]/40 via-transparent to-[#D4AF37]/10 opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
            <div className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl aspect-16/10">
              <img
                alt="Golf n Vibes group event experience"
                src="https://golfnvibes.com/uploads/media/images/golfnvibesgroup2.jpg"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                width={2420}
                height={1430}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-linear-to-t from-zinc-950/60 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
