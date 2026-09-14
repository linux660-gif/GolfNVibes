import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowRightIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import api from "../../services/api";
import { toast } from "react-toastify";

export interface ContactData {
  name: string;
  email: string;
  message: string;
  topic:string
}

export interface inquiry {
  inquiryType: string;
}

export default function Contacts({ topic }: { topic: string }) {
  const schema = yup.object({
    name: yup.string().required("Please enter your name"),
    email: yup
      .string()
      .email("Enter a valid email address")
      .required("Please enter an email"),
    message: yup.string().min(10).required("Enter a Message.."),
    topic: yup.string().required()
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      topic:''
    },
  });
  const onSubmit = async (data: ContactData) => {
      const submissionPromise = api.post("/contacts/", data);
      await toast.promise(submissionPromise, {
        pending: "Submitting Your Request ....",
        success: "Message Successfully Submitted",
        error: "Something went wrong. Please try again.",
      });
  };
  const errorclass = "mt-1.5 text-xs text-red-500";
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 transition-all duration-300"
    >
      <h3 className="text-lg font-serif font-bold capitalize text-black tracking-wide">
        {topic} Inquiry
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[11px] font-semibold text-black mb-1 uppercase tracking-wider">
            Name
          </label>
          <input
            type="text"
            placeholder="Your Name"
            {...register("name")}
            className="w-full rounded-lg px-3.5 py-2.5 text-xs bg-white text-black border border-zinc-800 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none transition-all duration-200"
          />
          {errors.name && <p className={errorclass}>{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-[11px] font-semibold text-black mb-1 uppercase tracking-wider">
            Email
          </label>
          <input
            type="email"
            {...register("email")}
            placeholder="username@company.com"
            className="w-full rounded-lg px-3.5 py-2.5 text-xs bg-white text-black border border-zinc-800 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none transition-all duration-200"
          />
          {errors.email && <p className={errorclass}>{errors.email.message}</p>}
        </div>
      </div>
      <div>
        <label className="block text-[11px] font-semibold text-black mb-1 uppercase tracking-wider">
          Message
        </label>
        <textarea
          rows={4}
          {...register("message")}
          placeholder="How can our executive team assist you?"
          className="w-full rounded-lg px-3.5 py-2.5 text-xs bg-white text-black border border-zinc-800 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none transition-all duration-200 resize-none"
        />
        {errors.message && (
          <p className={errorclass}>{errors.message.message}</p>
        )}
      </div>
      <button
        type="submit"
        className=" space-x-2  flex  group items-center justify-center w-full py-3 rounded-xl text-black bg-white font-bold text-xs uppercase tracking-widest  transition-all duration-300 hover:bg-zinc-200 hover:shadow-lg active:scale-[0.99] cursor-pointer"
      >
        <span> {isSubmitting ? "Sending..." : "Send Message"}</span>
        <ArrowRightIcon className="w-4 h-4 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1" />
      </button>
    </form>
  );
}
