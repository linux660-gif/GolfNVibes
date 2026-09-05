import { PlaneTakeoff, GlobeIcon, Coffee } from "lucide-react";
import { MdGolfCourse } from "react-icons/md";
import { FaGolfBall, FaSpa, FaWineGlass } from "react-icons/fa";
import { TbBeachOff } from "react-icons/tb";

const CURATOR_QA = [
  {
    icon: <GlobeIcon className="w-4 h-4 text-[#0a4d30] shrink-0" />,
    question: "Favourite Golf Destination?",
    answer: "Antalya, Turkey",
  },
  {
    icon: <MdGolfCourse className="w-4 h-4 text-[#0a4d30] shrink-0" />,
    question: "Dream Golf Destination?",
    answer: "Scotland.",
  },
  {
    icon: <PlaneTakeoff className="w-4 h-4 text-[#0a4d30] shrink-0" />,
    question: "Window or Aisle?",
    answer: "Window. The adventure starts before we land.",
  },
  {
    icon: <FaSpa className="w-4 h-4 text-[#0a4d30] shrink-0" />,
    question: "Golf or Spa Day?",
    answer: "Golf first. Spa after 18 holes.",
  },
  {
    icon: <FaWineGlass className="w-4 h-4 text-[#0a4d30] shrink-0" />,
    question: "Favourite Part of Every Tour?",
    answer: "The stories shared over dinner after the final round.",
  },
  {
    icon: <TbBeachOff className="w-4 h-4 text-[#0a4d30] shrink-0" />,
    question: "Sunrise Tee Time or Sunset Sundowners?",
    answer: "Both",
  },
  {
    icon: <Coffee className="w-4 h-4 text-[#0a4d30] shrink-0" />,
    question: "Coffee or Cocktails?",
    answer: "Coffee before golf. Cocktails after golf.",
  },
  {
    icon: <FaGolfBall className="w-4 h-4 text-[#0a4d30] shrink-0" />,
    question: "Honest Confession?",
    answer:
      "I spend more time researching luxury resorts than practising my putting… and it shows.",
  },
  {
    icon: <FaGolfBall className="w-4 h-4 text-[#0a4d30] shrink-0" />,
    question: "Most Used Phrase on Tour?",
    answer: "\u201cOne more group photo!\u201d",
  },
  {
    icon: <FaGolfBall className="w-4 h-4 text-[#0a4d30] shrink-0" />,
    question: "Golf Superpower?",
    answer:
      "Finding incredible golf destinations… not always finding my golf ball.",
  },
];

function CuratorCard({ item }: { item: (typeof CURATOR_QA)[number] }) {
  return (
    <div className="bg-white rounded-2xl p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 h-full">
      <p className="font-semibold text-xs sm:text-sm text-gray-800 leading-snug flex items-center gap-2">
        {item.icon}
        <span>{item.question}</span>
      </p>
      <p className="mt-2 pt-2 border-t border-gray-100 text-xs text-gray-600 leading-relaxed">
        {item.answer}
      </p>
    </div>
  );
}

export default function MeetTheTeam() {
  return (
    <div className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gray-200 rounded-2xl sm:rounded-3xl lg:rounded-4xl my-4 sm:my-8 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-8 sm:gap-12 lg:gap-12 xl:gap-16 items-start">
        <div className="w-full lg:w-1/2 lg:sticky lg:top-8">
          <div className="relative w-full aspect-3/4 sm:aspect-4/3 lg:aspect-3/4 rounded-2xl overflow-hidden shadow-md group bg-gray-300/50">
            <img
              src="https://golfnvibes.com/uploads/media/images/Founder.jpeg"
              alt="Angela, founder and curator of Golf N Vibes"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>

        <div className="w-full lg:w-1/2 space-y-6 sm:space-y-8">
          <div className="space-y-3 sm:space-y-4">
            <span className="text-xs uppercase font-semibold text-[#0a4d30] tracking-widest block">
              CURATOR 101
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-black">
              MEET THE CURATOR
            </h2>
            <div className="w-16 h-0.5 bg-linear-to-r from-[#D4AF37] to-transparent" />
            <h3 className="font-bold text-xl sm:text-2xl text-[#0a4d30]">
              Hi, I'm Angela. Welcome to Golf N Vibes.
            </h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Golf has taken me to incredible destinations, introduced me to
              amazing people and shown me that the best journeys are about so
              much more than what's on the scorecard. Every Golf n Vibes
              experience is personally curated with one goal—to bring together
              exceptional golf, luxury travel and unforgettable moments. Because
              it's not just golf. It's a lifestyle.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 items-start">
            {CURATOR_QA.map((item) => (
              <CuratorCard key={item.question} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
