interface Testimonial {
  id: string;
  content: string;
  author: string;
  handle?: string;
  image?: string;
  featured?: boolean;
  logo?: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "anthony",
    content:
      "@golfnvibes has the most epic trips hands down. Every swing came with a view, every vibe hit just right, and the memories? Pure gold. From championship courses to sunset cocktails, this isn't just a trip, it is an experience.",
    author: "Anthony Makau",
    handle: "@anthonymakau",
  },
  {
    id: "luxury-client",
    content:
      "Angie you have cracked the code & you've done it so well. So many people have money but are used to paying sub par experiences from most travel agents. You have covered a niche clientele of golfers who like luxury and are ready to spend, keep it up!",
    author: "Ephy Kimani",
    handle: "@ephy kimani",
  },
  {
    id: "angela",
    content:
     " Golf has taken me to incredible destinations, introduced me to amazing people and shown me that the best journeys are about so much more than what's on the scorecard. Every Golf n Vibes experience is personally curated with one goal—to bring together exceptional golf, luxury travel and unforgettable moments. Because it's not just golf. It's a lifestyle.",
    author: "Angela",
    handle: "@golfnvibes",
    image: "https://golfnvibes.com/uploads/media/images/Founder.jpeg",
    featured: true,
  },
  {
    id: "review-crew",
    content:
      "What a fantastic weekend! Huge thanks to Angie for putting everything together—every detail was perfect, from the travel to our stay, the delicious food, and the thrilling golf. I'm so grateful for the new friendships we've created!",
    author: "Sarah Wambui",
    handle: "@sarah_wambui",
  },
  {
    id: "franq",
    content:
      "Apparently golf is a sport and not just vibes and polos. Appreciate the orientation @golfnvibes – now I know how it feels to do 10K steps on grass!",
    author: "Franq",
    handle: "@itsfranq",
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
