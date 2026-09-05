import { motion } from "framer-motion";
import { ArrowRightIcon } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../../services/api";
import { toast } from "react-toastify";


export interface HostData {
  full_name: string;
  email: string;
  company:string;
  category:string;
  expected_guest:string;
  vision:string;
}

const schema = yup.object({
    full_name : yup.string().required("Full Name is a Required Field"),
    email : yup.string().email("Enter a Valid Email").required("Email is a required field"),
    company: yup.string().required("Company is a required field"),
    category: yup.string().required("Classification is a required Field"),
    expected_guest: yup.string().required("Guest is a required Field"),
    vision: yup.string().required("Vision is a required Field")
})

export default function HostEventForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<HostData>({
    resolver: yupResolver(schema),
    defaultValues: {
      full_name: "",
      email: "",
      company: "",
      category: "",
      expected_guest: "",
      vision: "",
    },
  });

  const onSubmit: SubmitHandler<HostData> = async (data: HostData) => {
    try {
      const submissionPromise = api.post("/tournament/host", data);
      await toast.promise(submissionPromise, {
        pending: "Submitting Your Request ....",
        success: "Request Successfully Submitted",
      });
      reset();
    } catch (error) {
      console.error(`error submitting the form: ${error}`);
    }
  };

  const errorclass = "mt-1.5 text-xs text-red-500";

  return (
    <div>
      <motion.div
        className="lg:col-span-5"
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="relative rounded-2xl bg-gray-300 border border-[#D4AF37]/30 p-8 shadow-2xl backdrop-blur-md">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <h2 className="text-xl font-serif font-bold text-black">
                Host Your Tournament
              </h2>
              <p className="text-xs text-zinc-800 mt-1">
                Design an unforgettable event tailored to your guests.
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-700 mb-1">
                  Your Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  {...register("full_name")}
                  placeholder="e.g. Lord Alexander Wright"
                  className="w-full rounded-lg px-3.5 py-2.5 text-xs bg-white text-black border border-zinc-800 focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37] transition duration-200"
                />
                {errors.full_name && (
                  <p className={errorclass}>{errors.full_name.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    {...register("email")}
                    required
                    placeholder="alexander@company.com"
                    className="w-full rounded-lg px-3.5 py-2.5 text-xs bg-white text-black border border-zinc-800 focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37] transition duration-200"
                  />
                  {errors.email && (
                    <p className={errorclass}>{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-700 mb-1">
                    Company / Org *
                  </label>
                  <input
                  required
                    type="text"
                    {...register("company")}
                    placeholder="e.g. Sterling Capital"
                    className="w-full rounded-lg px-3.5 py-2.5 text-xs bg-white text-black border border-zinc-800 focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37] transition duration-200"
                  />
                  {errors.company && (
                    <p className={errorclass}>{errors.company.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="classification"
                    className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-700 mb-1"
                  >
                    Classification *
                  </label>
                  <select
                  required
                    id="classification"
                    {...register("category")}
                    className="w-full rounded-lg px-3.5 py-2.5 text-xs bg-white text-black border border-zinc-800 focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37] transition duration-200 cursor-pointer"
                  > 
                    <option value={"Corporate Invitation"}>
                      Corporate Invitational
                    </option>
                    <option value={"Private VIP Showcase"}>
                      Private VIP Showcase
                    </option>
                    <option value={"Charity Gala"}>
                      Charity Gala Tournament
                    </option>
                    <option value={"Executive"}>Executive Retreat</option>
                  </select>
                  {errors.category && (
                    <p className={errorclass}>
                      {errors.category.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="guests"
                    className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-700 mb-1"
                  >
                    Expected Guests *
                  </label>
                  <select
                    id="guests"
                    {...register("expected_guest")}
                    className="w-full rounded-lg px-3.5 py-2.5 text-xs bg-white text-black border border-zinc-800 focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37] transition duration-200 cursor-pointer"
                  >
                    <option value={"12-36 VIP"}>12 - 36 VIPs</option>
                    <option value={"36-72 Players"}>36 - 72 Players</option>
                    <option value={"72-144 Players"}>72 - 144 Players</option>
                    <option value={"144+ Full Buyout"}>144+ Full Buyout</option>
                  </select>
                  {errors.expected_guest&& (
                    <p className={errorclass}>{errors.expected_guest.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-700 mb-1">
                  Specific Vision *
                </label>
                <textarea
                required
                  rows={3}
                  {...register("vision")}
                  placeholder="Mention preferred dates, target destinations, or custom hospitality requests..."
                  className="w-full rounded-lg px-3.5 py-2.5 text-xs bg-white text-black border border-zinc-800 focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37] transition duration-200 resize-none"
                />
                {errors.vision && (
                  <p className={errorclass}>{errors.vision.message}</p>
                )}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3 px-6 rounded-xl bg-white text-zinc-950 font-bold text-xs uppercase tracking-widest flex items-center justify-center space-x-2 transition-all duration-300 hover:brightness-110 shadow-lg shadow-[#D4AF37]/20"
            >
              <span>Request Event Consultation</span>
              <ArrowRightIcon className="w-3.5 h-3.5 stroke-[2.5]" />
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
