import { useEffect, useState } from "react";
import { PlayIcon } from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface VideoItem {
  id: string;
  title: string;
  duration: string;
  src: string;
}

const VIDEOS: VideoItem[] = [
  {
    id: "v1",
    title: "Morocco Golf Experience 2026 Official Aftermovie",
    duration: "03:45",
    src: "https://golfnvibes.com/uploads/media/videos/hero.mp4",
  },
  {
    id: "v2",
    title: "Vipingo Ridge Night Golf & Live DJ Highlights",
    duration: "02:10",
    src: "https://golfnvibes.com/uploads/media/videos/vipingo.mp4",
  },
];

function VideoCard({
  video,
  onPlay,
}: {
  video: VideoItem;
  onPlay: (video: VideoItem) => void;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onPlay(video)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onPlay(video);
        }
      }}
      aria-label={`Play video: ${video.title}`}
      className="group relative rounded-2xl overflow-hidden bg-white border border-zinc-200 hover:border-[#D4AF37]/60 transition-all duration-500 shadow-lg hover:shadow-xl cursor-pointer focus-visible:ring-2 focus-visible:ring-[#0a4d30] focus-visible:outline-none"
    >
      <div className="aspect-video w-full relative overflow-hidden bg-zinc-900">
        <video
          src={video.src}
          preload="metadata"
          muted
          playsInline
          aria-hidden="true"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />

        <span className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-[#D4AF37] text-zinc-950 flex items-center justify-center shadow-lg shadow-[#D4AF37]/30 group-hover:scale-110 transition-transform duration-300">
          <PlayIcon className="w-7 h-7 ml-1" />
        </span>

        <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-zinc-950/80 text-[10px] font-mono text-zinc-300 border border-zinc-800">
          {video.duration}
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-base font-serif font-bold text-black group-hover:text-[#bd982e] transition-colors">
          {video.title}
        </h3>
      </div>
    </div>
  );
}

export default function VideoShowcase({ activeTab }: { activeTab: string }) {
  const [playingVideo, setPlayingVideo] = useState<VideoItem | null>(null);

  useEffect(() => {
    if (!playingVideo) return;

    document.body.classList.add("overflow-hidden");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPlayingVideo(null);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.classList.remove("overflow-hidden");
      window.removeEventListener("keydown", onKey);
    };
  }, [playingVideo]);

  if (activeTab !== "all" && activeTab !== "videos") return null;

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-12 text-black border-t border-zinc-200">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="space-y-2">
          <span className="text-[10px] sm:text-xs tracking-widest font-semibold uppercase text-[#0a4d30]">
            Cinematic Highlights
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-black">
            Video Gallery
          </h2>
          <div className="w-12 h-0.5 bg-[#D4AF37]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {VIDEOS.map((video) => (
            <VideoCard key={video.id} video={video} onPlay={setPlayingVideo} />
          ))}
        </div>
      </div>

      {playingVideo && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={playingVideo.title}
          onClick={() => setPlayingVideo(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl rounded-2xl overflow-hidden bg-black border border-[#D4AF37]/40 cursor-default"
          >
            <button
              type="button"
              onClick={() => setPlayingVideo(null)}
              aria-label="Close"
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 text-[#0a4d30] hover:bg-white transition-colors shadow-md focus-visible:ring-2 focus-visible:ring-[#0a4d30]"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
            <video
              src={playingVideo.src}
              controls
              autoPlay
              playsInline
              className="w-full aspect-video"
            >
              <track kind="captions" />
            </video>
            <div className="p-4 text-center bg-zinc-950">
              <h3 className="text-base font-serif font-bold text-white">
                {playingVideo.title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
