import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function ContactHero({
  onApplyClick,
}: {
  onApplyClick?: () => void;
}) {
  return (
    <div className="relative w-full overflow-hidden bg-cover bg-center bg-no-repeat  bg-[url('https://golfnvibes.com/uploads/media/images/dsc08214.jpg')]">
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-24 sm:py-24 md:py-32 lg:py-40">
        <div className="flex flex-col items-center text-center gap-5 sm:gap-7">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white dark:text-white leading-tight">
            Ready To Golf N Vibe ?
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-zinc-200 max-w-2xl font-light leading-relaxed">
            From course collaborations to community inquiries—we’re always open
            to good conversation.
          </p>
          <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a href="/Partners">
              <button
                onClick={onApplyClick}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-widest flex items-center justify-center space-x-2 transition-all duration-300 hover:brightness-110 shadow-lg shadow-[#D4AF37]/20 cursor-pointer"
              >
                <span>Partner With Us</span>
                <ArrowRightIcon className="w-4 h-4 stroke-[2.5]" />
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
