import { lazy, Suspense } from "react";
import EventHero from "../components/ui/Events&Tournaments/Hero";
import { LineWave } from "react-loader-spinner";

const EventFeature = lazy(
  () => import("../components/ui/Events&Tournaments/Feature"),
);
const PastEvents = lazy(
  () => import("../components/ui/Events&Tournaments/PastEvents"),
);
const EventCalendar = lazy(
  () => import("../components/ui/Events&Tournaments/Calendar"),
);
const TournamentResults = lazy(
  () => import("../components/ui/Events&Tournaments/TournamentResults"),
);
const HostEvent = lazy(
  () => import("../components/ui/Events&Tournaments/Host"),
);

function SectionFallback({ minHeight = "min-h-96" }: { minHeight?: string }) {
  return (
    <div
      className={`${minHeight} flex items-center justify-center w-full`}
    >
      <LineWave
        visible={true}
        height="150"
        width="150"
        color="#4fa94d"
        ariaLabel="line-wave-loading"
        wrapperStyle={{}}
        wrapperClass=""
        firstLineColor=""
        middleLineColor=""
        lastLineColor=""
      />
    </div>
  );
}

export default function Tournaments() {
  return (
    <main className="bg-white min-h-screen">
      <EventHero />

      <Suspense fallback={<SectionFallback />}>
        <EventFeature />
      </Suspense>

      <Suspense fallback={<SectionFallback minHeight="min-h-125" />}>
        <PastEvents />
      </Suspense>

      <Suspense fallback={<SectionFallback minHeight="min-h-150" />}>
        <div id="event-calendar">
          <EventCalendar />
        </div>
      </Suspense>

      <Suspense fallback={<SectionFallback minHeight="min-h-96" />}>
        <TournamentResults />
      </Suspense>

      <Suspense fallback={<SectionFallback minHeight="min-h-125" />}>
        <HostEvent />
      </Suspense>
    </main>
  );
}
