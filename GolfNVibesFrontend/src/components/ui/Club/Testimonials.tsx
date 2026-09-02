interface Testimonial {
  id: string;
  content: string;
  author: string;
  handle: string;
  image?: string;
  featured?: boolean;
  logo?: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "marcus",
    content:
      "Golf & Vibes completely redefined how I look at the game. Their weekend invitationals are unmatched—great music, incredible people, and a relaxed atmosphere that actually lets you enjoy every round.",
    author: "Marcus Chen",
    handle: "@marcus_swings",
  },
  {
    id: "elena",
    content:
      "Finally, a brand that gets modern golf culture. The hoodies and polos transition seamlessly from the 18th hole straight to the clubhouse lounge. The quality and fit are elite.",
    author: "Elena Rostova",
    handle: "@elena.golfs",
  },
  {
    id: "angela",
    content:
      "Joined their local community league last spring as a solo player, and now I've got a regular weekend foursome. The community they've built around the game is pure magic.",
    author: "Angela",
    handle: "@golfnvibes",
    image: "https://golfnvibes.com/uploads/media/images/Founder.jpeg",
    featured: true,
  },
  {
    id: "sarah",
    content:
      "The Sunset Scramble event was easily the best golf experience I've had all year. Ditch the rigid dress codes and old rules—this is what the future of golf looks like.",
    author: "Sarah Jenkins",
    handle: "@sarah_on_the_green",
  },
  {
    id: "tyler",
    content:
      "Their streetwear collabs sell out fast for a reason. Premium fabrics, fresh designs, and an aesthetic that feels authentic whether you shoot 72 or 102.",
    author: "Tyler Vance",
    handle: "@tvance_fairways",
  },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function Avatar({
  testimonial,
  size = "h-10 w-10",
}: {
  testimonial: Testimonial;
  size?: string;
}) {
  if (testimonial.image) {
    return (
      <img
        className={`${size} rounded-full bg-zinc-100 object-cover ring-1 ring-zinc-200`}
        src={testimonial.image}
        alt={testimonial.author}
        loading="lazy"
        decoding="async"
        width={48}
        height={48}
      />
    );
  }
  return (
    <div
      aria-hidden="true"
      className={`${size} rounded-full bg-[#0a4d30]/10 text-[#0a4d30] flex items-center justify-center font-semibold text-sm ring-1 ring-[#0a4d30]/20`}
    >
      {getInitials(testimonial.author)}
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="p-8 rounded-2xl bg-white shadow-lg ring-1 ring-zinc-200 mb-8 break-inside-avoid transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-[#D4AF37]/40">
      <blockquote className="text-zinc-600 text-sm leading-6">
        <p>{`\u201c${testimonial.content}\u201d`}</p>
      </blockquote>

      <div className="mt-6 flex items-center gap-x-4 border-t border-zinc-100 pt-4">
        <Avatar testimonial={testimonial} />
        <div>
          <div className="font-semibold text-zinc-900 text-sm">
            {testimonial.author}
          </div>
          <div className="text-zinc-500 text-sm">{testimonial.handle}</div>
        </div>
      </div>
    </div>
  );
}

function FeaturedTestimonial({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="rounded-2xl bg-[#0a4d30] shadow-2xl ring-1 ring-[#0a4d30]/20 lg:col-span-2 lg:row-span-2 border-b-4 border-[#D4AF37] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(10,77,48,0.18)]">
      <div className="p-8 lg:p-12">
        <div className="mb-8">
          <span className="inline-flex items-center rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-[#D4AF37]">
            Featured Story
          </span>
        </div>

        <blockquote className="text-white text-lg font-medium leading-8 tracking-tight sm:text-xl sm:leading-9">
          <p>{`\u201c${testimonial.content}\u201d`}</p>
        </blockquote>

        <div className="mt-8 flex flex-col gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-x-4">
            <Avatar testimonial={testimonial} size="h-12 w-12" />
            <div>
              <div className="font-semibold text-white text-lg">
                {testimonial.author}
              </div>
              <div className="text-[#D4AF37] font-medium">
                {testimonial.handle}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const featured = TESTIMONIALS.find((t) => t.featured);
  const others = TESTIMONIALS.filter((t) => !t.featured);

  return (
    <section className="relative isolate m-5 rounded-4xl border border-zinc-200 bg-zinc-50 pb-20 pt-20 sm:pt-16 sm:pb-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm sm:text-lg font-semibold leading-8 tracking-tight text-[#bd982e] uppercase">
            Tested On The 18th
          </p>

          <div className="mx-auto my-3 h-0.5 w-12 bg-[#D4AF37]" />

          <h2 className="mt-2 text-xl font-light tracking-tight text-zinc-900 sm:text-3xl">
            Real stories from the players, creators, and regulars making moves
            on and off the course.
          </h2>
        </div>

        <div className="mx-auto mt-14 grid max-w-2xl grid-cols-1 gap-8 text-sm leading-6 sm:mt-20 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-flow-col lg:grid-cols-4">
          <div className="contents">
            {others.slice(0, 2).map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>

          {featured && <FeaturedTestimonial testimonial={featured} />}

          <div className="contents">
            {others.slice(2, 4).map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
