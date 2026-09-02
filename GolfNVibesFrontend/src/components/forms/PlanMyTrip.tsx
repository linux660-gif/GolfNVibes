import { useEffect } from "react";
import {
  useForm,
  Controller,
  useWatch,
  type SubmitHandler,
  type Resolver,
  type UseFormRegister,
  type Path,
} from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import PhoneInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import api from "../../services/api";
import "react-phone-number-input/style.css";
import { motion, AnimatePresence } from "framer-motion";
import EXPERIENCES from "../../data/experiences.json";
import destinations from "../../data/destinations.json";
import { toast } from "react-toastify";

export interface PlanDetailsFormData {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  continent: string;
  destination: string;
  other_destination?: string;
  date: string;
  flexible_dates: string;
  golfers: number;
  non_golfers: number;
  budget: string;
  rounds: number;
  hotel: string;
  flights: string;
  airport_transfers: string;
  experiences: string[];
  additional_specifications?: string;
}

const defaultSchema = yup.object().shape({
  first_name: yup.string().trim().required("First name is required"),
  last_name: yup.string().trim().required("Last name is required"),
  email: yup
    .string()
    .trim()
    .email("Invalid email address")
    .required("Email is required"),
  phone_number: yup.string().required("Phone number is required"),
  continent: yup.string().required("Please select a continent"),
  destination: yup.string().required("Please select a destination"),
  other_destination: yup.string().when("destination", {
    is: "Other (Please Specify)",
    then: (schema) => schema.required("Please specify your destination"),
    otherwise: (schema) => schema.optional().default(""),
  }),
  date: yup.string().required("Please select your preferred travel date"),
  flexible_dates: yup.string().required("Please select an option"),
  golfers: yup
    .number()
    .typeError("Please enter a valid number")
    .integer("Must be a whole number")
    .min(1, "At least 1 golfer is required")
    .required("Please enter the number of golfers"),
  non_golfers: yup
    .number()
    .typeError("Please enter a valid number")
    .integer("Must be a whole number")
    .min(0, "Cannot be less than 0")
    .required("Please enter the number of non-golfers"),
  budget: yup.string().required("Please enter your approximate budget"),
  rounds: yup
    .number()
    .typeError("Please enter a valid number")
    .integer("Must be a whole number")
    .min(1, "At least 1 round is required")
    .required("Please enter the number of rounds"),
  hotel: yup.string().required("Please select a hotel preference"),
  flights: yup.string().required("Please select whether flights are required"),
  airport_transfers: yup
    .string()
    .required("Please select whether airport transfers are required"),
  experiences: yup.array().of(yup.string().defined()).default([]),
  additional_specifications: yup.string().optional().default(""),
});

const inputClass =
  "w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-black outline-none transition-all duration-300 placeholder:text-zinc-400 hover:border-zinc-500 focus:border-[#bd982e] focus:ring-2 focus:ring-[#bd982e]/20";
const labelClass =
  "mb-2 block text-[11px] font-semibold uppercase tracking-[0.15em] text-zinc-700";
const errorClass = "mt-1.5 text-xs text-red-500";

interface TextFieldProps {
  id: Path<PlanDetailsFormData>;
  label: string;
  register: UseFormRegister<PlanDetailsFormData>;
  error?: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  min?: number | string;
  valueAsNumber?: boolean;
  inputMode?: "numeric" | "text";
}

function TextField({
  id,
  label,
  register,
  error,
  required,
  type = "text",
  placeholder,
  min,
  valueAsNumber,
  inputMode,
}: TextFieldProps) {
  const errorId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label} {required && <span className="text-[#bd982e]">*</span>}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        min={min}
        inputMode={inputMode}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? errorId : undefined}
        {...register(id, valueAsNumber ? { valueAsNumber: true } : undefined)}
        className={inputClass}
      />
      {error && (
        <p id={errorId} role="alert" className={errorClass}>
          {error}
        </p>
      )}
    </div>
  );
}

interface RadioGroupProps {
  legend: string;
  name: Path<PlanDetailsFormData>;
  register: UseFormRegister<PlanDetailsFormData>;
  error?: string;
  options?: string[];
}

function RadioGroup({
  legend,
  name,
  register,
  error,
  options = ["yes", "no"],
}: RadioGroupProps) {
  const errorId = `${name}-error`;
  return (
    <fieldset>
      <legend className={labelClass}>{legend}</legend>
      <div
        className="flex h-11 items-center gap-6 rounded-xl border border-gray-300 bg-white px-4"
        aria-describedby={error ? errorId : undefined}
      >
        {options.map((option) => (
          <label
            key={option}
            className="flex cursor-pointer items-center gap-2 text-sm capitalize text-zinc-700"
          >
            <input
              type="radio"
              value={option}
              {...register(name)}
              className="h-4 w-4 accent-[#bd982e]"
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
      {error && (
        <p id={errorId} role="alert" className={errorClass}>
          {error}
        </p>
      )}
    </fieldset>
  );
}

function FormSection({
  eyebrow,
  description,
  children,
}: {
  eyebrow: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <div className="mb-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#bd982e]">
          {eyebrow}
        </p>
        {description && (
          <p className="mt-1 text-xs text-zinc-500">{description}</p>
        )}
      </div>
      <div className="grid gap-4">{children}</div>
    </div>
  );
}

export default function PlanTripForm() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PlanDetailsFormData>({
    resolver: yupResolver(defaultSchema) as Resolver<PlanDetailsFormData>,
    defaultValues: {
      experiences: [],
      golfers: 1,
      non_golfers: 0,
      rounds: 1,
      flexible_dates: "no",
      flights: "no",
      airport_transfers: "no",
      hotel: "4★ Hotel",
    },
  });

  const continent = useWatch({ control, name: "continent" });
  const destination = useWatch({ control, name: "destination" });
  const selectedExperiences = watch("experiences") || [];

  const availableDestinations =
    destinations.CONTINENTS.find((item) => item.continent === continent)
      ?.destinations || [];

  useEffect(() => {
    setValue("destination", "");
  }, [continent, setValue]);

  const handleFormSubmit: SubmitHandler<PlanDetailsFormData> = async (data) => {
    try {
      await toast.promise(api.post("trips", data), {
        pending: "Submitting your request...",
        success: "Custom trip successfully submitted!"
      });
      reset();
    } catch {
      // error toast already shown by api/errors
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="relative mx-auto my-8 w-full max-w-7xl overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 font-sans text-slate-800 shadow-sm lg:my-16">
      <div className="mb-8 text-center sm:text-left border-b border-slate-100 pb-6">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Plan Your Golf Trip
        </h2>
        <p className="mt-2 text-sm text-slate-600 sm:text-base">
          Provide your travel details below and let us curate a personalized,
          luxury golf itinerary tailored to your group.
        </p>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-6">
            <FormSection
              eyebrow="Personal Information"
              description="Please provide your contact details."
            >
              <TextField
                id="first_name"
                label="First Name"
                required
                placeholder="John"
                register={register}
                error={errors.first_name?.message}
              />
              <TextField
                id="last_name"
                label="Last Name"
                required
                placeholder="Willis"
                register={register}
                error={errors.last_name?.message}
              />
              <TextField
                id="email"
                label="Email Address"
                type="email"
                required
                placeholder="john.doe@example.com"
                register={register}
                error={errors.email?.message}
              />
              <div>
                <label htmlFor="phone_number" className={labelClass}>
                  Phone Number <span className="text-[#bd982e]">*</span>
                </label>
                <Controller
                  control={control}
                  name="phone_number"
                  render={({ field: { onChange, value } }) => (
                    <PhoneInput
                      id="phone_number"
                      defaultCountry="KE"
                      flags={flags}
                      international
                      value={value}
                      onChange={onChange}
                      className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm"
                    />
                  )}
                />
                {errors.phone_number && (
                  <p role="alert" className={errorClass}>
                    {errors.phone_number.message}
                  </p>
                )}
              </div>
            </FormSection>

            <FormSection
              eyebrow="Destination"
              description="Where would you like your golf journey to take you?"
            >
              <div>
                <label className={labelClass}>
                  Preferred Continent <span className="text-[#bd982e]">*</span>
                </label>
                <select {...register("continent")} className={inputClass}>
                  <option value="">Select Continent</option>
                  {destinations.CONTINENTS.map((item) => (
                    <option key={item.continent} value={item.continent}>
                      {item.continent}
                    </option>
                  ))}
                </select>
                {errors.continent && (
                  <p role="alert" className={errorClass}>
                    {errors.continent.message}
                  </p>
                )}
              </div>

              <div>
                <label className={labelClass}>
                  Preferred Destination{" "}
                  <span className="text-[#bd982e]">*</span>
                </label>
                <select
                  {...register("destination")}
                  disabled={!continent}
                  className={`${inputClass} disabled:cursor-not-allowed disabled:opacity-60`}
                >
                  <option value="">
                    {continent
                      ? "Select Destination"
                      : "Select a continent first"}
                  </option>
                  {availableDestinations.map((dest: string) => (
                    <option key={dest} value={dest}>
                      {dest}
                    </option>
                  ))}
                </select>
                {errors.destination && (
                  <p role="alert" className={errorClass}>
                    {errors.destination.message}
                  </p>
                )}
              </div>

              <AnimatePresence mode="wait">
                {destination === "Other (Please Specify)" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, y: -10 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <TextField
                      id="other_destination"
                      label="Specify Destination"
                      required
                      placeholder="Enter custom destination"
                      register={register}
                      error={errors.other_destination?.message}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </FormSection>

            <FormSection eyebrow="">
              <TextField
                id="date"
                label="Preferred Date"
                type="date"
                required
                min={today}
                register={register}
                error={errors.date?.message}
              />
              <RadioGroup
                legend="Flexible Dates?"
                name="flexible_dates"
                register={register}
                error={errors.flexible_dates?.message}
              />
            </FormSection>
          </div>

          <div className="space-y-6">
            <FormSection
              eyebrow="Golf Party"
              description="Tell us about your travelling party."
            >
              <TextField
                id="golfers"
                label="Number of Golfers"
                type="number"
                min={1}
                inputMode="numeric"
                valueAsNumber
                register={register}
                error={errors.golfers?.message}
              />
              <TextField
                id="non_golfers"
                label="Non-Golfers"
                type="number"
                min={0}
                inputMode="numeric"
                valueAsNumber
                register={register}
                error={errors.non_golfers?.message}
              />
              <TextField
                id="rounds"
                label="Number of Rounds"
                type="number"
                min={1}
                inputMode="numeric"
                valueAsNumber
                register={register}
                error={errors.rounds?.message}
              />
            </FormSection>

            <FormSection eyebrow="">
              <TextField
                id="budget"
                label="Budget Per Person"
                placeholder="$3,000 - $5,000"
                register={register}
                error={errors.budget?.message}
              />
              <div>
                <label className={labelClass}>Hotel Preference</label>
                <select {...register("hotel")} className={inputClass}>
                  <option value="3★ Hotel">3★ Hotel</option>
                  <option value="4★ Hotel">4★ Hotel</option>
                  <option value="5★ Hotel">5★ Hotel</option>
                  <option value="Luxury Villa">Luxury Villa</option>
                </select>
                {errors.hotel && (
                  <p role="alert" className={errorClass}>
                    {errors.hotel.message}
                  </p>
                )}
              </div>
            </FormSection>

            <FormSection
              eyebrow="Travel Services"
              description="Let us take care of the logistics."
            >
              <RadioGroup
                legend="Arrange Flights?"
                name="flights"
                register={register}
                error={errors.flights?.message}
              />
              <RadioGroup
                legend="Airport Transfers?"
                name="airport_transfers"
                register={register}
                error={errors.airport_transfers?.message}
              />
            </FormSection>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="mb-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-green-700">
                  Experiences
                </p>
                <p className="mt-1 text-xs leading-5 text-zinc-500">
                  Choose the experiences you would like included in your
                  itinerary.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {EXPERIENCES.EXPERIENCES.map((experience) => {
                  const isActive = selectedExperiences.includes(experience);
                  return (
                    <motion.label
                      key={experience}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      className="cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        value={experience}
                        {...register("experiences")}
                        className="peer sr-only"
                      />
                      <span
                        className={`flex min-h-13 items-center justify-center rounded-xl border px-3 py-3 text-center text-xs font-medium leading-4 transition-all duration-300 sm:text-sm ${
                          isActive
                            ? "border-[#bd982e] bg-[#bd982e]/10 text-[#bd982e] shadow-sm"
                            : "border-gray-200 bg-white text-zinc-600 hover:border-zinc-400 hover:text-zinc-800"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {isActive && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              className="h-4 w-4 shrink-0"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m5 12 4 4L19 6"
                              />
                            </svg>
                          )}
                          {experience}
                        </span>
                      </span>
                    </motion.label>
                  );
                })}
              </div>
              {errors.experiences && (
                <p role="alert" className={errorClass}>
                  {errors.experiences.message}
                </p>
              )}
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="mb-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#bd982e]">
                  Bespoke Requirements
                </p>
                <p className="mt-1 text-xs leading-5 text-zinc-500">
                  Tell us anything else that would make your trip exceptional.
                </p>
              </div>
              <label htmlFor="additional_specifications" className={labelClass}>
                Additional Requirements
              </label>
              <textarea
                id="additional_specifications"
                rows={4}
                {...register("additional_specifications")}
                placeholder="Tell us about specific golf courses, dietary requirements, special occasions, or preferred activities..."
                className="w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm leading-6 text-black outline-none transition-all duration-300 placeholder:text-zinc-400 hover:border-zinc-500 focus:border-[#bd982e] focus:ring-2 focus:ring-[#bd982e]/20"
              />
              {errors.additional_specifications && (
                <p role="alert" className={errorClass}>
                  {errors.additional_specifications.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-[#0a4d30] py-3 text-sm font-semibold uppercase tracking-wider text-white transition-colors duration-300 hover:bg-[#083d26] disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-[#0a4d30] focus-visible:ring-offset-2"
            >
              {isSubmitting ? "Submitting..." : "Submit Proposal"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
