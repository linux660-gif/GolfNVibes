import type React from "react";
import { useState } from "react";
import api from "../../services/api";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

export interface PartnerData {
  organization: string;
  partner_type: string;
  email: string;
  details: string;
}

const schema = yup.object({
  organization: yup.string().required("Please enter your organization name"),
  partner_type: yup.string().required("Please select a partnership type"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  details: yup.string().required("Please share some proposal details"),
});

const errorClass = "mt-1.5 text-xs text-red-500";
const labelClass =
  "block text-[11px] font-semibold text-black uppercase tracking-wider";
const inputClass =
  "w-full rounded-lg px-3.5 py-2.5 text-xs sm:text-sm bg-white text-black placeholder-zinc-500 border border-zinc-200 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none transition duration-200";

export default function BecomeAPartnerForm(): React.ReactElement {
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PartnerData>({
    resolver: yupResolver(schema),
    defaultValues: {
      organization: "",
      partner_type: "",
      email: "",
      details: "",
    },
  });

  const onSubmit = async (data: PartnerData) => {
    setSubmitError(null);
    try {
      await toast.promise(api.post("/partner/", data), {
        pending: "Submitting your request...",
        success: "Partner request successfully submitted",
      });
      reset();
    } catch (error) {
      console.error(`Something went wrong. Please try again ${error}.`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="max-w-2xl mx-auto p-6 sm:p-8 rounded-2xl space-y-6 bg-gray-300 shadow-md"
    >
      <div className="space-y-1 pb-2">
        <h3 className="text-xl sm:text-2xl font-serif font-bold text-black tracking-tight">
          Become a Partner
        </h3>
        <p className="text-xs text-gray-700">
          Fill out the form below and our partnerships team will reach out.
        </p>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="organization" className={labelClass}>
          Organization Name <span className="text-red-500">*</span>
        </label>
        <input
          id="organization"
          type="text"
          aria-invalid={errors.organization ? "true" : "false"}
          aria-describedby={
            errors.organization ? "organization-error" : undefined
          }
          {...register("organization")}
          placeholder="e.g. Serengeti Luxury Golf Resort"
          className={inputClass}
        />
        {errors.organization && (
          <p id="organization-error" role="alert" className={errorClass}>
            {errors.organization.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
        <div className="space-y-1.5">
          <label htmlFor="partner_type" className={labelClass}>
            Partnership Type <span className="text-red-500">*</span>
          </label>
          <select
            id="partner_type"
            aria-invalid={errors.partner_type ? "true" : "false"}
            aria-describedby={
              errors.partner_type ? "partner_type-error" : undefined
            }
            {...register("partner_type")}
            className={`${inputClass} cursor-pointer`}
          >
            <option value="">Select Option</option>
            <option value="Sponsor">Sponsor</option>
            <option value="Hotel & Resort">Hotel & Resort</option>
            <option value="Golf Club">Golf Club</option>
            <option value="Tourism Board">Tours & Travel Agencies</option>
            <option value="Airline / Transport">Airline / Transport</option>
          </select>
          {errors.partner_type && (
            <p id="partner_type-error" role="alert" className={errorClass}>
              {errors.partner_type.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="email" className={labelClass}>
            Contact Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email")}
            placeholder="partnerships@brand.com"
            className={inputClass}
          />
          {errors.email && (
            <p id="email-error" role="alert" className={errorClass}>
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="details" className={labelClass}>
          Proposal Details <span className="text-red-500">*</span>
        </label>
        <textarea
          id="details"
          rows={4}
          aria-invalid={errors.details ? "true" : "false"}
          aria-describedby={errors.details ? "details-error" : undefined}
          {...register("details")}
          placeholder="Tell us about your brand and how you would like to collaborate..."
          className={`${inputClass} resize-none`}
        />
        {errors.details && (
          <p id="details-error" role="alert" className={errorClass}>
            {errors.details.message}
          </p>
        )}
      </div>

      {submitError && (
        <p role="alert" className="text-center text-xs text-red-500">
          {submitError}
        </p>
      )}

      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 px-4 rounded-full bg-white border text-[#0a4d30] font-bold text-xs uppercase tracking-widest flex items-center justify-center space-x-2 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer focus-visible:ring-2 focus-visible:ring-[#0a4d30] focus-visible:ring-offset-2"
        >
          <span>{isSubmitting ? "Submitting..." : "Submit request"}</span>
        </button>
      </div>
    </form>
  );
}
