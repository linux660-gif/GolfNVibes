import {
  BuildingOffice2Icon,
  TrophyIcon,
  GlobeAltIcon,
  PaperAirplaneIcon,
  StarIcon,
} from "@heroicons/react/24/outline";

interface PartnerCategory {
  name: string;
  slug: string;
  count: string;
  icon: typeof StarIcon;
}

const CATEGORIES: PartnerCategory[] = [
  { name: "Sponsors", slug: "sponsors", count: "12 Global Brands", icon: StarIcon },
  {
    name: "Hotels & Resorts",
    slug: "hotels-resorts",
    count: "45+ Luxury Properties",
    icon: BuildingOffice2Icon,
  },
  {
    name: "Golf Clubs",
    slug: "golf-clubs",
    count: "30+ Championship Courses",
    icon: TrophyIcon,
  },
  {
    name: "Tours & Travel Agencies",
    slug: "tours-travel",
    count: "8 Regional Destinations",
    icon: GlobeAltIcon,
  },
  {
    name: "Airlines",
    slug: "airlines",
    count: "6 Premium Carriers",
    icon: PaperAirplaneIcon,
  },
];

export default function PartnerCategories() {
  return (
    <section className="rounded-4xl m-5 py-16 px-4 sm:px-6 lg:px-12 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#0a4d30] mb-4">
              Explore Our Network
            </h2>
            <p className="text-gray-600 text-base leading-relaxed">
              Discover our exclusive directory of global sponsors,
              championship golf courses, luxury accommodations, and premium
              travel partners dedicated to elevating your experience.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <a
                key={cat.slug}
                href={`#${cat.slug}`}
                className="flex flex-col justify-center p-6 hover:scale-105 shadow-sm hover:shadow-xl min-h-56 rounded-2xl border bg-white border-transparent hover:border-[#D4AF37]/50 transition-all duration-300 cursor-pointer space-y-4 focus-visible:ring-2 focus-visible:ring-[#0a4d30] focus-visible:outline-none"
              >
                <div className="bg-gray-50 w-12 h-12 rounded-full flex items-center justify-center">
                  <Icon className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <div>
                  <h3 className="text-lg font-serif font-bold text-[#0a4d30] mb-1">
                    {cat.name}
                  </h3>
                  <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    {cat.count}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}