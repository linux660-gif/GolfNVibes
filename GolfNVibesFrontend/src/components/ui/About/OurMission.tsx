import {
  EyeIcon,
  RocketLaunchIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const VALUES = [
  {
    icon: EyeIcon,
    title: "Our Vision",
    description:
      "To become the premier luxury golf lifestyle community across Africa and global destinations.",
  },
  {
    icon: RocketLaunchIcon,
    title: "Our Mission",
    description:
      "Curating bespoke golf holidays, seamlessly executed tournaments, and high-value networking platforms.",
  },
  {
    icon: HeartIcon,
    title: "Why Golf n Vibes",
    description:
      "Because every tee time should feel like a celebration of luxury, connection, and flawless service.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
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

export default function VisionMission() {
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-12 m-2 bg-gray-50 rounded-4xl">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-10 sm:mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          <motion.span
            variants={fadeInUp}
            className="text-xs font-semibold text-[#0a4d30] uppercase tracking-widest block"
          >
            What Drives Us
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="mt-2 text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-black leading-tight"
          >
            Vision, Mission & Values
          </motion.h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          {VALUES.map(({ icon: Icon, title, description }) => (
            <motion.div
              key={title}
              variants={fadeInUp}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="p-6 rounded-2xl bg-[#0a4d30] border border-white/10 space-y-3 shadow-lg"
            >
              <Icon className="w-6 h-6 text-[#D4AF37]" />
              <h3 className="text-lg font-serif font-bold text-white">
                {title}
              </h3>
              <p className="text-xs text-zinc-100 font-light leading-relaxed">
                {description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
