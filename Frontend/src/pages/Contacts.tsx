import ContactGrid from "../components/ui/Contacts/Grid";
import ContactHero from "../components/ui/Contacts/Hero";


export default function ContactPage() {
  return (
    <main className="bg-zinc-950 min-h-screen">
      <ContactHero />
      <ContactGrid />
    </main>
  );
}
