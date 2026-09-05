"use client";

import { useEffect, useState } from "react";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { useModal } from "../hooks/useModal";
import EventPopup from "../components/common/Modal";

export default function LayoutNavbar() {
  const { isOpen,openModal, closeModal } = useModal();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activePath, setActivePath] = useState(() => {
    if (typeof window !== "undefined") {
      return window.location.pathname;
    }
    return "/";
  });



  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navbarItems = [
    { item: "Home", link: "/" },
    { item: "About Us", link: "/About" },
    { item: "Plan My Trip", link: "/GolfHolidays/PlanMyTrip" },
    { item: "Events & Tournaments", link: "/Tournaments" },
    { item: "The Club", link: "/Club" },
    { item: "Gallery", link: "/Gallery" },
    { item: "Partners", link: "/Partners" },
    { item: "Contacts", link: "/ContactUs" },
  ];

  return (
    <Navbar
      fluid
      rounded={false}
      className={`fixed top-0 bg-transparent! left-0 right-0 z-50 w-full transition-all duration-300 border-none px-4 sm:px-6 xl:px-10 py-3  text-white! ${
        isScrolled ? "bg-[#355E3B]! shadow-lg py-3" : "bg-transparent py-5"
      }`}
    >
      <NavbarBrand href="/" className="min-w-0 flex items-center shrink-0">
        <img
          src="https://golfnvibes.com/uploads/media/images/logo.png"
          className="mr-2 h-8 w-auto rounded-full sm:h-10"
          alt="GNV Logo"
        />
        <span className="truncate whitespace-nowrap text-lg font-semibold sm:text-xl text-white">
          Golf <span className="text-[#bd982e]">N </span> Vibes
        </span>
      </NavbarBrand>

      <div className="flex items-center gap-2 md:order-2 shrink-0">
        <Button onClick={openModal}
          className={`hidden cursor-pointer sm:inline-flex hover:bg-white/90 text-white border-none text-xs xl:text-sm font-bold shadow-sm transition-transform active:scale-95 ${ 
            isScrolled ?"bg-white! text-black!" : " bg-[#046307]!"}`}
        >
          Phuket Take Over
        </Button>
        <NavbarToggle className="text-white! hover:bg-white/10 focus:ring-0 md:hidden" />
      </div>

      <NavbarCollapse className="w-full  md:w-auto md:order-1 md:flex md:justify-center">
        <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-1 md:gap-1 lg:gap-3 xl:gap-5 mt-4 md:mt-0 p-4 md:p-0 bg-[#355E3B] md:bg-transparent rounded-2xl shadow-xl md:shadow-none border border-white/10 md:border-none">
          {navbarItems.map((item) => {
            const isActive = activePath === item.link;
            return (
              <NavbarLink
                key={item.item}
                href={item.link}
                onClick={() => setActivePath(item.link)}
                active={isActive}
                className={`py-2 px-3 rounded-lg font-medium transition-colors text-sm xl:text-base whitespace-nowrap ${
                  isActive
                    ? " text-[#bd982e]! font-bold md:bg-transparent! lg:bg-transparent!"
                    : "text-white! hover:text-[#bd982e]! hover:bg-white/5 md:hover:bg-transparent"
                }`}
              >
                {item.item}
              </NavbarLink>
            );
          })}

          <div className="mt-3 flex flex-col gap-2 border-t border-white/20 pt-3 md:hidden">
            <Button onClick={openModal} className="w-full cursor-pointer text-black border-none bg-white! font-bold hover:bg-white/90">
              Phuket Take Over
            </Button>
          </div>
          {isOpen && (
            <div>
              <EventPopup onClose={closeModal} />
            </div>
      
    )}
        </div>
      </NavbarCollapse>
    </Navbar>
    

  );
}
