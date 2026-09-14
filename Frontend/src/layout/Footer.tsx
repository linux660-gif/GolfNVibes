"use client";

import {
  Footer,
  FooterCopyright,
  FooterIcon,
  FooterLink,
  FooterLinkGroup,
  FooterTitle,
} from "flowbite-react";
import {

  BsFacebook,
  BsInstagram,
} from "react-icons/bs";
import { motion } from "framer-motion";

export default function LayoutFooter() {
  const destinations = [
    { place: "Kenya", link: "#" },
    { place: "South Africa", link: "#" },
    { place: "Morocco", link: "#" },
    { place: "Dubai", link: "#" },
    { place: "Abu Dhabi", link: "#" },
    { place: "Qatar", link: "#" },
    { place: "More", link: "#" },
  ];



  const helpCenter = [
    { platform: "WhatsApp", link: "https://whatsapp.com" },
    { platform: "Email", link: "mailto:admin@golfnvibes.com" },
    { platform: "Contact Us", link: "/ContactUs" },
  ];

  const company = [
    { action: "About Us", href: "/About" },
    { action: "Golf Packages", href: "#" },
    // { action: "Blog", href: "/Blog" },
    { action: "Gallery", href: "/Gallery" },
    { action: "Events", href: "/Tournaments" },
    { action: "Become a Sponsor", href: "/Sponsor" },
    { action: "Privacy Policy", href: "#" },
    {
      action: "Terms & Conditions",
      href: "https://golfnvibes.com/uploads/media/documents/golfnvibes_terms_and_conditions.pdf",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
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

  return (
    <Footer className="rounded-none border-t border-gray-200 shadow-none dark:border-gray-800 dark:bg-[#011009]!">
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
                  className="h-10 w-10 rounded-full object-cover shadow-md"
                />
                <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Golf N Vibes
                </span>
              </div>
              <p className="mt-4 text-base leading-relaxed text-gray-600 dark:text-gray-400">
                Welcome to the ultimate fusion of sport and atmosphere. At
                GolfnVibes, our mission is to redefine the traditional golf
                experience by blending the excitement of the game with an
                electric, social environment.
              </p>
              <motion.div
                className="mt-6 flex space-x-5"
                variants={containerVariants}
              >
                {[
                  {
                    icon: BsFacebook,
                    href: "https://www.facebook.com/search/top/?q=golfnvibes",
                  },
                  {
                    icon: BsInstagram,
                    href: "https://www.instagram.com/golfnvibes",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={socialIconVariants}
                    whileHover={{ scale: 1.25, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FooterIcon
                      href={item.href}
                      icon={item.icon}
                      className="text-gray-500 transition-colors duration-200 hover:text-[#bd982e] dark:hover:text-[#bd982e]"
                    />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
              <motion.div variants={fadeInUp}>
                <FooterTitle
                  title="company"
                  className="text-[#0a4d30] dark:text-[#bd982e]"
                />
                <FooterLinkGroup col className="space-y-2.5">
                  {company.map((action, idx) => (
                    <FooterLink
                      key={idx}
                      href={action.href}
                      className="transition-colors duration-200 hover:text-[#0a4d30] dark:hover:text-[#bd982e]"
                    >
                      {action.action}
                    </FooterLink>
                  ))}
                </FooterLinkGroup>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <FooterTitle
                  title="golf destinations"
                  className="text-[#0a4d30] dark:text-[#bd982e]"
                />
                <FooterLinkGroup col className="space-y-2.5">
                  {destinations.map((destination, idx) => (
                    <FooterLink
                      key={idx}
                      href={destination.link}
                      className="transition-colors duration-200 hover:text-[#0a4d30] dark:hover:text-[#bd982e]"
                    >
                      {destination.place}
                    </FooterLink>
                  ))}
                </FooterLinkGroup>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <FooterTitle
                  title="help center"
                  className="text-[#0a4d30] dark:text-[#bd982e]"
                />
                <FooterLinkGroup col className="space-y-2.5">
                  {helpCenter.map((method, idx) => (
                    <FooterLink
                      key={idx}
                      href={method.link}
                      className="transition-colors duration-200 hover:text-[#0a4d30] dark:hover:text-[#bd982e]"
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
          className="border-t border-gray-200 bg-gray-50 px-4 py-6 dark:border-gray-800 dark:bg-[#000a06]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-4 sm:flex-row sm:px-6 lg:px-8">
            <FooterCopyright href="#" by="GolfNVibes™" year={2026} />
          </div>
        </motion.div>
      </div>
    </Footer>
  );
}
