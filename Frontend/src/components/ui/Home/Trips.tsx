import { Button, Card } from "flowbite-react";
import { Suspense, useEffect, useRef, useState } from "react";

const TRIPS = [
  {
    id: "trip-1",
    title: "Kipipiri Golf Weekend",
    description:
      "Spend your mornings hacking it out on Gary Player’s coastal links and your nights exploring the vibrant, neon-lit souks and luxury rooftop lounges of Morocco.",
    location: "El Jadida & Marrakech, Morocco",
    posterURL: "https://golfnvibes.com/uploads/media/images/trip1.JPG",
    videoUrl: "https://golfnvibes.com/uploads/media/videos/intt(1).mp4",
    webmformat: "https://golfnvibes.com/uploads/media/videos/intt(1).webm",
  },
  {
    id: "trip-2",
    title: "⁠Limuru Cowboys Special",
    description:
      "Championship-grade golf tucked away in the lush Hua Hin foothills, rounded out with private villa pool parties, street food safaris, and ultimate tropical relaxation.",
    location: "Hua Hin, Thailand",
    rating: 4.9,
    posterURL: "https://golfnvibes.com/uploads/media/images/trip2.JPG",
    videoUrl: "https://golfnvibes.com/uploads/media/videos/limurucowboy.mp4",
    webmformat: "https://golfnvibes.com/uploads/media/videos/limurucowboy.webm",
    reviews: 378,
  },
  {
    id: "trip-3",
    title: "⁠Naivasha Weekender",
    description:
      "Tee off on East Africa’s only PGA-accredited course alongside wild roaming zebras, then head down to a private Indian Ocean beach club for fresh seafood and sunset DJ sets.",
    location: "Vipingo Ridge, Kenya",
    rating: 4.7,
    posterURL: "https://golfnvibes.com/uploads/media/images/trip3.JPG",
    videoUrl: "https://golfnvibes.com/uploads/media/videos/dinner2.mp4",
    webmformat: "https://golfnvibes.com/uploads/media/videos/dinner2.webm",
    reviews: 259,
  },
  {
    id: "trip-4",
    title: "⁠Morocco Desert Swing",
    description:
      "Tee off on East Africa’s only PGA-accredited course alongside wild roaming zebras, then head down to a private Indian Ocean beach club for fresh seafood and sunset DJ sets.",
    location: "Vipingo Ridge, Kenya",
    posterURL: "https://golfnvibes.com/uploads/media/images/trip4.JPG",
    videoUrl: "https://golfnvibes.com/uploads/media/videos/MorrocoSwing.mp4",
    webmformat: "https://golfnvibes.com/uploads/media/videos/MorrocoSwing.webm",
  },
];



function VideoSkeleton() {
  return (
    <div className="absolute inset-0 bg-linear-to-br from-black/40 to-black/10 animate-pulse" />
  );
}

function LazyVideo({ src, poster, srcwebm }: { src: string; poster?: string; srcwebm:string }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="absolute inset-0">
      {!loaded && <VideoSkeleton />}
      {inView && (
        <video
          className={`w-full h-full object-cover transform group-hover:scale-105 transition-all duration-500 ease-out ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          muted
          autoPlay
          loop
          playsInline
          preload="metadata"
          poster={poster}
          disablePictureInPicture
          onLoadedData={() => setLoaded(true)}
        >
          <source src={src} type="video/mp4" />
          <source src={srcwebm} type="video/webm" /> 
        </video>
      )}
    </div>
  );
}

export default function GNVTrips() {
  return (
    <div className="relative flex flex-col gap-6 bg-[#046307] rounded-3xl sm:rounded-4xl m-2 p-4 sm:p-6 lg:p-10 text-white overflow-hidden">
      <div className="flex flex-col gap-3 items-center text-center mt-6 max-w-2xl mx-auto px-4">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white">
          A Great Time For Everyone
        </h1>
        <p className="text-gray-200 text-xs sm:text-sm md:text-base leading-relaxed">
          Perfect Your Swing, Play world famous courses or Simply enjoy a Fun
          day out with GolfNVibes
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex xl:grid-cols-4 gap-6 my-4 w-full">
        {TRIPS.map((trip) => (
          <Card
            key={trip.id}
            className="relative shadow-none w-full bg-transparent! border-none! flex flex-col overflow-hidden group"
            horizontal={false}
          >
            <div className="relative w-full h-100 sm:h-115 lg:h-125 rounded-2xl overflow-hidden before:absolute before:inset-0 before:bg-linear-to-t before:from-black/90 before:via-black/40 before:to-transparent before:z-10">
              <Suspense fallback={<VideoSkeleton />}>
                <LazyVideo src={trip.videoUrl} poster={trip.posterURL} srcwebm={trip.webmformat} />
              </Suspense>
            </div>
            <div className="absolute inset-x-0 bottom-0 z-20 lg:p-5 lg:m-4 p-10 text-white">
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                {trip.title}
              </h2>
              <p className="mt-2 text-xs sm:text-sm font-normal text-gray-200 line-clamp-3 leading-relaxed">
                {trip.description}
              </p>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex justify-center mb-6">
        <Button
          href="/Tournaments"
          className="border border-white/40 rounded-full bg-transparent! px-6 text-white text-center hover:bg-white/10 transition-colors focus:ring-2 focus:ring-white/50"
        >
          View All Past Events
        </Button>
      </div>
    </div>
  );
}