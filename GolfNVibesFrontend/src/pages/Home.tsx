import { lazy, Suspense } from "react";
import GNVHero from "../components/ui/Home/Hero";

const GNVUpcomingTour = lazy(
  () => import("../components/ui/Home/UpcomingTour"),
);
const GNVFeature = lazy(() => import("../components/ui/Home/Feature"));
const GNVTournaments = lazy(() => import("../components/ui/Home/Tournaments"));
const GNVSponsor = lazy(() => import("../components/ui/Home/Sponsor"));
const GalleryHomePage = lazy(() => import("../components/ui/Home/Gallery"));
const GNVTrips = lazy(() => import("../components/ui/Home/Trips"));
const GNVDestination = lazy(() => import("../components/ui/Home/Destination"));
const GNVNewsletter = lazy(() => import("../components/ui/Home/Newsletter"));

function SectionFallback({ minHeight = "min-h-96" }: { minHeight?: string }) {
  return (
    <div
      className={`${minHeight} w-full animate-pulse bg-gray-100 rounded-3xl m-2`}
    />
  );
}

export default function Home() {
  return (
    <>
      <GNVHero />

      <Suspense fallback={<SectionFallback minHeight="min-h-125" />}>
        <GNVUpcomingTour />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <GNVFeature />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <GNVTournaments />
      </Suspense>

      <Suspense fallback={<SectionFallback minHeight="min-h-64" />}>
        <GNVSponsor />
      </Suspense>

      <div className="relative h-150">
        <Suspense fallback={<SectionFallback minHeight="h-150" />}>
          <GalleryHomePage
            bend={1}
            textColor="#355E3B"
            borderRadius={0.05}
            scrollEase={0.05}
            fontUrl=""
            font="bold 30px Orbitron"
            scrollSpeed={2}
          />
        </Suspense>
      </div>

      <Suspense fallback={<SectionFallback />}>
        <GNVTrips />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <GNVDestination />
      </Suspense>

      <Suspense fallback={<SectionFallback minHeight="min-h-64" />}>
        <GNVNewsletter />
      </Suspense>
    </>
  );
}
