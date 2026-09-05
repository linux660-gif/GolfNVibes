import { CameraIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

export default function GalleryCTA() {
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-12 bg-gray-200">
      <div className="max-w-4xl mx-auto rounded-2xl bg-white p-8 sm:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="p-3 w-fit rounded-full bg-[#dbaf1e] border border-[#D4AF37]/30 text-[#0a4d30] mx-auto">
          <CameraIcon className="w-6 h-6" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-black">
            Captured Moments at Our Events?
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 max-w-lg mx-auto font-light">
            Share your favorite photos and videos from recent tournaments or
            golf holidays to be featured in the official Golf n Vibes
            gallery.
          </p>
        </div>

        <a
          href="/ContactUs"
          className="px-8 py-3.5 rounded-xl bg-black text-white cursor-pointer font-bold text-xs uppercase tracking-widest inline-flex items-center space-x-2 transition-all duration-300 hover:brightness-110 shadow-lg shadow-[#D4AF37]/20 focus-visible:ring-2 focus-visible:ring-[#0a4d30] focus-visible:ring-offset-2"
        >
          <span>Submit Your Media</span>
          <ArrowRightIcon className="w-4 h-4 stroke-[2.5]" />
        </a>
      </div>
    </section>
  );
}