import { MdArrowDropDown, MdClose } from "react-icons/md";
import { useModal } from "../../hooks/useModal";

const EVENT_INFO = {
  title: "PHUKET TAKEOVER 2026",
  date: "21–28 October 2026",
  location: "Phuket, Thailand",
  posterUrl: "/PhuketTakeOver2026.jpeg",
  description:
    "An 8-day luxury golf and lifestyle experience featuring 5-star accommodation at the Hyatt Regency, championship golf, island adventures, social events, and curated optional experiences.",
  linkToBooking: "/ContactUs",
  linkToLearnMore:
    "https://golfnvibes.com/uploads/media/documents/Phuket_take_Over_2026.pdf",
  golfCourses: [
    "Laguna Golf Phuket",
    "Red Mountain Golf Club",
    "Blue Canyon Country Club",
    "Aquella Golf & Country Club",
  ],
  keyExperiences: [
    "Phi Phi Islands",
    "Golf N Vibes White Party",
    "Beaches",
    "Spa experiences",
    "Shopping",
    "Sightseeing",
    "Beach clubs",
    "Dining and other optional lifestyle activities",
  ],
  included: [
    "8 days' accommodation",
    "Daily breakfast",
    "4 championship golf rounds",
    "Green fees, shared cart & caddie",
    "Private airport transfers",
    "Welcome reception",
    "Phi Phi Islands Speedboat Tour",
  ],
};

interface EventPopupProps {
  onClose: () => void;
}

export default function EventPopup({ onClose }: EventPopupProps) {
  const { openModal, closeModal, isOpen } = useModal();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-3 sm:p-4 md:p-6 overflow-y-auto">
      <div className="relative flex flex-col md:flex-row w-full max-w-xs sm:max-w-md md:max-w-3xl lg:max-w-4xl rounded-2xl bg-white shadow-2xl overflow-hidden my-auto max-h-[90vh] md:max-h-[85vh] border border-gray-100">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-20 p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white transition backdrop-blur-md"
          aria-label="Close modal"
        >
          <MdClose size={20} />
        </button>

        <div className="w-full md:w-1/2 relative bg-gray-900 h-48 sm:h-64 md:h-auto shrink-0">
          <img
            src={EVENT_INFO.posterUrl}
            alt={EVENT_INFO.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 p-4 sm:p-6 flex flex-col justify-between gap-4 overflow-y-auto text-gray-800 overflow-scroll">
          <div className="space-y-2">
            <div>
              <span className="text-[10px] sm:text-xs font-bold tracking-wider text-emerald-600 uppercase">
                Featured Event
              </span>
              <h2 className="text-lg sm:text-2xl font-extrabold text-gray-900 tracking-tight leading-tight">
                {EVENT_INFO.title}
              </h2>
              <p className="text-[11px] sm:text-xs font-semibold text-gray-500 mt-0.5 sm:mt-1">
                {EVENT_INFO.date} &bull; {EVENT_INFO.location}
              </p>
            </div>

            <p className="text-xs leading-relaxed text-gray-600">
              {EVENT_INFO.description}
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="border border-gray-200 rounded-xl overflow-hidden bg-gray-50">
              <button
                type="button"
                onClick={isOpen ? closeModal : openModal}
                className="w-full flex items-center justify-between p-2.5 sm:p-3 font-semibold text-gray-900 hover:bg-gray-100 transition"
              >
                <span>What's Included</span>
                <MdArrowDropDown
                  size={20}
                  className={`transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <ul className="px-3 pb-3 space-y-1.5 border-t border-gray-200 pt-2.5 text-gray-600 max-h-40 overflow-y-auto">
                  {EVENT_INFO.included.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-0.5">Golf Courses</h4>
              <p className="text-gray-600 leading-normal">
                {EVENT_INFO.golfCourses.join(", ")}
              </p>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-0.5">
                Key Experiences
              </h4>
              <p className="text-gray-600 leading-normal">
                {EVENT_INFO.keyExperiences.join(", ")}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-2 sm:pt-1">
            {EVENT_INFO.linkToLearnMore && (
              <a
                href={EVENT_INFO.linkToLearnMore}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center py-2.5 px-4 rounded-xl text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition"
              >
                Learn More
              </a>
            )}
            <a
              href={EVENT_INFO.linkToBooking}
              className="flex-1 text-center py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-600/20 transition"
            >
              Book Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
