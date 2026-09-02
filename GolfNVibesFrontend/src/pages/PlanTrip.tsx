import { lazy, Suspense } from "react";
import PlanTripHero from "../components/ui/PlanTrip/Hero";

const PlanTripForm = lazy(() => import("../components/forms/PlanMyTrip"));

function FormFallback() {
  return (
    <div className="mx-auto my-8 w-full max-w-7xl min-h-150 animate-pulse rounded-2xl bg-slate-100 lg:my-16" />
  );
}

export default function PlanTripPage() {
  return (
    <>
      <PlanTripHero />
      <Suspense fallback={<FormFallback />}>
        <PlanTripForm />
      </Suspense>
    </>
  );
}
