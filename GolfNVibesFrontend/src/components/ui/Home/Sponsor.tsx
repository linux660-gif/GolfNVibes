import { Button } from "flowbite-react";
import { FaHandshake } from "react-icons/fa";
import Typewriter from "typewriter-effect";

const SPONSOR_MESSAGES = [
  "Align Your Cause With Us",
  "Collaborate With Us To Expand Your Reach.",
  "Team Up With Us For Mutual Growth.",
];

export default function GNVSponsor() {
  return (
    <section
      aria-label="Sponsorship call to action"
      className="bg-gray-200 rounded-3xl m-2 py-6 sm:py-24 lg:py-15 px-4 flex items-center justify-center"
    >
      <div className="flex flex-col items-center justify-center text-center w-full max-w-2xl">
        <h2 className="sr-only">{SPONSOR_MESSAGES[0]}</h2>
        <div
          aria-hidden="true"
          className="text-2xl sm:text-3xl md:text-4xl tracking-tight text-black font-bold px-2 min-h-16 sm:min-h-20 flex items-center justify-center text-balance"
        >
          <Typewriter
            options={{
              strings: SPONSOR_MESSAGES,
              autoStart: true,
              loop: true,
              cursor: '<span style="color: #0a4d30;">_</span>',
            }}
          />
        </div>
        <div className="mt-6 flex justify-center w-full">
          <Button
            href="/Partners"
            className="flex gap-2.5 bg-white! text-black font-semibold hover:bg-[#bd982e]! hover:text-[#0a4d30]! transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[#0a4d30] focus-visible:ring-offset-2"
          >
            <FaHandshake size={28} />
            Become a Sponsor
          </Button>
        </div>
      </div>
    </section>
  );
}
