import { useState } from "react";
import {
  EnvelopeIcon,
  GlobeAltIcon,
  VideoCameraIcon,
  MapIcon,
} from "@heroicons/react/24/outline";
import { HandshakeIcon } from "lucide-react";
import { MdEmail } from "react-icons/md";
import { TbPhoneCall } from "react-icons/tb";
import Contacts from "../../forms/ContactsForm";

const INQUIRY_TYPES = [
  { id: "general", label: "General Inquiries", icon: EnvelopeIcon },
  { id: "trip", label: "Plan My Trip", icon: GlobeAltIcon },
  { id: "partnerships", label: "Partnerships", icon: HandshakeIcon },
  { id: "media", label: "Media Enquiries", icon: VideoCameraIcon },
];

const CONTACT_INFO = [
  { label: "Email Us", contact: "admin@golfnvibes.com", icon: MdEmail },
  { label: "Call Us", contact: "0715845522", icon: TbPhoneCall },
  { label: "Our Location", contact: "Nairobi,Kenya", icon: MapIcon },
];

export default function ContactGrid() {
  const [selectedType, setSelectedType] = useState("general");

  return (
    <section className="py-8 sm:py-12 w-full p-4 sm:p-6 lg:p-10 bg-white flex flex-col lg:flex-row gap-8 lg:gap-12 transition-all duration-300">
      <div className="w-full lg:w-1/2 flex flex-col gap-8 justify-between">
        <div className="grid gap-2">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 transition-colors duration-200">
            Get Trusted Legal Support
          </h1>
          <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
            Connect with Golf N Vibes for strategic legal guidance tailored to
            your needs.
          </p>
        </div>

        <div className="grid gap-3 transition-all duration-500 ease-out">
          {CONTACT_INFO.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3 bg-gray-200 w-full sm:w-3/4 lg:w-2/3 rounded-2xl sm:rounded-4xl p-3 sm:p-4 transition-all duration-300 ease-in-out hover:bg-gray-300 hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
              >
                <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-green-500 transition-transform duration-300 group-hover:scale-110 shrink-0" />
                <div className="grid gap-0.5 min-w-0">
                  <p className="text-sm font-semibold text-zinc-900 truncate">
                    {item.label}
                  </p>
                  <p className="text-xs text-zinc-600 truncate">
                    {item.contact}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-full lg:w-1/2 bg-gray-200 rounded-3xl sm:rounded-4xl p-4 sm:p-6 lg:p-8 transition-all duration-300 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          <div className="lg:col-span-4 space-y-3">
            <span className="text-[11px] font-semibold text-zinc-900 uppercase tracking-widest block">
              Inquiry Category
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
              {INQUIRY_TYPES.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => {
                      setSelectedType(type.id);
                    }}
                    className={`w-full p-3.5 sm:p-4 rounded-xl text-left border flex items-center space-x-3 transition-all duration-300 ease-in-out transform active:scale-[0.98] ${
                      selectedType === type.id
                        ? "bg-white border-[#D4AF37] text-black shadow-md -translate-y-0.5"
                        : "bg-white border-zinc-800 text-zinc-500 hover:text-green-900 hover:border-zinc-700 hover:bg-white"
                    }`}
                  >
                    <Icon className="w-5 h-5 text-green-900 shrink-0 transition-transform duration-300 group-hover:rotate-6" />
                    <span className="text-xs font-semibold truncate">
                      {type.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-8 bg-gray-300 border border-zinc-800 p-5 sm:p-8 rounded-2xl transition-all duration-300 shadow-xl">
            <Contacts topic={selectedType} />
          </div>
        </div>
      </div>
    </section>
  );
}
