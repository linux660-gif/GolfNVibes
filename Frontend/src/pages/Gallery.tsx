import { useState } from "react";
import GalleryCTA from "../components/ui/Gallery/CTA";
import GalleryHero from "../components/ui/Gallery/GalleryHero";
import MediaGrid from "../components/ui/Gallery/MediaGrid";
import VideoShowcase from "../components/ui/Gallery/VideoShowCase";
;

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState<string>("all");

  return (
    <main className="bg-white">
      <GalleryHero activeTab={activeTab} setActiveTab={setActiveTab} />
      <MediaGrid activeTab={activeTab} />
      <VideoShowcase activeTab={activeTab} />
      <GalleryCTA />
    </main>
  );
}
