import { useEffect, useMemo, useState, useCallback } from "react";
import {
  MagnifyingGlassPlusIcon,
  MapPinIcon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";

export interface GalleryItem {
  id: string;
  category: "holidays" | "tournaments" | "community" | "corporate";
  title: string;
  location: string;
  image: string;
}

const CATEGORY_LABELS: Record<GalleryItem["category"], string> = {
  holidays: "Golf Holidays",
  tournaments: "Tournaments",
  community: "Community",
  corporate: "Corporate Events",
};

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "1",
    category: "holidays",
    title: "Moroccan Oasis Luxury Escape",
    location: "Mazagan, Morocco",
    image: "https://golfnvibes.com/uploads/media/images/GalleryImage1.JPG",
  },
  {
    id: "2",
    category: "tournaments",
    title: "Sunset Scramble Championship",
    location: "Vipingo Ridge, Kenya",
    image: "https://golfnvibes.com/uploads/media/images/GalleryImage2.JPG",
  },
  {
    id: "3",
    category: "community",
    title: "Post-Round Sundowner & Vibes",
    location: "Arusha, Tanzania",
    image: "https://golfnvibes.com/uploads/media/images/GalleryImage3.JPG",
  },
  {
    id: "4",
    category: "corporate",
    title: "Executive Golf Invitational",
    location: "Nairobi, Kenya",
    image: "https://golfnvibes.com/uploads/media/images/GalleryImage20.JPG",
  },
  {
    id: "5",
    category: "holidays",
    title: "Coastal Fairways Retreat",
    location: "Mombasa, Kenya",
    image: "https://golfnvibes.com/uploads/media/images/GalleryImage5.JPG",
  },
  {
    id: "6",
    category: "tournaments",
    title: "VIP Match Play Finals",
    location: "Augusta, USA",
    image: "https://golfnvibes.com/uploads/media/images/GalleryImage19.JPG",
  },
  {
    id: "7",
    category: "holidays",
    title: "Moroccan Oasis Luxury Escape",
    location: "Mazagan, Morocco",
    image: "https://golfnvibes.com/uploads/media/images/GalleryImage7.JPG",
  },
  {
    id: "8",
    category: "tournaments",
    title: "Sunset Scramble Championship",
    location: "Vipingo Ridge, Kenya",
    image: "https://golfnvibes.com/uploads/media/images/GalleryImage8.JPG",
  },
  {
    id: "9",
    category: "community",
    title: "Post-Round Sundowner & Vibes",
    location: "Arusha, Tanzania",
    image: "https://golfnvibes.com/uploads/media/images/GalleryImage9.JPG",
  },
  {
    id: "10",
    category: "corporate",
    title: "Executive Golf Invitational",
    location: "Nairobi, Kenya",
    image: "https://golfnvibes.com/uploads/media/images/GalleryImage10.JPG",
  },
  {
    id: "11",
    category: "holidays",
    title: "Coastal Fairways Retreat",
    location: "Mombasa, Kenya",
    image: "https://golfnvibes.com/uploads/media/images/GalleryImage11.JPG",
  },
  {
    id: "12",
    category: "tournaments",
    title: "VIP Match Play Finals",
    location: "Augusta, USA",
    image: "https://golfnvibes.com/uploads/media/images/GalleryImage12.JPG",
  },
  {
    id: "13",
    category: "holidays",
    title: "Moroccan Oasis Luxury Escape",
    location: "Mazagan, Morocco",
    image: "https://golfnvibes.com/uploads/media/images/GalleryImage13.JPG",
  },
  {
    id: "14",
    category: "tournaments",
    title: "Sunset Scramble Championship",
    location: "Vipingo Ridge, Kenya",
    image: "https://golfnvibes.com/uploads/media/images/GalleryImage14.JPG",
  },
  {
    id: "15",
    category: "community",
    title: "Post-Round Sundowner & Vibes",
    location: "Arusha, Tanzania",
    image: "https://golfnvibes.com/uploads/media/images/GalleryImage15.JPG",
  },
  {
    id: "16",
    category: "corporate",
    title: "Executive Golf Invitational",
    location: "Nairobi, Kenya",
    image: "https://golfnvibes.com/uploads/media/images/GalleryImage16.JPG",
  },
  {
    id: "17",
    category: "holidays",
    title: "Coastal Fairways Retreat",
    location: "Mombasa, Kenya",
    image: "https://golfnvibes.com/uploads/media/images/GalleryImage17.JPG",
  },
  {
    id: "18",
    category: "tournaments",
    title: "VIP Match Play Finals",
    location: "Augusta, USA",
    image: "https://golfnvibes.com/uploads/media/images/GalleryImage18.JPG",
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
  onOpen,
}: {
  item: GalleryItem;
  priority: boolean;
  onOpen: (item: GalleryItem) => void;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onOpen(item)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(item);
        }
      }}
      aria-label={`View ${item.title} in ${item.location}`}
      className="group relative mb-6 break-inside-avoid rounded-2xl overflow-hidden bg-white border border-zinc-200 hover:border-[#D4AF37] transition-colors duration-300 cursor-pointer shadow-sm hover:shadow-xl focus-visible:ring-2 focus-visible:ring-[#0a4d30] focus-visible:outline-none"
    >
      <img
        src={item.image}
        alt={item.title}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        width={800}
        height={600}
        className="w-full h-auto object-cover"
      />

      <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 group-focus-visible:translate-y-0 transition-transform duration-300 ease-out bg-white/95 backdrop-blur-sm border-t border-[#D4AF37]/30 p-4">
        <span className="text-[10px] uppercase font-semibold tracking-widest text-[#bd982e]">
          {CATEGORY_LABELS[item.category]}
        </span>
        <h3 className="text-sm font-serif font-bold text-black mt-1 leading-snug">
          {item.title}
        </h3>
        <div className="flex items-center gap-1.5 text-xs text-zinc-500 mt-1">
          <MapPinIcon className="w-3.5 h-3.5 text-[#bd982e]" />
          <span>{item.location}</span>
        </div>
      </div>

      <div className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-[#0a4d30] opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
        <MagnifyingGlassPlusIcon className="w-4 h-4" />
      </div>
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
        ): (
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
          aria-label={lightboxImage.title}
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
              alt={lightboxImage.title}
              loading="eager"
              decoding="async"
              className="w-full h-auto max-h-[75vh] object-contain"
            />
            <div className="p-4 text-center border-t border-zinc-100">
              <span className="text-[10px] uppercase font-semibold tracking-widest text-[#bd982e]">
                {CATEGORY_LABELS[lightboxImage.category]}
              </span>
              <h3 className="text-lg font-serif font-bold text-black mt-1">
                {lightboxImage.title}
              </h3>
              <p className="text-xs text-zinc-500 mt-1">
                {lightboxImage.location}
              </p>
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
