import { lazy, Suspense } from "react";
import AboutHero from "../components/ui/About/Hero";

const MeetTheTeam = lazy(() => import("../components/ui/About/OurTeam"));
//const OurStory = lazy(() => import("../components/ui/About/OurStory"));
const VisionMission = lazy(() => import("../components/ui/About/OurMission"));

function SectionFallback({ minHeight = "min-h-96" }: { minHeight?: string }) {
  return (
    <div
      className={`${minHeight} w-full animate-pulse bg-gray-100 rounded-3xl m-2`}
    />
  );
}

export default function AboutPage() {
  return (
    <main className="bg-white min-h-screen">
      <AboutHero />

      <Suspense fallback={<SectionFallback minHeight="min-h-96" />}>
        <VisionMission />
      </Suspense>

      <Suspense fallback={<SectionFallback minHeight="min-h-125" />}>
        <MeetTheTeam />
      </Suspense>

      {/* <Suspense fallback={<SectionFallback minHeight="min-h-96" />}>
        <OurStory />
      </Suspense> */}
    </main>
  );
}
