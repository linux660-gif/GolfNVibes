import PartnerLogoMarquee from "../components/common/partnerlogo";
import PartnerCategories from "../components/ui/Partners/Category";
import PartnersHero from "../components/ui/Partners/Hero";
import PartnerStats from "../components/ui/Partners/PartnerStats";

export default function Partners() {
  return (
    <main className="bg-white">
      <PartnersHero />
      <PartnerCategories />
      <PartnerLogoMarquee
        logos={[
          {
            id: "mtickets",
            name: "mtickets",
            logo: "https://golfnvibes.com/uploads/media/images/partners/mtickets.png",
          },
          {
            id: "optica",
            name: "Optica",
            size: "h-20",
            logo: "https://golfnvibes.com/uploads/media/images/partners/optica.png",
          },
          {
            id: "afro-street-kollektions",
            name: "Afro Street Kollektions",
            size: "h-22",
            logo: "https://golfnvibes.com/uploads/media/images/partners/afrostreet.png",
          },
          {
            id: "savannah-premium-cider",
            name: "Savannah Premium Cider",
            size: "h-20",
            logo: "https://golfnvibes.com/uploads/media/images/partners/savannah.png",
          },
          {
            id: "en-golf",
            name: "ENGolf",
            size: "h-20",
            logo: "https://golfnvibes.com/uploads/media/images/partners/engolf.png",
          },
          {
            id: "segera",
            name: "Segera",
            size: "h-25",
            logo: "https://golfnvibes.com/uploads/media/images/partners/segera.png",
          },

          {
            id: "regal-decon",
            name: "Regal Decon",
            size: "h-25",
            logo: "https://golfnvibes.com/uploads/media/images/partners/regaldecon.png",
          },

          {
            id: "karen-flea-market",
            name: "Karen Flea Market",
            size: "h-30",
            logo: "https://golfnvibes.com/uploads/media/images/partners/karenflea.png",
          },
          {
            id: "techno-comp-solutions",
            name: "Techno Comp Solutions",
            size: "h-20",
            logo: "https://golfnvibes.com/uploads/media/images/partners/technocomp.png",
          },
          {
            id: "lea-premium-flour",
            name: "Lea Premium Flour",
            size: "h-25",
            logo: "https://golfnvibes.com/uploads/media/images/partners/leapremium.png",
          },
          {
            id: "mozzart-bet",
            name: "Mozzart Bet",
            size: "h-27",
            logo: "https://golfnvibes.com/uploads/media/images/partners/mozzart.png",
          },
        ]}
      />
      <PartnerStats />
    </main>
  );
}
