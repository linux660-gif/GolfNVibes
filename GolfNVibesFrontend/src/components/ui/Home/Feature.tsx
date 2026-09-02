import { TbTournament } from "react-icons/tb";
import { MdOutlineEventAvailable } from "react-icons/md";
import { FaPlaneDeparture } from "react-icons/fa";

const features = [
  {
    name: "Corporate Travels.",
    description:
      "We transform traditional business networking and team-building by taking it out of the boardroom and onto the course.",
    icon: FaPlaneDeparture,
  },
  {
    name: "Tournaments.",
    description:
      "For players looking to test their skills, our Tournaments offer a structured yet highly engaging competitive environment.",
    icon: TbTournament,
  },
  {
    name: "Golf Events.",
    description:
      "Golf Events are where our signature energy truly shines, heavily featuring our high-energy, neon-lit glow-in-the-dark experiences under the stars.",
    icon: MdOutlineEventAvailable,
  },
];

const MOTION_DELAY_CLASSES = [
  "motion-delay-200",
  "motion-delay-300",
  "motion-delay-400",
];

export default function GNVFeature() {
  return (
    <div className="overflow-hidden bg-gray-200 rounded-3xl mt-5 py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-10 sm:gap-12 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:gap-x-12 lg:gap-y-16 xl:gap-x-16">
          <div className="order-2 lg:order-1 lg:pt-4 lg:pr-6 xl:pr-8">
            <div className="max-w-xl lg:max-w-lg">
              <p className="text-sm sm:text-base font-semibold text-[#0a4d30] intersect-once intersect:motion-preset-fade motion-duration-500">
                The Vibes of Golf, Redefined.
              </p>
              <h2 className="text-black intersect:motion-translate-y-100 intersect:motion-duration-1000 mt-2 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-pretty intersect-once intersect:motion-preset-slide-up-sm motion-duration-700 motion-delay-75">
                Play bold, stay calm.
              </h2>
              <p className="mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-gray-800 intersect-once intersect:motion-preset-slide-up-sm motion-duration-700 motion-delay-150">
                Welcome to the ultimate fusion of sport and atmosphere. At
                GolfnVibes, our mission is to redefine the traditional golf
                experience by blending the excitement of the game with an
                electric, social environment. Whether you are stepping up to the
                tee for a serene daytime round on a pristine fairway or diving
                into one of our high-energy, neon-lit glow-in-the-dark events
                under the stars, we curate experiences that bring people
                together through play, music, and community.
              </p>
              <dl className="mt-8 sm:mt-10 max-w-xl space-y-6 sm:space-y-8 text-base leading-7 text-gray-800 dark:text-gray-400 lg:max-w-none">
                {features.map((feature, idx) => (
                  <div
                    key={feature.name}
                    className={`relative pl-9 intersect-once intersect:motion-preset-slide-up-sm motion-duration-500 intersect:${MOTION_DELAY_CLASSES[idx]}`}
                  >
                    <dt className="inline font-semibold text-[#0a4d30]">
                      <feature.icon
                        aria-hidden="true"
                        className="absolute top-1 left-1 h-5 w-5 dark:text-[#bd982e] motion-preset-focus motion-duration-700"
                      />
                      {feature.name}
                    </dt>{" "}
                    <dd className="inline text-gray-500">
                      {feature.description}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end intersect-once intersect:motion-preset-fade motion-duration-1000">
            <img
              alt="Golfer playing on a scenic course fairway"
              src="https://golfnvibes.com/uploads/media/images/playboldstaycalm.jpg"
              width={2420}
              height={1430}
              loading="eager"
              decoding="async"
              className="intersect-once intersect:motion-preset-scale-in-0 w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-3xl rounded-xl shadow-xl ring-1 ring-white/10 transition-transform duration-500 hover:scale-[1.01]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
