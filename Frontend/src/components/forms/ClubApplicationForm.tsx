import { useState } from "react";
import { ArrowRightIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../../services/api";
import { toast } from "react-toastify";

export interface MemberData {
  full_name: string;
  email: string;
  handicap: string;
  club: string;
  vision: string;
}

const schema = yup.object({
  full_name: yup.string().required("Full name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  handicap: yup.string().required("Handicap is required"),
  club: yup.string().required("Home club is required"),
  vision: yup.string().required("Please tell us why you'd like to join"),
});

const errorClass = "mt-1.5 text-xs text-red-500";
const labelClass =
  "mb-1.5 block text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-700";
const inputClass =
  "w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 hover:border-zinc-300 focus:border-[#D4AF37] focus:bg-white focus:ring-2 focus:ring-[#D4AF37]/10";

export default function MembershipApplicationForm() {
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MemberData>({
    resolver: yupResolver(schema),
    defaultValues: {
      full_name: "",
      email: "",
      handicap: "",
      club: "",
      vision: "",
    },
  });

  const onSubmit = async (data: MemberData) => {
    setSubmitError(null);
    try {
      await toast.promise(api.post("/members", data), {
        pending: "Submitting your request...",
        success: "Application successfully submitted",
      });
      reset();
    } catch (error) {
      console.error(`error while submiting the form ${error} `);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-7 border p-8 rounded-3xl"
    >
      <div>
        <div className="flex items-center gap-2">
          <div className="h-px w-7 bg-[#0a4d30]" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#0a4d30]">
            Membership Application
          </span>
        </div>

        <h2 className="mt-3 font-serif text-3xl tracking-tight text-zinc-900 sm:text-4xl">
          Apply for Membership
        </h2>

        <p className="mt-3 max-w-lg text-xs leading-6 text-zinc-500 sm:text-sm">
          Tell us a little about yourself and your golfing journey. Every
          application is reviewed personally by our membership committee.
        </p>
      </div>

      <div className="h-px bg-zinc-100" />

      <div className="space-y-5">
        <div>
          <label htmlFor="full_name" className={labelClass}>
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="full_name"
            type="text"
            autoComplete="name"
            aria-invalid={errors.full_name ? "true" : "false"}
            aria-describedby={errors.full_name ? "full_name-error" : undefined}
            {...register("full_name")}
            placeholder="e.g. Alexander Wright"
            className={inputClass}
          />
          {errors.full_name && (
            <p id="full_name-error" role="alert" className={errorClass}>
              {errors.full_name.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="email" className={labelClass}>
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "email-error" : undefined}
              {...register("email")}
              placeholder="alexander@domain.com"
              className={inputClass}
            />
            {errors.email && (
              <p id="email-error" role="alert" className={errorClass}>
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="handicap" className={labelClass}>
              Golf Handicap Index <span className="text-red-500">*</span>
            </label>
            <input
              id="handicap"
              type="text"
              aria-invalid={errors.handicap ? "true" : "false"}
              aria-describedby={errors.handicap ? "handicap-error" : undefined}
              {...register("handicap")}
              placeholder="e.g. 12.4 or Scratch"
              className={inputClass}
            />
            {errors.handicap && (
              <p id="handicap-error" role="alert" className={errorClass}>
                {errors.handicap.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="club" className={labelClass}>
            Home Club / Primary Affiliation{" "}
            <span className="text-red-500">*</span>
          </label>
          <input
            id="club"
            type="text"
            aria-invalid={errors.club ? "true" : "false"}
            aria-describedby={errors.club ? "club-error" : undefined}
            {...register("club")}
            placeholder="e.g. Muthaiga Golf Club / Independent"
            className={inputClass}
          />
          {errors.club && (
            <p id="club-error" role="alert" className={errorClass}>
              {errors.club.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="vision" className={labelClass}>
            Why do you wish to join Golf n Vibes?{" "}
            <span className="text-red-500">*</span>
          </label>
          <textarea
            id="vision"
            rows={4}
            aria-invalid={errors.vision ? "true" : "false"}
            aria-describedby={errors.vision ? "vision-error" : undefined}
            {...register("vision")}
            placeholder="Tell us about your passion for golf, luxury travel, or corporate networking..."
            className={`${inputClass} resize-none leading-6`}
          />
          {errors.vision && (
            <p id="vision-error" role="alert" className={errorClass}>
              {errors.vision.message}
            </p>
          )}
        </div>
      </div>

      {submitError && (
        <p role="alert" className="text-center text-xs text-red-500">
          {submitError}
        </p>
      )}

      <div className="pt-1">
        <button
          type="submit"
          disabled={isSubmitting}
          className="group flex w-full items-center justify-center gap-3 rounded-xl bg-white px-6 py-4 text-xs font-bold uppercase tracking-[0.18em] text-black shadow-lg shadow-[#0a4d30]/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#0a4d30]/25 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-[#0a4d30] focus-visible:ring-offset-2"
        >
          <span>
            {isSubmitting ? "Submitting..." : "Submit Membership Application"}
          </span>
          <ArrowRightIcon className="h-4 w-4 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>

      <div className="flex items-start justify-center gap-2 px-2">
        <ShieldCheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0a4d30]" />
        <p className="text-center text-[9px] leading-4 text-zinc-700">
          Applications are reviewed individually and confidentially by the Golf
          n Vibes Team.
        </p>
      </div>

      <div className="flex items-center justify-center gap-2 pt-1">
        <span className="h-1 w-1 rounded-full bg-[#D4AF37]" />
        <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-black">
          Play · Travel · Connect
        </span>
        <span className="h-1 w-1 rounded-full bg-[#D4AF37]" />
      </div>
    </form>
  );
}
