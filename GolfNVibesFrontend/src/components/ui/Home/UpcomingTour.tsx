import { useState } from "react";
import { Tooltip } from "flowbite-react";
import { motion } from "framer-motion";

const IMAGES = [
  {
    src: "https://golfnvibes.com/uploads/media/images/golflifesyle_img1.jpg",
    className:
      "hidden h-44 w-28 overflow-hidden rounded-lg sm:hidden lg:block lg:h-64 lg:w-44",
    col: 1,
  },
  {
    src: "https://golfnvibes.com/uploads/media/images/golflifestyle_img2.jpg",
    className:
      "h-44 w-28 overflow-hidden rounded-lg sm:h-52 sm:w-36 md:h-56 md:w-40 lg:h-64 lg:w-44",
    col: 1,
  },
  {
    src: "https://golfnvibes.com/uploads/media/images/golflifestyle_img3.jpg",
    className:
      "h-44 w-28 overflow-hidden rounded-lg sm:h-52 sm:w-36 md:h-56 md:w-40 lg:h-64 lg:w-44",
    col: 2,
  },
  {
    src: "https://golfnvibes.com/uploads/media/images/golflifestyle_img4.jpg",
    className:
      "h-44 w-28 overflow-hidden rounded-lg sm:h-52 sm:w-36 md:h-56 md:w-40 lg:h-64 lg:w-44",
    col: 2,
  },
  {
    src: "https://golfnvibes.com/uploads/media/images/golflifestyle_img5.jpg",
    className:
      "hidden h-44 w-28 overflow-hidden rounded-lg md:block md:h-56 md:w-40 lg:h-64 lg:w-44",
    col: 3,
  },
  {
    src: "https://golfnvibes.com/uploads/media/images/golflifestyle_img6.jpg",
    className:
      "h-44 w-28 overflow-hidden rounded-lg sm:h-52 sm:w-36 md:h-56 md:w-40 lg:h-64 lg:w-44",
    col: 3,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
} as const;

const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeInOut" },
  },
} as const;

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.42, 0, 0.58, 1] },
  },
} as const;

const gridContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
} as const;

const imagePopIn = {
  hidden: { opacity: 0, scale: 0.8, y: 30 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6 } },
};

type GalleryImageProps = {
  src: string;
  className: string;
  priority?: boolean;
  gapClass?: string;
};

function GalleryImage({
  src,
  className,
  priority,
  gapClass,
}: GalleryImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div
      variants={imagePopIn}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className={`${className} pointer-events-auto relative shadow-lg bg-gray-200/60 ${gapClass ?? ""}`}
    >
      <img
        alt=""
        src={src}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "low"}
        decoding="async"
        className={`size-full object-cover transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setLoaded(true)}
      />
    </motion.div>
  );
}

type ImageColumnProps = {
  images: (typeof IMAGES)[number][];
  gapClass: string;
  priorityCol?: boolean;
};

function ImageColumn({ images, gapClass, priorityCol }: ImageColumnProps) {
  return (
    <div className={`grid shrink-0 grid-cols-1 ${gapClass}`}>
      {images.map((img, idx) => (
        <GalleryImage
          key={img.src}
          src={img.src}
          className={img.className}
          priority={priorityCol && idx === 0} gapClass={undefined}        />
      ))}
    </div>
  );
}

export default function GNVUpcomingTour() {
  const col1 = IMAGES.filter((img) => img.col === 1);
  const col2 = IMAGES.filter((img) => img.col === 2);
  const col3 = IMAGES.filter((img) => img.col === 3);

  return (
    <div className="relative overflow-hidden rounded-3xl mt-5">
      <div className="pt-12 pb-16 sm:pt-16 sm:pb-20 md:pt-24 md:pb-24 lg:pt-32 lg:pb-40 xl:pt-40 xl:pb-48">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-full sm:max-w-xl lg:max-w-xl"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.h1
              variants={fadeInLeft}
              className="text-3xl font-bold tracking-tight text-[#0a4d30] sm:text-4xl md:text-5xl lg:text-5xl leading-tight"
            >
              It's Not Just Golf. It's a Lifestyle.
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="mt-4 text-base text-gray-500 sm:text-lg md:text-xl leading-relaxed"
            >
              Discover the tournaments we've hosted, the unforgettable
              destinations we've explored, and the vibrant community we've built
              through a shared passion for golf, travel and unforgettable
              experiences.
            </motion.p>
          </motion.div>
          <div>
            <div className="mt-10 lg:mt-0">
              <div
                aria-hidden="true"
                className="pointer-events-none relative mt-12 h-auto w-full overflow-hidden lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:h-full lg:w-1/2 lg:max-w-4xl lg:overflow-visible xl:w-[55%]"
              >
                <div className="relative flex justify-center lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-y-1/2 lg:-translate-x-1/4 xl:-translate-x-1/3">
                  <motion.div
                    className="flex flex-grow:1 items-center gap-3 sm:gap-4 md:gap-5 lg:gap-3 lg:mr-5"
                    variants={gridContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                  >
                    <ImageColumn
                      images={col1}
                      gapClass="gap-y-4 lg:gap-y-8"
                      priorityCol
                    />
                    <ImageColumn
                      images={col2}
                      gapClass="gap-y-3 sm:gap-y-4 lg:gap-y-7" priorityCol={undefined}                    />
                    <ImageColumn
                      images={col3}
                      gapClass="gap-y-3 sm:gap-y-4 lg:gap-y-8" priorityCol={undefined}                    />
                  </motion.div>
                </div>
              </div>
              <motion.div
                className="mt-12 flex justify-center sm:mt-16 lg:justify-start lg:mt-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Tooltip content="View In Gallery" style="dark">
                  <motion.a
                    href="/Gallery"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{ scale: [1, 1.03, 1] }}
                    transition={{
                      scale: {
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                    className="inline-block rounded-full border border-transparent bg-[#0a4d30] px-8 py-4 text-center text-sm font-semibold text-white sm:px-10 sm:text-base shadow-md hover:shadow-lg hover:shadow-[#0a4d30]/20 transition-shadow duration-300"
                  >
                    See What You Missed
                  </motion.a>
                </Tooltip>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
