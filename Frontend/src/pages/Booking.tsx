import { FaHotel } from "react-icons/fa";
import {
  GiBus,
  GiMeal,
  GiDiscGolfBag,
  GiCommercialAirplane,
} from "react-icons/gi";
import { IoGolfSharp } from "react-icons/io5";
import { PiIslandFill } from "react-icons/pi";
import { FaRegCircleCheck } from "react-icons/fa6";
const PRICES = [
  { category: "Golfers", PPSharing: "", Price: 1700 },
  { category: "Non Golfers", PPSharing: "", Price: 1100 },
  { category: "Golfers", Single: "", Price: 2200 },
  { category: "Non Golfers", Single: "", Price: 1600 },
];
const TRIPSUMMARY = [
  {
    icon: <FaHotel />,
    description: "8 Days' Accommodation at a 5-star Luxury Resort",
  },
  { icon: <GiMeal />, description: "Daily BreakFast" },
  { icon: <GiCommercialAirplane />, description: "Return Airport Transfers" },
  { icon: <IoGolfSharp />, description: "4 Championship Golf Rounds" },
  {
    icon: <GiDiscGolfBag />,
    description: "Candy Fees & Individual Golf Carts",
  },
  { icon: <GiBus />, description: "Golf Course Transfers" },
  { icon: <PiIslandFill />, description: "Full Day Phi Phi Islands Tour" },
];

export default function Booking() {
  return (
    <div className="bg-[oklch(.075_0_0)] min-h-dvh my-20 rounded-lg ">
      <div className="bg-gray-100 w-1/2 p-2 m-10">
        <h1>Book this Trip</h1>
        <form>
          <div className="grid gap-5">
            <div className="flex gap-4">
              <div className="flex">
                <label>
                  First Name
                  <input
                    type="text"
                    className="bg-white m-4 rounded-xl h-8"
                    placeholder="John"
                  />
                </label>
              </div>
              <div className="flex">
                <label>
                  Last Name
                  <input
                    type="text"
                    className="bg-white m-4 rounded-xl h-8"
                    placeholder="William"
                  />
                </label>
              </div>
            </div>
            <div>
              <label>
                Email
                <input
                  type="email"
                  className="bg-white m-4 rounded-xl h-8"
                  placeholder="example@email.com"
                />
              </label>
            </div>

            <div className="grid gap-5">
              <h2>Trip Summary</h2>
              <div className="grid gap-2 w-100 p-4">
                {TRIPSUMMARY.map((item) => (
                  <div>
                    <ul>
                      <li className="flex gap-2 justify-between">
                        <div className="flex gap-5">
                        <p className="text-green-700">{item.icon}</p>
                        <p className="text-sm">{item.description}</p>
                        </div>
                        <p className="text-green-700">
                          <FaRegCircleCheck />
                        </p>
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2>Price BreakDown</h2>
              {PRICES.map((item) => (
                <div className="flex justify-between p-4">
                  <p>{item.category} </p>
                  <p>{item.PPSharing}</p>
                  <p>{item.Price}</p>
                </div>
              ))}

              <div className="flex justify-between p-4">
                <p>Total: </p>
                <p>$3000</p>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div></div>
    </div>
  );
}
