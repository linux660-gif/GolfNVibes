import PartnerCategories from "../components/ui/Partners/Category";
import PartnersHero from "../components/ui/Partners/Hero";
import PartnerStats from "../components/ui/Partners/PartnerStats";

export default function Partners() {
  return (
    <main className="bg-white">
      <PartnersHero />
      <PartnerCategories />
      <PartnerStats />
    </main>
  );
}
