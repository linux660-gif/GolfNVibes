import {
  TagIcon,
  BuildingOffice2Icon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

interface PartnerOffer {
  partner: string;
  category: string;
  offer: string;
  icon: typeof BuildingOffice2Icon;
  href?: string;
}

const OFFERS: PartnerOffer[] = [
  {
    partner: "Luxury Resort Collection",
    category: "Hospitality",
    offer: "Complimentary room upgrades & $150 spa credit on 3+ night stays.",
    icon: BuildingOffice2Icon,
  },
  {
    partner: "Precision Golf Fitting",
    category: "Equipment",
    offer: "20% off custom club builds and tour-level analysis.",
    icon: TagIcon,
  },
  {
    partner: "Private Aviation Co.",
    category: "Travel",
    offer: "Preferred charter rates for golf group flights.",
    icon: PaperAirplaneIcon,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
} as const;

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
} as const;

export default function MemberOffers() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-4xl m-4 py-12 sm:py-20 px-4 sm:px-6 lg:px-12 border-t  text-zinc-300"
    >
      <div className="max-w-7xl mx-auto space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center space-y-2"
        >
          <span className="text-[10px] sm:text-xs tracking-widest font-semibold uppercase text-gray-900">
            Member Privileges
          </span>

          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-black">
            Curated Partner Offers
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
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {OFFERS.map((item) => {
            const Icon = item.icon;

            return (
              <motion.a
                key={item.partner}
                href={item.href ?? "/Club#application-form"}
                variants={cardVariants}
                whileHover={{
                  y: -5,
                  transition: { duration: 0.25, ease: "easeOut" },
                }}
                className="group p-6 rounded-2xl bg-[#0a4d30] border border-zinc-800 hover:border-[#D4AF37]/50 space-y-4 transition-colors duration-300 block focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-mono bg-zinc-800 text-zinc-400 px-2.5 py-1 rounded-md">
                    {item.category}
                  </span>

                  <motion.div
                    whileHover={{ scale: 1.08, rotate: 3 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    <Icon className="w-5 h-5 text-[#D4AF37]" />
                  </motion.div>
                </div>

                <h3 className="text-base font-serif font-bold text-white">
                  {item.partner}
                </h3>

                <p className="text-xs text-zinc-400 leading-relaxed">
                  {item.offer}
                </p>

                <motion.div
                  initial={{ width: 0 }}
                  whileHover={{ width: 28 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="h-px bg-[#D4AF37]/60"
                />
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}
