import {
  ChevronRightIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";
import MembershipApplicationForm from "../../forms/ClubApplicationForm";

const iconClass = "h-5 w-5 text-[#0a4d30]";

const MEMBERSHIP_EXPERIENCE = [
  {
    icon: <TrophyIcon className={iconClass} />,
    feature: "Exceptional Golf",
    description: "Refined experiences for passionate golfers.",
  },
  {
    icon: <GlobeAltIcon className={iconClass} />,
    feature: "Luxury Travel",
    description: "Connections beyond the fairway.",
  },
  {
    icon: <ShieldCheckIcon className={iconClass} />,
    feature: "Curated Community",
    description: "A selective circle of like-minded members.",
  },
];

export default function Membership() {
  return (
    <section
      id="application-form"
      className="relative w-full rounded-4xl m-5 overflow-hidden bg-gray-300 px-4 py-16 text-black sm:px-6 sm:py-20 lg:px-10 lg:py-24 xl:px-16"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-[#D4AF37]/5 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-[#D4AF37]/5 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-10 flex items-center gap-3 sm:mb-14">
          <div className="h-px w-10 bg-black" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-black sm:text-xs">
            Membership
          </span>
          <div className="h-px flex-1 bg-black/10" />
        </div>

        <div className="grid items-stretch gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10 xl:gap-16">
          <div className="flex flex-col justify-between py-2 lg:py-8">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black">
                  Private Membership
                </span>
              </div>

              <h1 className="max-w-xl text-4xl font-light leading-[1.08] tracking-tight sm:text-5xl lg:text-5xl xl:text-6xl">
                Your Elite Golf
                <span className="block font-serif italic text-[#0a4d30]">
                  Experience Awaits.
                </span>
              </h1>

              <div className="mt-6 h-px w-16 bg-[#D4AF37]" />

              <p className="mt-6 max-w-xl text-sm leading-7 text-black sm:text-base sm:leading-8">
                Welcome to your premier golfing sanctuary, where championship
                fairways meet a vibrant community of passionate players. Whether
                you are looking to sharpen your competitive edge, enjoy relaxed
                weekend rounds, or connect with fellow enthusiasts in an elegant
                clubhouse setting, Golf n Vibes offers a refined membership
                experience designed around the way you want to play, travel, and
                connect.
              </p>

              <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-700 sm:leading-8">
                Submit your application below and take the first step toward
                joining an exclusive community built around exceptional golf,
                luxury travel, and meaningful connections.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3 lg:mt-14 lg:grid-cols-1 xl:grid-cols-3">
              {MEMBERSHIP_EXPERIENCE.map((item) => (
                <div
                  key={item.feature}
                  className="group rounded-2xl border border-[#0a4d30]/30 bg-white p-4 transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="mb-3">{item.icon}</div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-700">
                    {item.feature}
                  </p>
                  <p className="mt-1 text-[11px] leading-5 text-zinc-500">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:p-10">
            <MembershipApplicationForm />
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-black pt-6 sm:flex-row">
          <p className="text-center text-[9px] uppercase tracking-[0.2em] text-black sm:text-left">
            Golf n Vibes · Membership Office
          </p>

          <div className="flex items-center gap-1 text-[9px] uppercase tracking-[0.18em] text-black">
            <span>Begin Your Journey</span>
            <ChevronRightIcon className="h-3 w-3 text-[#0a4d30]" />
          </div>
        </div>
      </div>
    </section>
  );
}
