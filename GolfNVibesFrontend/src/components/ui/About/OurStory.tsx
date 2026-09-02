import { motion } from "framer-motion";
import { Button } from "flowbite-react";
import { ArrowUpRight } from "lucide-react";

const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
} as const;

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
} as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
} as const;

export default function OurStory() {
  return (
    <section className="bg-gray-100 py-8 lg:py-16 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-12 rounded-3xl sm:rounded-4xl m-3 sm:m-5 overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12 lg:gap-16 xl:gap-20">
        <motion.div
          className="aspect-4/3 w-full lg:w-1/2 rounded-2xl overflow-hidden shrink-0 shadow-xl ring-1 ring-black/5"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src="https://golfnvibes.com/uploads/media/images/GalleryImage4.JPG"
            alt="Golfers enjoying a Golf N Vibes hosted tournament"
            loading="lazy"
            decoding="async"
            width={1200}
            height={900}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
        </motion.div>

        <motion.div
          className="w-full lg:w-1/2 space-y-3 sm:space-y-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.span
            variants={fadeInLeft}
            className="text-xs font-semibold text-[#0a4d30] uppercase tracking-widest block"
          >
            Our Story
          </motion.span>

          <motion.h2
            variants={fadeInUp}
            className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-black leading-tight"
          >
            Redefining Golf Hospitality
          </motion.h2>

          <motion.div
            variants={fadeInUp}
            className="w-16 h-0.5 bg-linear-to-r from-[#D4AF37] to-transparent"
          />

          <motion.p
            variants={fadeInUp}
            className="text-sm sm:text-base text-zinc-700 leading-relaxed font-light max-w-lg"
          >
            Founded with a vision to elevate the golf lifestyle, Golf n Vibes
            bridges world-class fairways with vibrant social experiences,
            luxurious travel itineraries, and a global network of golf
            enthusiasts.
          </motion.p>

          <motion.div variants={fadeInUp} className="pt-2">
            <Button
              href="/About"
              className="bg-[#0a4d30]! flex items-center justify-center gap-2 w-fit cursor-pointer hover:opacity-90 transition-opacity focus-visible:ring-2 focus-visible:ring-[#0a4d30] focus-visible:ring-offset-2"
            >
              Read Our Full Story
              <ArrowUpRight size={18} className="shrink-0" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
