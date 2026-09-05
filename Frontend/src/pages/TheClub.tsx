import { lazy, Suspense } from "react";
import ClubHero from "../components/ui/Club/Hero";

const MemberBenefits = lazy(
  () => import("../components/ui/Club/MemberBenefits"),
);
const UpcomingClubEvents = lazy(
  () => import("../components/ui/Club/UpcomingEvents"),
);
const MemberOffers = lazy(() => import("../components/ui/Club/MemberOffers"));
const Testimonials = lazy(() => import("../components/ui/Club/Testimonials"));
const Membership = lazy(() => import("../components/ui/Club/Membership"));

function SectionFallback({
  minHeight = "min-h-96",
  dark = false,
}: {
  minHeight?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`${minHeight} w-full animate-pulse rounded-4xl m-4 ${
        dark ? "bg-zinc-900" : "bg-gray-100"
      }`}
    />
  );
}

export default function GolfNVibesClubPage() {
  return (
    <main className="bg-gray-200 min-h-screen">
      <ClubHero />

      <Suspense fallback={<SectionFallback dark />}>
        <MemberBenefits />
      </Suspense>

      <Suspense fallback={<SectionFallback minHeight="min-h-125" dark />}>
        <UpcomingClubEvents />
      </Suspense>

      <Suspense fallback={<SectionFallback dark />}>
        <MemberOffers />
      </Suspense>

      <Suspense fallback={<SectionFallback minHeight="min-h-125" />}>
        <Testimonials />
      </Suspense>

      <Suspense fallback={<SectionFallback minHeight="min-h-150" />}>
        <Membership />
      </Suspense>
    </main>
  );
}
