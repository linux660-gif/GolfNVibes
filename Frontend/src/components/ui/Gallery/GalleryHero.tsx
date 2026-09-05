interface GalleryHeroProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const CATEGORIES = [
  { id: "all", label: "All Media" },
  { id: "holidays", label: "Golf Holidays" },
  { id: "tournaments", label: "Tournaments" },
  { id: "community", label: "Community" },
  { id: "corporate", label: "Corporate Events" },
  { id: "videos", label: "Videos" },
];

export default function GalleryHero({
  activeTab,
  setActiveTab,
}: GalleryHeroProps) {
  return (
    <section className="relative w-full overflow-hidden bg-cover bg-center bg-no-repeat bg-[url('https://golfnvibes.com/uploads/media/images/golfnvibesgroup1.jpg')]">
      <div className="absolute inset-0 bg-black/50" />
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]" />
      <div className="relative grid gap-10 mx-auto max-w-4xl px-4 py-32 justify-center text-center sm:px-6 lg:px-8 lg:py-45">
        <div className="grid gap-4">
          <h1 className="text-3xl text-white sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight">
            Golf N Vibes Gallery
          </h1>

          <p className="text-sm sm:text-base text-zinc-300 max-w-2xl mx-auto font-light leading-relaxed">
            Explore moments of luxury, high-stakes competition, and vibrant
            community gatherings captured across premier global destinations.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Gallery categories"
          className="pt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                  isActive
                    ? "bg-white text-[#0a4d30] shadow-lg shadow-[#D4AF37]/20 font-bold"
                    : "bg-black text-white hover:text-[#0a4d30] border border-zinc-800 hover:border-zinc-700 hover:bg-white"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
