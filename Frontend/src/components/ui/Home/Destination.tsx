import { Button, Tooltip } from "flowbite-react";
import { motion } from "framer-motion";

const destinations = [
  {
    country: "Morocco",
    flag: "https://golfnvibes.com/uploads/media/images/morocco_flag.jpeg",
    href: "/destinations/morocco",
    resorts: [
      {
        name: "Mazagan Beach & Golf Resort",
        description:
          "Epic ocean views along the Atlantic coast with an 18-hole links course designed by Gary Player. Incredible nightlife, beach clubs, and traditional Moroccan spa vibes.",
        cost: "$$$$",
      },
    ],
  },
  {
    country: "Thailand",
    flag: "https://golfnvibes.com/uploads/media/images/thailand_flag.jpeg",
    href: "/destinations/thailand",
    resorts: [
      {
        name: "Black Mountain Golf Club & Resort",
        description:
          "Nestled in the foothills of Hua Hin. Award-winning championship golf paired with private pool villas, infinity edges, and an ultra-laidback tropical atmosphere.",
        cost: "$$$",
      },
    ],
  },
  {
    country: "Kenya",
    flag: "https://golfnvibes.com/uploads/media/images/kenya_flag.jpeg",
    href: "/destinations/kenya",
    resorts: [
      {
        name: "Vipingo Ridge",
        description:
          "A striking, breeze-cooled ridge overlooking the Indian Ocean. Features the only PGA-accredited course in East Africa, wild roaming zebras, and pristine beach club access.",
        cost: "$$$$",
      },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

export default function GNVDestination() {
  return (
    <div className="relative isolate rounded-3xl m-5 overflow-hidden bg-zinc-100 px-4 py-16 sm:px-6 sm:py-20 md:py-24 lg:px-8 lg:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start lg:gap-x-12">
        <motion.div
          className="order-1"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.p
            variants={fadeInUp}
            className="text-base font-semibold text-[#bd982e]"
          >
            Destinations
          </motion.p>

          <motion.h2
            variants={fadeInUp}
            className="mt-2 text-3xl text-black font-semibold tracking-tight sm:text-4xl md:text-5xl"
          >
            Tee Times & Tropical Vibes
          </motion.h2>

          <div className="mt-8 max-w-xl text-base leading-7 text-gray-500">
            <motion.p variants={fadeInUp}>
              Whether you are looking to chase eagles along the windswept
              Atlantic cliffs of North Africa, tee off in the lush tropical
              foothills of Southeast Asia, or share the fairways with roaming
              wildlife overlooking the Indian Ocean, we have curated the
              ultimate fusion of world-class golf and unbeatable atmospheres.
              Dive into our handpicked destinations where championship courses
              meet luxury relaxation, vibrant nightlife, and local culture.
            </motion.p>

            <motion.div variants={containerVariants} className="mt-8 space-y-6">
              {destinations.map((destination) => (
                <motion.div
                  key={destination.country}
                  variants={fadeInUp}
                  className="flex items-start gap-3 text-gray-500"
                >
                  <img
                    src={destination.flag}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                    width={20}
                    height={20}
                    className="mt-1 h-5 w-5 flex-none rounded-full object-cover shadow-sm transition-transform duration-200 hover:scale-110"
                  />
                  <p>
                    <strong className="font-semibold text-[#0a4d30]">
                      {destination.country}.
                    </strong>{" "}
                    {destination.resorts.map((resort) => (
                      <span key={resort.name} className="block mt-2">
                        <strong className="text-[#bd982e]">
                          {resort.name}:
                        </strong>{" "}
                        {resort.description}{" "}
                      </span>
                    ))}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            <motion.h3
              variants={fadeInUp}
              className="mt-12 text-2xl font-bold tracking-tight text-[#0a4d30] sm:mt-16"
            >
              Not on the List? No problem.
            </motion.h3>

            <motion.p variants={fadeInUp} className="mt-6">
              Golf N Vibes is offering customized trip planning for individuals,
              friends and Corporate Events. Design your own trip plan today with
              interested area of visit, number of people, number of days for the
              tour and receive a budget in prompt.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="mt-8 flex justify-center sm:justify-start"
            >
              <Tooltip content="Customize Now">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button
                    href="/GolfHolidays/PlanMyTrip"
                    className="rounded-full px-6 sm:px-8 bg-[#bd982e]! transition-shadow duration-300 hover:shadow-lg hover:shadow-[#bd982e]/20 focus-visible:ring-2 focus-visible:ring-[#0a4d30] focus-visible:ring-offset-2"
                  >
                    Plan my Trip
                  </Button>
                </motion.div>
              </Tooltip>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="order-2 lg:sticky lg:top-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInRight}
        >
          <motion.img
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            alt="World globe highlighting Golf N Vibes destinations"
            src="https://golfnvibes.com/uploads/media/images/globe.jpg"
            width={1200}
            height={1200}
            loading="lazy"
            decoding="async"
            className="mx-auto w-full max-w-md rounded-xl bg-gray-800 shadow-xl ring-1 ring-white/10 sm:max-w-lg md:max-w-xl lg:max-w-none object-cover"
          />
        </motion.div>
      </div>
    </div>
  );
}
