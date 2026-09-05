import { motion } from "framer-motion";
import {
  CalendarDaysIcon,
  UserGroupIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa";
import HostEventForm from "../../forms/HostEvent";


export default function HostEvent() {


  const WHYGOLFNVIBES = [
    "Professional Tournament Management",
    "Sponsorship Strategy & Activation",
    "Corporate & Charity Golf Days",
    "Seamless Player Registration",
    "Memorable Guest Experiences",
  ];


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  } as const;

  return (
    <section className="relative my-4 sm:my-8 mx-2 sm:mx-6 rounded-2xl sm:rounded-3xl lg:rounded-4xl overflow-hidden text-zinc-600 py-8 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-12 font-sans transition-colors duration-300 bg-zinc-50/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          <motion.div
            className="lg:col-span-7 space-y-6 sm:space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gray-300 text-black text-xs font-semibold tracking-widest uppercase">
                <span>Bespoke Corporate & Private Hostings</span>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-3xl font-light text-black leading-tight tracking-tight">
                Need Help Organising Your Next Golf Tournament?
              </h1>
              <div className="w-20 h-0.5 bg-linear-to-r from-[#D4AF37] to-transparent" />
            </motion.div>
            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base text-zinc-800 leading-relaxed max-w-2xl font-light"
            >
              Whether you’re planning a corporate golf day, charity tournament,
              club championship or private golf event, Golf n Vibes will manage
              every detail from concept to prize giving—so you can enjoy the day
              while we do the work.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2"
            >
              <div className="p-4 rounded-xl bg-[#0a4d30] border border-zinc-800/20 shadow-md space-y-2.5 transition-transform hover:-translate-y-1 duration-300">
                <TrophyIcon className="w-5 h-5 text-[#D4AF37]" />
                <p className="text-xs font-semibold text-white">
                  Tournament Planning
                </p>
                <p className="text-[11px] text-zinc-300 leading-relaxed">
                  From registrations and pairings to scoring and prize giving,
                  we manage every aspect of your golf event.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0a4d30] border border-zinc-800/20 shadow-md space-y-2.5 transition-transform hover:-translate-y-1 duration-300">
                <UserGroupIcon className="w-5 h-5 text-[#D4AF37]" />
                <p className="text-xs font-semibold text-white">
                  Sponsorship & Partnerships
                </p>
                <p className="text-[11px] text-zinc-300 leading-relaxed">
                  We help secure sponsors, create brand activations and maximise
                  value for your partners.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0a4d30] border border-zinc-800/20 shadow-md space-y-2.5 transition-transform hover:-translate-y-1 duration-300">
                <CalendarDaysIcon className="w-5 h-5 text-[#D4AF37]" />
                <p className="text-xs font-semibold text-white">
                  Event Experience
                </p>
                <p className="text-[11px] text-zinc-300 leading-relaxed">
                  Hospitality, entertainment, photography, branding and player
                  experience—all under one roof.
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-2">
              <div className="bg-zinc-200/80 backdrop-blur-sm w-full max-w-lg rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-inner">
                <div className="flex flex-col items-start space-y-3">
                  <span className="text-xs sm:text-sm text-black font-semibold flex items-center gap-2">
                    Why Choose Golf n Vibes?
                    <FaAngleDown
                      className="text-zinc-600 animate-bounce"
                      size={16}
                    />
                  </span>
                  <ul className="space-y-2 w-full">
                    {WHYGOLFNVIBES.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-800 font-medium"
                      >
                        <IoCheckmarkDoneCircleSharp className="mt-0.5 text-[#046307] shrink-0 text-base" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <HostEventForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
