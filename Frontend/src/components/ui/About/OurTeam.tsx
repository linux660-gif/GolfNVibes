import { PlaneTakeoff, GlobeIcon, Coffee, MessageSquare } from "lucide-react";
import { MdGolfCourse } from "react-icons/md";
import { FaGolfBall, FaSpa, FaWineGlass } from "react-icons/fa";
import { TbBeachOff } from "react-icons/tb";

const CURATOR_QA = [
  {
    icon: <GlobeIcon className="w-3.5 h-3.5 text-white" />,
    question: "Favourite Golf Destination?",
    answer: "Antalya, Turkey",
    time: "10:00 AM",
  },
  {
    icon: <MdGolfCourse className="w-3.5 h-3.5 text-white" />,
    question: "Dream Golf Destination?",
    answer: "Scotland.",
    time: "10:01 AM",
  },
  {
    icon: <PlaneTakeoff className="w-3.5 h-3.5 text-white" />,
    question: "Window or Aisle?",
    answer: "Window. The adventure starts before we land.",
    time: "10:02 AM",
  },
  {
    icon: <FaSpa className="w-3.5 h-3.5 text-white" />,
    question: "Golf or Spa Day?",
    answer: "Golf first. Spa after 18 holes.",
    time: "10:03 AM",
  },
  {
    icon: <FaWineGlass className="w-3.5 h-3.5 text-white" />,
    question: "Favourite Part of Every Tour?",
    answer: "The stories shared over dinner after the final round.",
    time: "10:04 AM",
  },
  {
    icon: <TbBeachOff className="w-3.5 h-3.5 text-white" />,
    question: "Sunrise Tee Time or Sunset Sundowners?",
    answer: "Both",
    time: "10:05 AM",
  },
  {
    icon: <Coffee className="w-3.5 h-3.5 text-white" />,
    question: "Coffee or Cocktails?",
    answer: "Coffee before golf. Cocktails after golf.",
    time: "10:06 AM",
  },
  {
    icon: <FaGolfBall className="w-3.5 h-3.5 text-white" />,
    question: "Honest Confession?",
    answer:
      "I spend more time researching luxury resorts than practising my putting... and it shows.",
    time: "10:07 AM",
  },
  {
    icon: <FaGolfBall className="w-3.5 h-3.5 text-white" />,
    question: "Most Used Phrase on Tour?",
    answer: "“One more group photo!”",
    time: "10:08 AM",
  },
  {
    icon: <FaGolfBall className="w-3.5 h-3.5 text-white" />,
    question: "Golf Superpower?",
    answer:
      "Finding incredible golf destinations... not always finding my golf ball.",
    time: "10:09 AM",
  },
];

function CuratorChatThread({ item }: { item: (typeof CURATOR_QA)[number] }) {
  return (
    <div className="space-y-2 py-5">
      <div className="flex items-end gap-2 max-w-[85%] sm:max-w-[75%] ">
        <div className="w-7 h-7 rounded-full  flex items-center justify-center shrink-0 border border-gray-200 bg-black shadow-xs">
          {item.icon}
        </div>
        <div className="bg-white text-gray-800 p-3 rounded-2xl rounded-bl-xs border border-gray-100 shadow-xs">
          <p className="text-xs sm:text-sm font-medium leading-snug">
            {item.question}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <div className="bg-[#0a4d30] text-white p-3 rounded-2xl rounded-br-xs max-w-[85%] sm:max-w-[75%] shadow-xs">
          <p className="text-xs sm:text-sm font-normal leading-relaxed">
            {item.answer}
          </p>
        </div>
        <span className="text-[10px] text-gray-400 mt-1 px-1">{item.time}</span>
      </div>
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
              MEET THE CURATOR,
            </h2>
            <h3 className="text-xl sm:text-3xl lg:text-3xl font-light tracking-tight text-black">
              Angela Livu
            </h3>
            <div className="w-16 h-0.5 bg-linear-to-r from-[#D4AF37] to-transparent" />
            <h3 className="font-bold text-xl sm:text-2xl text-[#0a4d30]">
              Hi, I'm Angie. Welcome to Golf N Vibes.
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
          <div className="bg-gray-100/80 rounded-2xl p-4 sm:p-5 border border-gray-200/80 shadow-inner">
            <div className="flex items-center gap-2 pb-3 mb-4 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <MessageSquare className="w-4 h-4 text-[#0a4d30]" />
              <span>Q&A with Angela</span>
              <span className="ml-auto flex items-center gap-1 text-[11px] text-emerald-700 font-normal normal-case">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Online
              </span>
            </div>

            <div className="space-y-3 bg-[linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url('/pastevent2.jpg')] bg-cover bg-center max-h-125 overflow-y-auto pr-1 scrollbar-thin">
              {CURATOR_QA.map((item) => (
                <CuratorChatThread key={item.question} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
