import {
  TrophyIcon,
  SparklesIcon,
  TicketIcon,
  BuildingStorefrontIcon,
  GlobeAltIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

interface Benefit {
  icon: typeof TicketIcon;
  title: string;
  description: string;
}

const BENEFITS: Benefit[] = [
  {
    icon: TicketIcon,
    title: "Priority Event Access",
    description:
      "Guaranteed registration and reserved tee-times for all global Golf n Vibes tournaments.",
  },
  {
    icon: BuildingStorefrontIcon,
    title: "Partner Hotel Privileges",
    description:
      "Exclusive room upgrades, complimentary breakfasts, and resort credits at partner properties.",
  },
  {
    icon: GlobeAltIcon,
    title: "Bespoke Travel Concierge",
    description:
      "Dedicated travel architects to design your private golf escapes with custom itineraries.",
  },
  {
    icon: UserGroupIcon,
    title: "Private Member Network",
    description:
      "Connect with high-net-worth professionals, executives, and golf lovers worldwide.",
  },
  {
    icon: TrophyIcon,
    title: "Club Championship Access",
    description:
      "Entry into our annual closed-door Club Championship and end-of-year gala dinner.",
  },
  {
    icon: SparklesIcon,
    title: "Exclusive Equipment Perks",
    description:
      "Direct VIP pricing on luxury golf gear, bespoke apparel, and custom club fittings.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
} as const;

export default function MemberBenefits() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="py-12 sm:py-20 px-4 sm:px-6 lg:px-12  shadow-2xl text-zinc-300 rounded-4xl m-4"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center space-y-3"
        >
          <span className="text-[14px] sm:text-xs tracking-widest font-semibold uppercase text-gray-900">
            Membership Privileges
          </span>

          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-black">
            Designed For The Discerning Golfer
          </h2>

          <motion.div
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 48, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="h-0.5 bg-[#D4AF37] mx-auto"
          />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {BENEFITS.map((item) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                variants={cardVariants}
                whileHover={{
                  y: -5,
                  transition: { duration: 0.25, ease: "easeOut" },
                }}
                className="group p-6 rounded-2xl bg-[#0a4d30] border border-zinc-800 hover:border-[#D4AF37]/50 transition-colors duration-300 space-y-3"
              >
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="p-3 w-fit rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37]"
                >
                  <Icon className="w-6 h-6" />
                </motion.div>

                <h3 className="text-lg font-serif font-semibold text-white">
                  {item.title}
                </h3>

                <p className="text-xs text-zinc-400 leading-relaxed font-light">
                  {item.description}
                </p>

                <motion.div
                  initial={{ width: 0 }}
                  whileHover={{ width: 28 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="h-px bg-[#D4AF37]/60"
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}
