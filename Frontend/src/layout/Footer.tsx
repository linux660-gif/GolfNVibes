import {
  Footer,
  FooterCopyright,
  FooterIcon,
  FooterLink,
  FooterLinkGroup,
  FooterTitle,
} from "flowbite-react";
import { BsFacebook, BsInstagram } from "react-icons/bs";
import { motion } from "framer-motion";

const DESTINATIONS = [
  { place: "Kenya", link: "#" },
  { place: "South Africa", link: "#" },
  { place: "Morocco", link: "#" },
  { place: "Dubai", link: "#" },
  { place: "Abu Dhabi", link: "#" },
  { place: "Qatar", link: "#" },
  { place: "More", link: "#" },
];

const HELP_CENTER = [
  { platform: "WhatsApp", link: "https://wa.me/254715845522" },
  { platform: "Email", link: "mailto:admin@golfnvibes.com" },
  { platform: "Contact Us", link: "/ContactUs" },
];

const COMPANY_LINKS = [
  { action: "About Us", href: "/About" },
  { action: "Golf Packages", href: "#" },
  { action: "Gallery", href: "/Gallery" },
  { action: "Events", href: "/Tournaments" },
  { action: "Become a Sponsor", href: "/Partners" },
  { action: "Privacy Policy", href: "#" },
  {
    action: "Terms & Conditions",
    href: "https://golfnvibes.com/uploads/media/documents/golfnvibes_terms_and_conditions.pdf",
  },
];

const SOCIAL_LINKS = [
  { name: "Facebook", icon: BsFacebook, href: "https://www.facebook.com/golfnvibes" },
  { name: "Instagram", icon: BsInstagram, href: "https://www.instagram.com/golfnvibes" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
} as const;

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
} as const;

const socialIconVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
} as const;

export default function LayoutFooter() {
  return (
    <Footer className="rounded-none border-t border-white/10 bg-[#011009]! shadow-none">
      <div className="w-full">
        <motion.div
          className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
            <motion.div variants={fadeInUp} className="lg:col-span-4">
              <div className="flex items-center gap-3">
                <motion.img
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  src="https://golfnvibes.com/uploads/media/images/logo.png"
                  alt="Golf N Vibes Logo"
                  loading="lazy"
                  decoding="async"
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full object-cover shadow-md"
                />
                <span className="text-xl font-bold tracking-tight text-white">
                  Golf N Vibes
                </span>
              </div>
              <p className="mt-4 text-base leading-relaxed text-gray-400">
                Welcome to the ultimate fusion of sport and atmosphere. At
                Golf N Vibes, our mission is to redefine the traditional golf
                experience by blending the excitement of the game with an
                electric, social environment.
              </p>
              <motion.div className="mt-6 flex space-x-5" variants={containerVariants}>
                {SOCIAL_LINKS.map((item) => (
                  <motion.div
                    key={item.name}
                    variants={socialIconVariants}
                    whileHover={{ scale: 1.25, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FooterIcon
                      href={item.href}
                      icon={item.icon}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.name}
                      className="text-gray-500 transition-colors duration-200 hover:text-[#bd982e]"
                    />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
              <motion.div variants={fadeInUp}>
                <FooterTitle title="company" className="text-[#bd982e]" />
                <FooterLinkGroup col className="space-y-2.5">
                  {COMPANY_LINKS.map((action) => (
                    <FooterLink
                      key={action.action}
                      href={action.href}
                      className="text-gray-400 transition-colors duration-200 hover:text-[#bd982e]"
                    >
                      {action.action}
                    </FooterLink>
                  ))}
                </FooterLinkGroup>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <FooterTitle title="golf destinations" className="text-[#bd982e]" />
                <FooterLinkGroup col className="space-y-2.5">
                  {DESTINATIONS.map((destination) => (
                    <FooterLink
                      key={destination.place}
                      href={destination.link}
                      className="text-gray-400 transition-colors duration-200 hover:text-[#bd982e]"
                    >
                      {destination.place}
                    </FooterLink>
                  ))}
                </FooterLinkGroup>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <FooterTitle title="help center" className="text-[#bd982e]" />
                <FooterLinkGroup col className="space-y-2.5">
                  {HELP_CENTER.map((method) => (
                    <FooterLink
                      key={method.platform}
                      href={method.link}
                      target={method.link.startsWith("http") ? "_blank" : undefined}
                      rel={method.link.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-gray-400 transition-colors duration-200 hover:text-[#bd982e]"
                    >
                      {method.platform}
                    </FooterLink>
                  ))}
                </FooterLinkGroup>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="border-t border-white/10 bg-[#000a06] px-4 py-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-4 sm:flex-row sm:px-6 lg:px-8">
            <FooterCopyright by="Golf N Vibes™" year={new Date().getFullYear()} className="text-gray-400" />
          </div>
        </motion.div>
      </div>
    </Footer>
  );
}