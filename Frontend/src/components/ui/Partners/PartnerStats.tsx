import type React from "react";
import {
  GlobeAltIcon,
  UserGroupIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import BecomeAPartnerForm from "../../forms/PartnerForm";

export default function PartnerStats(): React.ReactElement {
  return (
    <section
      id="partner-inquiry"
      className="my-8 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20 rounded-4xl"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        <div className="lg:col-span-6 xl:col-span-7 space-y-8">
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0a4d30] leading-tight">
              Elevate Your Brand to Luxury Travelers
            </h2>
            <p className="text-sm text-black leading-relaxed">
              Join an elite network of championship golf courses, premier
              resorts, and high-end brands reaching ultra-high-net-worth golf
              enthusiasts.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 border-y border-zinc-300 py-6">
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-[#D4AF37]">
                <UserGroupIcon className="w-5 h-5 shrink-0" />
                <span className="text-2xl font-serif font-bold text-[#0a4d30]">
                  250K+
                </span>
              </div>
              <p className="text-xs text-zinc-900">
                Monthly High-Net-Worth Visitors
              </p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-[#D4AF37]">
                <GlobeAltIcon className="w-5 h-5 shrink-0" />
                <span className="text-2xl font-serif font-bold text-[#0a4d30]">
                  40+
                </span>
              </div>
              <p className="text-xs text-zinc-900">
                Global Destinations Represented
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-semibold text-zinc-900 uppercase tracking-wider">
              Why Partner With Us
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-black">
              <li className="flex items-start space-x-3">
                <ShieldCheckIcon className="w-5 h-5 text-[#0a4d30] shrink-0 mt-0.5" />
                <span>
                  Direct exposure to targeted luxury and golf travel consumers.
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <ShieldCheckIcon className="w-5 h-5 text-[#0a4d30] shrink-0 mt-0.5" />
                <span>
                  Featured positioning in our curated member directory.
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <ShieldCheckIcon className="w-5 h-5 text-[#0a4d30] shrink-0 mt-0.5" />
                <span>
                  Exclusive cross-promotional campaigns and luxury event access.
                </span>
              </li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-[#0a4d30] border border-zinc-800/80 space-y-2">
            <p className="text-xs italic text-zinc-300 leading-relaxed">
              &ldquo;Partnering with this platform expanded our luxury
              stay-and-play package bookings by 35% in our very first
              quarter.&rdquo;
            </p>
            <p className="text-[11px] font-semibold text-[#D4AF37] uppercase tracking-wider">
              — Director of Golf, St. Andrews Luxury Collection
            </p>
          </div>
        </div>

        <div className="lg:col-span-6 xl:col-span-5 w-full">
          <BecomeAPartnerForm />
        </div>
      </div>
    </section>
  );
}
