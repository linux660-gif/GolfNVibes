import { useEffect, useMemo, useState, useCallback } from "react";
import {
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";

export interface GalleryItem {
  id: string;
  category: "holidays" | "tournaments";
  description: string;

  image: string;
}

const CATEGORY_LABELS: Record<GalleryItem["category"], string> = {
  holidays: "Golf Holidays",
  tournaments: "Tournaments",
};

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "1",
    category: "holidays",
    description:
      "An exclusive getaway featuring world-class golfing, luxury accommodations, and stunning desert landscapes.",
    image:
      "https://golfnvibes.com/uploads/media/images/Gallery/holidays/holidays1.jpeg",
  },
  {
    id: "2",
    category: "tournaments",
    description:
      "A competitive late-afternoon tournament offering pristine fairway play as the sun sets over the course.",
    image:
      "https://golfnvibes.com/uploads/media/images/Gallery/tournaments/tournaments1.jpeg",
  },
  {
    id: "3",
    category: "holidays",
    description:
      "Relax after 18 holes with premium drinks, live music, and unbeatable sunset views by the clubhouse.",
    image:
      "https://golfnvibes.com/uploads/media/images/Gallery/holidays/holidays3.jpeg",
  },
  {
    id: "4",
    category: "tournaments",
    description:
      "A prestigious gathering of top-tier golfers competing for corporate honors across 18 championship holes.",
    image:
      "https://golfnvibes.com/uploads/media/images/Gallery/tournaments/tournaments14.jpeg",
  },
  {
    id: "5",
    category: "holidays",
    description:
      "Unwind at a seaside resort combining refreshing ocean breezes with oceanfront golf courses.",
    image:
      "https://golfnvibes.com/uploads/media/images/Gallery/holidays/holidays6.jpeg",
  },
  {
    id: "6",
    category: "tournaments",
    description:
      "High-stakes head-to-head competition bringing together elite players to crown the ultimate champion.",
    image:
      "https://golfnvibes.com/uploads/media/images/Gallery/tournaments/tournaments4.jpeg",
  },
  {
    id: "7",
    category: "holidays",
    description:
      "Immerse yourself in rich culture and pampering spa treatments alongside world-class golf fairways.",
    image:
      "https://golfnvibes.com/uploads/media/images/Gallery/holidays/holidays6.jpeg",
  },
  {
    id: "8",
    category: "tournaments",
    description:
      "Fast-paced team scramble format designed for strategic play and evening celebration on the green.",
    image:
      "https://golfnvibes.com/uploads/media/images/Gallery/tournaments/tournaments6.jpeg",
  },
  {
    id: "9",
    category: "holidays",
    description:
      "The ultimate post-game social atmosphere featuring great music, craft cocktails, and good company.",
    image:
      "https://golfnvibes.com/uploads/media/images/Gallery/holidays/holidays12.jpeg",
  },
  {
    id: "10",
    category: "tournaments",
    description:
      "An invitation-only event tailored for business leaders, blending networking with high-end golf play.",
    image:
      "https://golfnvibes.com/uploads/media/images/Gallery/tournaments/tournaments13.webp",
  },
  {
    id: "11",
    category: "holidays",
    description:
      "Escape to a tropical paradise featuring scenic coastal views and luxury golf villas.",
    image:
      "https://golfnvibes.com/uploads/media/images/Gallery/tournaments/tournaments12.webp",
  },
  {
    id: "12",
    category: "tournaments",
    description:
      "The final showdown of the season where top contenders fight for match play glory.",
    image:
      "https://golfnvibes.com/uploads/media/images/Gallery/tournaments/tournaments25.jpeg",
  },
  {
    id: "13",
    category: "holidays",
    description:
      "Experience exotic hospitality, fine dining, and endless sunshine on premier resort courses.",
    image:
      "https://golfnvibes.com/uploads/media/images/Gallery/tournaments/tournaments11.webp",
  },
  {
    id: "14",
    category: "tournaments",
    description:
      "Golden hour golf at its finest, featuring fun team formats and post-match trophy presentations.",
    image:
      "https://golfnvibes.com/uploads/media/images/Gallery/tournaments/tournaments29.jpeg",
  },
  {
    id: "15",
    category: "holidays",
    description:
      "Soak in the vibrant evening energy with poolside drinks and lounge vibes following a great round.",
    image:
      "https://golfnvibes.com/uploads/media/images/Gallery/tournaments/tournaments5.jpeg",
  },
  {
    id: "16",
    category: "tournaments",
    description:
      "An elite showcase of skill and precision hosted on a challenging championship-grade course.",
    image:
      "https://golfnvibes.com/uploads/media/images/Gallery/tournaments/tournaments2.jpeg",
  },

  {
    id: "16",
    category: "tournaments",
    description:
      "An elite showcase of skill and precision hosted on a challenging championship-grade course.",
    image:
      "https://golfnvibes.com/uploads/media/images/Gallery/tournaments/tournaments21.jpeg",
  },
];

const PRIORITY_COUNT = 4;

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <PhotoIcon className="w-10 h-10 text-zinc-300 mb-3" />
      <p className="text-sm text-zinc-500 max-w-sm">{message}</p>
    </div>
  );
}

function GalleryCard({
  item,
  priority,
  // onOpen,
}: {
  item: GalleryItem;
  priority: boolean;
  onOpen: (item: GalleryItem) => void;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      // onClick={() => onOpen(item)}
      // onKeyDown={(e) => {
      //   if (e.key === "Enter" || e.key === " ") {
      //     e.preventDefault();
      //     onOpen(item);
      //   }
      // }}
      aria-label={`View ${item.description}`}
      className="group relative mb-6 break-inside-avoid rounded-2xl overflow-hidden bg-white border border-zinc-200 hover:border-[#D4AF37] transition-colors duration-300 cursor-pointer shadow-sm hover:shadow-xl focus-visible:ring-2 focus-visible:ring-[#0a4d30] focus-visible:outline-none"
    >
      <img
        src={item.image}
        alt={item.description}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        width={800}
        height={600}
        className="w-full h-auto object-cover"
      />
    </div>
  );
}

export default function MediaGrid({ activeTab }: { activeTab: string }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = useMemo(
    () =>
      activeTab === "all"
        ? GALLERY_ITEMS
        : GALLERY_ITEMS.filter((item) => item.category === activeTab),
    [activeTab],
  );

  const lightboxImage =
    lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  const showPrev = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + filteredItems.length) % filteredItems.length,
    );
  }, [filteredItems.length]);

  const showNext = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : (i + 1) % filteredItems.length,
    );
  }, [filteredItems.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;

    document.body.classList.add("overflow-hidden");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.classList.remove("overflow-hidden");
      window.removeEventListener("keydown", onKey);
    };
  }, [lightboxIndex, showPrev, showNext]);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {activeTab === "videos" ? null : filteredItems.length === 0 ? (
          <EmptyState message="No media found in this category yet." />
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
            {filteredItems.map((item, idx) => (
              <GalleryCard
                key={item.id}
                item={item}
                priority={idx < PRIORITY_COUNT}
                onOpen={() => setLightboxIndex(idx)}
              />
            ))}
          </div>
        )}
      </div>

      {lightboxImage && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setLightboxIndex(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md cursor-pointer"
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            aria-label="Previous image"
            className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full rounded-2xl overflow-hidden bg-white border border-[#D4AF37]/40 cursor-default"
          >
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              aria-label="Close"
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 text-[#0a4d30] hover:bg-white transition-colors shadow-md focus-visible:ring-2 focus-visible:ring-[#0a4d30]"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
            <img
              src={lightboxImage.image}
              alt={lightboxImage.description}
              loading="eager"
              decoding="async"
              className="w-full h-auto max-h-[75vh] object-contain"
            />
            <div className="p-4 text-center border-t border-zinc-100">
              <span className="text-[10px] uppercase font-semibold tracking-widest text-[#bd982e]">
                {CATEGORY_LABELS[lightboxImage.category]}
              </span>
              {/* <h3 className="text-lg font-serif font-bold text-black mt-1">
                {lightboxImage.title}
              </h3>
              <p className="text-xs text-zinc-500 mt-1">
                {lightboxImage.location}
              </p> */}
              {filteredItems.length > 1 && (
                <p className="text-[11px] text-zinc-400 mt-2">
                  {(lightboxIndex ?? 0) + 1} of {filteredItems.length}
                </p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            aria-label="Next image"
            className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </div>
      )}
    </section>
  );
}
