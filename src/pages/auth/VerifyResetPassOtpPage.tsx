import { Link, useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const formSchema = z.object({
  pin: z.string().min(6, {
    message: "Your confirmation code must be 6 characters.",
  }),
});

const VerifyResetPassOtpPage = () => {
  const navigate = useNavigate();
  const [isLoading] = useState(false);
  const email = sessionStorage.getItem("resetPasswordEmail") || "acb@domain";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pin: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    sessionStorage.setItem("resetPasswordOTP", values.pin);
    navigate("/reset-password");

    // try {
    //   setIsLoading(true);
    //   await axios.post(
    //     `${import.meta.env.VITE_BASE_URL}account/verify-reset-password-otp/`,
    //     { email, otp: values.pin },
    //   );
    //   toast.success("Email verified successfully.");
    //   sessionStorage.setItem("resetPasswordOTP", values.pin);
    //   navigate("/reset-password");
    // } catch (error: any) {
    //   console.error("Error during verification:", error);
    //   toast.error(
    //     error.response?.data?.message ||
    //       "Verification failed. Please try again.",
    //   );
    // } finally {
    //   setIsLoading(false);
    // }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 bg-[#F9FAFB]">
      <div className="mx-auto w-full max-w-150 space-y-8">
        <div className="w-full flex justify-start">
          <Link
            to="/forgot-password"
            className="flex items-center gap-1 text-[14px] font-semibold text-[#212B36] hover:opacity-80"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back
          </Link>
        </div>

        <header className="w-full text-center">
          <div className="space-y-3">
            <h1 className=" text-[32px] font-semibold leading-12 tracking-normal text-[#212B36]">
              Please check your email!
            </h1>
            <p className=" text-[16px] font-normal leading-6 text-[#637381]">
              We've emailed a 6-digit confirmation code to {email}, please enter
              the code in below box to verify your email.
            </p>
          </div>
        </header>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-8"
          >
            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center justify-center space-y-2">
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup className="gap-2 sm:gap-4!">
                        {Array.from({ length: 6 }).map((_, i) => (
                          <InputOTPSlot
                            key={i}
                            index={i}
                            className="h-12 w-10 sm:h-[60px] sm:w-[71px] rounded-[12px] border-l border border-[#DFE3E8] bg-white text-xl sm:text-2xl font-semibold text-[#212B36] first:border-l first:rounded-[12px] last:rounded-[12px] data-[active=true]:border-[#4371EB] data-[active=true]:ring-[#4371EB]/20"
                          />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage className="text-xs text-destructive text-center" />
                </FormItem>
              )}
            />

            <div className="pt-2">
              <Button
                type="submit"
                className="h-13 w-full rounded-lg bg-[#4371EB] font-[Inter] text-[16px] font-semibold leading-6 text-white shadow-none hover:bg-[#3c67db]"
                disabled={isLoading}
              >
                {isLoading ? "Verifying..." : "Verify"}
              </Button>
            </div>
          </form>
        </Form>

        <p className="text-center text-[16px] font-normal leading-6 text-[#637381]">
          Don't have a code?{" "}
          <button
            type="button"
            className="font-semibold text-[#4371EB] hover:underline"
            onClick={async () => {
              try {
                await axios.post(
                  `${import.meta.env.VITE_BASE_URL}account/forgot-password/`,
                  { email },
                );
                toast.success("Reset code resent to your email.");
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              } catch (error) {
                toast.error("Failed to resend code.");
              }
            }}
          >
            Resend code
          </button>
        </p>
      </div>
    </div>
  );
};

export default VerifyResetPassOtpPage;
