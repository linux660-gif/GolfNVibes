import { useEffect, useState } from "react";
import {
  useForm,
  Controller,
  useWatch,
  type SubmitHandler,
  type Resolver,
  type UseFormRegister,
  type Path,
  type FieldValues,
} from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import PhoneInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import "react-phone-number-input/style.css";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import api from "../../services/api";

export interface PlanDetailsFormData {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  continent_id: string;
  destination_id: string;
  other_destination?: string;
  start_date: string;
  end_date: string;
  flexible_dates: string;
  golfers: number;
  non_golfers: number;
  budget: string;
  rounds: number;
  hotel_id: string;
  flights: string;
  airport_transfers: string;
  experiences: string[];
  additional_specifications?: string;
}

export interface Continents {
  id: number;
  name: string;
}

export interface Destinations {
  id: number;
  name: string;
  continent_id: number;
}

export interface Hotels {
  id: string;
  name: string;
}

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps<T extends FieldValues> {
  id: Path<T>;
  label: string;
  register: UseFormRegister<T>;
  error?: string;
  options: SelectOption[];
  disabled?: boolean;
}

const experiences = [
  "Safari",
  "Beach Holiday",
  "Cultural Experiences",
  "Wildlife",
  "Adventure",
  "Spa & Wellness",
  "Food & Wine",
  "Sightseeing",
];

const validationSchema = yup.object({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("Enter a valid email address")
    .required("Email is required"),
  phone_number: yup.string().required("Phone number is required"),
  continent_id: yup.string().required("Please select a continent"),
  destination_id: yup.string().required("Please select a destination"),
  other_destination: yup.string().when("destination_id", {
    is: "Other (Please Specify)",
    then: (schema) => schema.required("Please specify your destination"),
    otherwise: (schema) => schema.notRequired(),
  }),
  start_date: yup.string().required("Start date is required"),
  end_date: yup
    .string()
    .required("End date is required")
    .test(
      "end-after-start",
      "End date must be after start date",
      function (value) {
        const { start_date } = this.parent;
        if (!value || !start_date) return true;
        return new Date(value) >= new Date(start_date);
      }
    ),
  flexible_dates: yup.string().required("Please select an option"),
  golfers: yup
    .number()
    .typeError("Number of golfers is required")
    .min(1, "At least one golfer is required")
    .required("Number of golfers is required"),
  non_golfers: yup
    .number()
    .typeError("Enter a valid number")
    .min(0, "Cannot be negative")
    .required("Number of non-golfers is required"),
  budget: yup.string().required("Please select your budget"),
  rounds: yup
    .number()
    .typeError("Number of rounds is required")
    .min(1, "At least one round is required")
    .required("Number of rounds is required"),
  hotel_id: yup.string().required("Please select a hotel"),
  flights: yup.string().required("Please select an option"),
  airport_transfers: yup.string().required("Please select an option"),
  experiences: yup.array().of(yup.string().required()).default([]),
  additional_specifications: yup.string().notRequired(),
});

function SelectField<T extends FieldValues>({
  id,
  label,
  register,
  error,
  options,
  disabled = false,
}: SelectFieldProps<T>) {
  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        {label}
      </label>

      <select
        id={id}
        {...register(id)}
        disabled={disabled}
        className={`w-full rounded-lg border bg-white px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100 ${
          error ? "border-red-500" : "border-gray-300"
        } ${disabled ? "cursor-not-allowed bg-gray-100 text-gray-500" : ""}`}
      >
        <option value="">Select {label}</option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}

const PlanTripForm = () => {
  const [continents, setContinents] = useState<Continents[]>([]);
  const [destinations, setDestinations] = useState<Destinations[]>([]);
  const [hotels, setHotels] = useState<Hotels[]>([]);
  const [destinationLoading, setDestinationLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<PlanDetailsFormData>({
    resolver: yupResolver(
      validationSchema
    ) as Resolver<PlanDetailsFormData>,
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      continent_id: "",
      destination_id: "",
      other_destination: "",
      start_date: "",
      end_date: "",
      flexible_dates: "no",
      golfers: 1,
      non_golfers: 0,
      budget: "",
      rounds: 1,
      hotel_id: "",
      flights: "no",
      airport_transfers: "no",
      experiences: [],
      additional_specifications: "",
    },
  });

  const continent = useWatch({
    control,
    name: "continent_id",
  });

  const destination = useWatch({
    control,
    name: "destination_id",
  });

  useEffect(() => {
    const loadContinents = async () => {
      try {
        const response = await api.get("/destination/continent/");

        setContinents(response.data);
      } catch (error) {
        console.error("Failed to load continents:", error);
        setContinents([]);
        toast.error("Failed to load continents");
      }
    };

    loadContinents();
  }, []);

  useEffect(() => {
    const loadHotels = async () => {
      try {
        const response = await api.get("/trip/hotel/");

        setHotels(response.data);
      } catch (error) {
        console.error("Failed to load hotels:", error);
        setHotels([]);
        toast.error("Failed to load hotels");
      }
    };

    loadHotels();
  }, []);

  useEffect(() => {
    if (!continent) {
      setValue("destination_id", "");
      setValue("other_destination", "");
      return;
    }

    let isMounted = true;

    const loadDestinations = async () => {
      setDestinationLoading(true);
      setDestinations([]);
      setValue("destination_id", "");
      setValue("other_destination", "");

      try {
        const response = await api.get("/trip/destination/", {
          params: {
            continent_id: Number(continent),
          },
        });

        if (!isMounted) return;

        setDestinations(response.data);
      } catch (error) {
        if (!isMounted) return;

        console.error("Failed to load destinations:", error);
        setDestinations([]);
        toast.error("Failed to load destinations");
      } finally {
        if (isMounted) {
          setDestinationLoading(false);
        }
      }
    };

    loadDestinations();

    return () => {
      isMounted = false;
    };
  }, [continent, setValue]);

  useEffect(() => {
    if (destination !== "Other (Please Specify)") {
      setValue("other_destination", "");
    }
  }, [destination, setValue]);

  const onSubmit: SubmitHandler<PlanDetailsFormData> = async (data) => {
    setLoading(true);

    try {
      await toast.promise(api.post("/trips", data), {
        pending: "Submitting your request...",
        success: "Custom trip successfully submitted!",
        error: "Failed to submit your trip request.",
      });

      reset();
      setDestinations([]);
    } catch (error) {
      console.error("Trip submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full bg-white py-12">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl bg-white p-6 shadow-xl sm:p-8 lg:p-10"
        >
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Plan Your Custom Golf Trip
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-gray-600">
              Tell us what you are looking for and our team will create a
              personalized golf experience for you.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
            <div>
              <h3 className="mb-5 text-xl font-semibold text-gray-900">
                Personal Information
              </h3>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="first_name"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    First Name
                  </label>

                  <input
                    id="first_name"
                    type="text"
                    {...register("first_name")}
                    className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100 ${
                      errors.first_name
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="First name"
                  />

                  {errors.first_name && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.first_name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="last_name"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </label>

                  <input
                    id="last_name"
                    type="text"
                    {...register("last_name")}
                    className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100 ${
                      errors.last_name
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Last name"
                  />

                  {errors.last_name && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.last_name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    type="email"
                    {...register("email")}
                    className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100 ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="you@example.com"
                  />

                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone_number"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>

                  <Controller
                    name="phone_number"
                    control={control}
                    render={({ field }) => (
                      <PhoneInput
                        {...field}
                        id="phone_number"
                        international
                        defaultCountry="KE"
                        flags={flags}
                        className={`w-full rounded-lg border px-4 py-3 text-sm ${
                          errors.phone_number
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                    )}
                  />

                  {errors.phone_number && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.phone_number.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-5 text-xl font-semibold text-gray-900">
                Destination
              </h3>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <SelectField
                  id="continent_id"
                  label="Continent"
                  register={register}
                  error={errors.continent_id?.message}
                  options={continents.map((item) => ({
                    value: item.id.toString(),
                    label: item.name,
                  }))}
                />

                <SelectField
                  id="destination_id"
                  label="Destination"
                  register={register}
                  error={errors.destination_id?.message}
                  disabled={!continent || destinationLoading}
                  options={[
                    ...destinations.map((item) => ({
                      value: item.id.toString(),
                      label: item.name,
                    })),
                    {
                      value: "Other (Please Specify)",
                      label: "Other (Please Specify)",
                    },
                  ]}
                />
              </div>

              {destinationLoading && (
                <p className="mt-2 text-sm text-gray-500">
                  Loading destinations...
                </p>
              )}

              {destination &&
                destination !== "Other (Please Specify)" &&
                destinations.length === 0 &&
                !destinationLoading && (
                  <p className="mt-2 text-sm text-gray-500">
                    No destinations available for this continent.
                  </p>
                )}

              {destination === "Other (Please Specify)" && (
                <div className="mt-5">
                  <label
                    htmlFor="other_destination"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Specify Your Destination
                  </label>

                  <input
                    id="other_destination"
                    type="text"
                    {...register("other_destination")}
                    className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100 ${
                      errors.other_destination
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Enter your preferred destination"
                  />

                  {errors.other_destination && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.other_destination.message}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div>
              <h3 className="mb-5 text-xl font-semibold text-gray-900">
                Travel Dates
              </h3>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="start_date"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Start Date
                  </label>

                  <input
                    id="start_date"
                    type="date"
                    {...register("start_date")}
                    min={new Date().toISOString().split("T")[0]}
                    className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100 ${
                      errors.start_date
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />

                  {errors.start_date && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.start_date.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="end_date"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    End Date
                  </label>

                  <input
                    id="end_date"
                    type="date"
                    {...register("end_date")}
                    min={new Date().toISOString().split("T")[0]}
                    className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100 ${
                      errors.end_date
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />

                  {errors.end_date && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.end_date.message}
                    </p>
                  )}
                </div>

                <SelectField
                  id="flexible_dates"
                  label="Are Your Dates Flexible?"
                  register={register}
                  error={errors.flexible_dates?.message}
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                />
              </div>
            </div>

            <div>
              <h3 className="mb-5 text-xl font-semibold text-gray-900">
                Golf Details
              </h3>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                <div>
                  <label
                    htmlFor="golfers"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Number of Golfers
                  </label>

                  <input
                    id="golfers"
                    type="number"
                    min="1"
                    {...register("golfers", { valueAsNumber: true })}
                    className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100 ${
                      errors.golfers
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />

                  {errors.golfers && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.golfers.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="non_golfers"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Number of Non-Golfers
                  </label>

                  <input
                    id="non_golfers"
                    type="number"
                    min="0"
                    {...register("non_golfers", { valueAsNumber: true })}
                    className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100 ${
                      errors.non_golfers
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />

                  {errors.non_golfers && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.non_golfers.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="rounds"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Number of Golf Rounds
                  </label>

                  <input
                    id="rounds"
                    type="number"
                    min="1"
                    {...register("rounds", { valueAsNumber: true })}
                    className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100 ${
                      errors.rounds ? "border-red-500" : "border-gray-300"
                    }`}
                  />

                  {errors.rounds && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.rounds.message}
                    </p>
                  )}
                </div>

                <SelectField
                  id="budget"
                  label="Budget"
                  register={register}
                  error={errors.budget?.message}
                  options={[
                    {
                      value: "1500-2500",
                      label: "$1,500 – $2,500",
                    },
                    {
                      value: "3000-5000",
                      label: "$3,000 – $5,000",
                    },
                  ]}
                />

                <SelectField
                  id="hotel_id"
                  label="Hotel"
                  register={register}
                  error={errors.hotel_id?.message}
                  options={hotels.map((hotel) => ({
                    value: hotel.id,
                    label: hotel.name,
                  }))}
                />

                <SelectField
                  id="flights"
                  label="Flights"
                  register={register}
                  error={errors.flights?.message}
                  options={[
                    {
                      value: "yes",
                      label: "Yes, I need flights",
                    },
                    {
                      value: "no",
                      label: "No, I will arrange my own flights",
                    },
                  ]}
                />

                <SelectField
                  id="airport_transfers"
                  label="Airport Transfers"
                  register={register}
                  error={errors.airport_transfers?.message}
                  options={[
                    {
                      value: "yes",
                      label: "Yes",
                    },
                    {
                      value: "no",
                      label: "No",
                    },
                  ]}
                />
              </div>
            </div>

            <div>
              <h3 className="mb-5 text-xl font-semibold text-gray-900">
                Experiences
              </h3>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                {experiences.map((experience) => (
                  <label
                    key={experience}
                    className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-3 transition hover:border-green-500 hover:bg-green-50"
                  >
                    <input
                      type="checkbox"
                      value={experience}
                      {...register("experiences")}
                      className="h-4 w-4 rounded border-gray-300"
                    />

                    <span className="text-sm text-gray-700">
                      {experience}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label
                htmlFor="additional_specifications"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Additional Specifications
              </label>

              <textarea
                id="additional_specifications"
                rows={5}
                {...register("additional_specifications")}
                className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100 ${
                  errors.additional_specifications
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                placeholder="Tell us anything else you would like us to know..."
              />

              {errors.additional_specifications && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.additional_specifications.message}
                </p>
              )}
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-green-700 px-8 py-4 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {loading ? "Submitting..." : "Submit Trip Request"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default PlanTripForm;