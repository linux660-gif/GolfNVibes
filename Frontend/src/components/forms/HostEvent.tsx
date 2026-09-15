import { motion } from "framer-motion";
import { ArrowRightIcon } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../../services/api";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";


export interface HostData {
  full_name: string;
  email: string;
  company:string;
  classification_id:string;
  guest_id:string;
  vision:string;
}
export interface Classification {
  id:string;
  name:string;
}

export interface Guests {
  id: string;
  name: string;
}

const schema = yup.object({
    full_name : yup.string().required("Full Name is a Required Field"),
    email : yup.string().email("Enter a Valid Email").required("Email is a required field"),
    company: yup.string().required("Company is a required field"),
    classification_id: yup.string().required("Classification is a required Field"),
    guest_id: yup.string().required("Guest is a required Field"),
    vision: yup.string().required("Vision is a required Field")
})

export default function HostEventForm() {
  const [classifications, setClassifications] = useState<Classification[]>([])
  const [guests, setGuests] = useState<Guests[]>([]);
  const [guestsLoading, setGuestsLoading] = useState(true);

    const [guestError, setGuestsError] = useState<
      string | null
    >(null);
    const [classificationLoading, setClassificationLoading] = useState(true);
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
      classification_id: "",
      guest_id: "",
      vision: "",
    },
  });

  const onSubmit: SubmitHandler<HostData> = async (data: HostData) => {
    try {
      const submissionPromise = api.post("/tournament/host/", data);
      await toast.promise(submissionPromise, {
        pending: "Submitting Your Request ....",
        success: "Request Successfully Submitted",
      });
      reset();
    } catch (error) {
      console.error(`error submitting the form: ${error}`);
    }
  };

  useEffect(() => {
    let isMounted = true;
    api
      .get("/tournament/classification/")
      .then((response) => {
        if (!isMounted) return;
        setClassifications(response.data);
      })
      .catch((err) => {
        if (!isMounted) return;
        console.error(err)
      })
      .finally(() => {
        if (isMounted) setClassificationLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);


   useEffect(() => {
     let isMounted = true;
     api
       .get("/tournament/guest/")
       .then((response) => {
         if (!isMounted) return;
         setGuests(response.data);
         setGuestsError(null);
       })
       .catch((err) => {
         if (!isMounted) return;
         setGuestsError(
           err.message || "Unable to load Guests right now.",
         );
       })
       .finally(() => {
         if (isMounted) setGuestsLoading(false);
       });
     return () => {
       isMounted = false;
     };
   }, []);

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
                    id="classification_id"
                    disabled={classificationLoading}
                    aria-invalid={errors.classification_id ? "true" : "false"}
                    aria-describedby={
                      errors.classification_id ? "classification_id-error" : undefined
                    }
                    {...register("classification_id")}
                    className="w-full cursor-pointer rounded-lg border border-zinc-200 bg-white px-3.5 py-2.5 text-xs text-black transition duration-200 focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <option value="">
                      {classificationLoading
                        ? "Loading classifications..."
                          : "Select classification"}
                    </option>
                    {classifications.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                  {errors.classification_id && (
                    <p className={errorclass}>
                      {errors.classification_id.message}
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
                    id="guest_id"
                    disabled={classificationLoading}
                    aria-invalid={errors.guest_id? "true" : "false"}
                    aria-describedby={
                      errors.guest_id ? "guest_id-error" : undefined
                    }
                    {...register("guest_id")}
                    className="w-full cursor-pointer rounded-lg border border-zinc-200 bg-white px-3.5 py-2.5 text-xs text-black transition duration-200 focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <option value="">
                      {guestsLoading
                        ? "Loading clubs..."
                          : "Select Guest"}
                    </option>
                    {guests.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                  {guestError && (
                    <p role="alert" className={errorclass}>
                      {guestError} Please refresh the page to try
                      again.
                    </p>
                  )}
                  {errors.guest_id && (
                    <p className={errorclass}>
                      {errors.guest_id.message}
                    </p>
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
