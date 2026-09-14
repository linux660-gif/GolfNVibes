import { useMemo } from "react";

export interface PartnerLogo {
  id: string;
  name: string;
  logo?: string;
  href?: string;
  size?:string;
}

interface PartnerLogoMarqueeProps {
  logos?: PartnerLogo[];
  eyebrow?: string;
  heading?: string;
  secondsPerLogo?: number;
  className?: string;
}

const DEFAULT_LOGOS: PartnerLogo[] = [
  { id: "mtickets", name: "mtickets" },
  { id: "optica", name: "Optica" },
  { id: "afro-street-kollektions", name: "Afro Street Kollektions" },
  { id: "print-kollekt", name: "Print Kollekt" },
  { id: "luton-hospital", name: "Luton Hospital" },
  { id: "savannah-premium-cider", name: "Savannah Premium Cider" },
  { id: "en-golf", name: "ENGolf" },
  { id: "segera", name: "Segera" },
];

function LogoItem({ logo }: { logo: PartnerLogo }) {
  const Tag = logo.href ? "a" : "div";

  const content = logo.logo ? (
    <img
      src={logo.logo}
      alt={logo.name}
      loading="lazy"
      decoding="async"
      className={`w-auto object-contain transition-all duration-300 group-hover:grayscale-0 ${logo.size ?? "h-9"}`}
    />
  ) : (
    <span className="whitespace-nowrap text-sm font-bold uppercase tracking-[0.15em] text-zinc-400 transition-colors duration-300 group-hover:text-[#0a4d30] sm:text-base">
      {logo.name}
    </span>
  );

  return (
    <Tag
      {...(logo.href
        ? { href: logo.href, target: "_blank", rel: "noopener noreferrer" }
        : {})}
      className="group mx-8 flex shrink-0 items-center justify-center sm:mx-12"
      aria-label={logo.href ? logo.name : undefined}
    >
      {content}
    </Tag>
  );
}

export default function PartnerLogoMarquee({
  logos = DEFAULT_LOGOS,
  eyebrow = "Trusted By",
  heading = "Our Global Partners",
  secondsPerLogo = 3,
  className = "",
}: PartnerLogoMarqueeProps) {
  const duration = useMemo(
    () => Math.max(logos.length * secondsPerLogo, 10),
    [logos.length, secondsPerLogo],
  );

  if (logos.length === 0) return null;

  return (
    <section
      className={`rounded-3xl sm:rounded-4xl m-2 sm:m-4 bg-white px-4 py-12 sm:px-6 sm:py-16 border border-zinc-200 ${className}`}
    >
      <style>{`
        @keyframes gnv-logo-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .gnv-marquee-track {
          animation: gnv-logo-marquee var(--gnv-marquee-duration, 30s) linear infinite;
        }
        .gnv-marquee-track:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .gnv-marquee-track {
            animation: none;
          }
        }
      `}</style>

      <div className="mx-auto max-w-7xl text-center">
        <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
          {eyebrow}
        </span>
        <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-black">
          {heading}
        </h2>
        <div className="mx-auto mt-3 h-0.5 w-12 bg-[#D4AF37]" />
      </div>

      <div
        className="relative mt-10 sm:mt-12 overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div
          className="gnv-marquee-track flex w-max items-center"
          style={
            { "--gnv-marquee-duration": `${duration}s` } as React.CSSProperties
          }
        >
          <div
            className="flex items-center"
            role="list"
            aria-label="Partner logos"
          >
            {logos.map((logo) => (
              <div key={logo.id} role="listitem">
                <LogoItem logo={logo} />
              </div>
            ))}
          </div>
          <div className="flex items-center" aria-hidden="true">
            {logos.map((logo) => (
              <LogoItem key={`${logo.id}-dup`} logo={logo} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
