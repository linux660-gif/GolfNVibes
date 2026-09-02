import { StarIcon } from "@heroicons/react/24/solid";

interface MemberExperience {
  quote: string;
  author: string;
  role: string;
  rating?: number;
}

const EXPERIENCES: MemberExperience[] = [
  {
    quote:
      "Joining the Golf n Vibes Club transformed my travel experience. The private scrambles and hospitality are unmatched.",
    author: "David K.",
    role: "Founding Member",
    rating: 5,
  },
  {
    quote:
      "The concierge team handled our group's entire itinerary seamlessly. True luxury from tee-off to evening dining.",
    author: "Sarah M.",
    role: "Club Member",
    rating: 5,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div aria-hidden="true" className="flex space-x-1 text-[#D4AF37]">
      {[...Array(5)].map((_, i) => (
        <StarIcon
          key={i}
          className={`w-4 h-4 ${i < rating ? "opacity-100" : "opacity-30"}`}
        />
      ))}
    </div>
  );
}

export default function MembersExperiences() {
  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-12 bg-zinc-950 text-zinc-100 border-t border-zinc-800">
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="text-center space-y-2">
          <span className="text-[10px] sm:text-xs tracking-widest font-semibold uppercase text-[#D4AF37]">
            Testimonials
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">
            Members' Experiences
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {EXPERIENCES.map((item) => (
            <figure
              key={item.author}
              className="p-6 sm:p-8 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4"
            >
              <StarRating rating={item.rating ?? 5} />
              <blockquote className="text-xs sm:text-sm text-zinc-300 italic leading-relaxed">
                {`\u201c${item.quote}\u201d`}
              </blockquote>
              <figcaption>
                <p className="text-xs font-bold text-white not-italic">
                  {item.author}
                </p>
                <p className="text-[10px] text-[#D4AF37]">{item.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
