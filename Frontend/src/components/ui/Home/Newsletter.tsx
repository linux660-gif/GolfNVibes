import { useCallback } from "react";
import api from "../../../services/api";
import * as yup from "yup";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

export interface Newsletter {
  email: string;
}

const schema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email address")
    .required("Email is required"),
});

export default function GNVNewsletter() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Newsletter>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Newsletter> = useCallback(
    async (data) => {
      try {
        await api.post("/newsletter/", data);
        toast.success("Successfully subscribed to Golf N Vibes");
        reset();
      } catch (error) {
        toast.error("Something went wrong. Please try again.");
        console.error(error)
      }
    },
    [reset],
  );

  return (
    <div
      className="
        bg-gray-200 
        dark:bg-[oklch(.075_0_0)]
        mb-4 rounded-lg py-16 
        sm:py-24 lg:py-15 px-4 
        flex items-center justify-center
      "
    >
      <div className="flex flex-col items-center justify-center text-center">
        <h2
          className="
            text-2xl sm:text-3xl md:text-4xl 
            tracking-tight text-black 
            dark:text-white font-bold px-2
          "
        >
          Join Thousands Vibing With Golf N Vibes
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="relative mt-6 flex w-full max-w-md px-4 sm:px-0"
        >
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>

          <input
            id="email-address"
            {...register("email")}
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "email-error" : undefined}
            className="
              placeholder:animate-typewriter
              w-full min-w-0 
              rounded-full bg-white 
              dark:bg-white/5 
              pl-4 pr-28 py-3 
              text-base 
              dark:text-white 
              text-gray-900 
              outline-1 
              outline-gray-400
              focus:outline-2 
              focus:outline-green-500
            "
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="
              absolute right-4.5 sm:right-1 
              top-1.5 rounded-full 
              bg-green-500 
              dark:bg-[#bd982e] 
              px-4 py-2 
              text-sm font-semibold 
              text-white
              disabled:opacity-70 disabled:cursor-not-allowed
            "
          >
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </button>
        </form>

        {errors.email?.message && (
          <p
            id="email-error"
            role="alert"
            className="mt-2 text-sm text-red-500"
          >
            {errors.email.message}
          </p>
        )}

        <p className="text-sm dark:text-gray-400 mt-2">
          You agree to receive Golf N Vibes Emails
        </p>
      </div>
    </div>
  );
}
