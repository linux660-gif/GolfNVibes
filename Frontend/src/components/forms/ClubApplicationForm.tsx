import { useEffect, useState } from "react";
import { ArrowRightIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../../services/api";
import { toast } from "react-toastify";
import Typewriter from "typewriter-effect";



const TYPEWRITER_LINES = [
  "Your Elite Golf Experience Awaits.",
  "Where Fairways Meet Friendships.",
  "Join The Circle. Play Without Limits.",
  "Luxury Golf. Global Access.",
  "Play Hard. Vibe Harder.",
];

export interface MemberData {
  full_name: string;
  email: string;
  handicap: string;
  club_id: string;
  vision: string;
}

interface Item {
  id: string;
  name: string;
}

interface MembershipApplicationFormProps {
  mediaUrl?: string;
  mediaType?: "image" | "video";
  mediaAlt?: string;
  overlayHeading?: string;
  overlayText?: string;
}

const schema = yup.object({
  full_name: yup.string().required("Full name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  handicap: yup.string().required("Handicap is required"),
  club_id: yup.string().required("Home club is required"),
  vision: yup.string().required("Please tell us why you'd like to join"),
});

const errorClass = "mt-1.5 text-xs text-red-500";
const labelClass =
  "mb-1.5 block text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-700";
const inputClass =
  "w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 hover:border-zinc-300 focus:border-[#D4AF37] focus:bg-white focus:ring-2 focus:ring-[#D4AF37]/10";

function MediaPanel({
  mediaUrl,
  mediaType = "image",
  mediaAlt = "Golf N Vibes",
  overlayText = "Join a global community of golfers, travelers, and connectors.",
}: MembershipApplicationFormProps) {
  return (
    <div className="relative min-h-64 w-full overflow-hidden bg-linear-to-br from-[#0a4d30] to-[#083d26] lg:min-h-full">
      {mediaUrl && mediaType === "video" && (
        <video
          src={mediaUrl}
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      {mediaUrl && mediaType === "image" && (
        <img
          src={mediaUrl}
          alt={mediaAlt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center sm:px-8">
        <h3 className="font-serif font-bold leading-snug text-white text-6xl">
          <Typewriter
            options={{
              strings: TYPEWRITER_LINES,
              autoStart: true,
              loop: true,
              cursor: '<span style="color: #D4AF37;">_</span>',
            }}
          />
        </h3>
        <p className="mt-3 max-w-xs text-xs leading-relaxed text-zinc-200 sm:text-sm">
          {overlayText}
        </p>
      </div>
    </div>
  );
}

export default function MembershipApplicationForm({
  mediaUrl,
  mediaType,
  mediaAlt,
  overlayText,
}: MembershipApplicationFormProps) {
  const [clubs, setClubs] = useState<Item[]>([]);
  const [clubsLoading, setClubsLoading] = useState(true);

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
      club_id: "",
      vision: "",
    },
  });

  const onSubmit = async (data: MemberData) => {
      await toast.promise(api.post("/member/", data), {
        pending: "Submitting your request...",
        success: "Application successfully submitted",
        error: "Something went wrong. Please try again.",
      });
      reset();
  };

  useEffect(() => {
    let isMounted = true;
    api
      .get("/member/club/")
      .then((response) => {
        if (!isMounted) return;
        setClubs(response.data);
      })
      .catch((err) => {
        if (!isMounted) return;
      console.error(err)
      })
      .finally(() => {
        if (isMounted) setClubsLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="grid grid-cols-1 overflow-hidden rounded-3xl border border-zinc-200 shadow-xl lg:grid-cols-2">
      <MediaPanel
        mediaUrl={mediaUrl}
        mediaType={mediaType}
        mediaAlt={mediaAlt}
        overlayText={overlayText}
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="space-y-7 bg-white p-8"
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
              aria-describedby={
                errors.full_name ? "full_name-error" : undefined
              }
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
                aria-describedby={
                  errors.handicap ? "handicap-error" : undefined
                }
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
            <label htmlFor="club_id" className={labelClass}>
              Home Club / Primary Affiliation{" "}
              <span className="text-red-500">*</span>
            </label>
            <select
              id="club_id"
              disabled={clubsLoading}
              aria-invalid={errors.club_id ? "true" : "false"}
              aria-describedby={errors.club_id ? "club_id-error" : undefined}
              {...register("club_id")}
              className="w-full cursor-pointer rounded-lg border border-zinc-200 bg-white px-3.5 py-2.5 text-xs text-black transition duration-200 focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <option value="">
                {clubsLoading
                  ? "Loading clubs..."
                    : "Select your club"}
              </option>
              {clubs.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            {errors.club_id && (
              <p id="club_id-error" role="alert" className={errorClass}>
                {errors.club_id.message}
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

        <div className="pt-1">
          <button
            type="submit"
            disabled={isSubmitting}
            className="group flex w-full items-center justify-center gap-3 rounded-xl bg-black px-6 py-4 text-xs font-bold uppercase tracking-[0.18em] text-white shadow-lg shadow-[#0a4d30]/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#0a4d30]/25 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-[#0a4d30] focus-visible:ring-offset-2"
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
            Applications are reviewed individually and confidentially by the
            Golf n Vibes Team.
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
    </div>
  );
}
