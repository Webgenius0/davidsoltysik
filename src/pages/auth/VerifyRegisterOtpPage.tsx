import { Link, useNavigate } from "react-router";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthContext } from "@/hooks/useAppContext";
import { Button } from "@/components/ui/button";

const VerifyRegisterOtpPage = () => {
  useAuthContext();
  const [otpValue, setOtpValue] = useState<string>("");
  const [isSubmitting] = useState(false);
  const email = sessionStorage.getItem("registeredEmail") || "acb@domain";
  const navigate = useNavigate();
  const [resendTimer, setResendTimer] = useState<number>(0);
  const [isResendLoading, setIsResendLoading] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleSubmit = async () => {
    navigate("/login");

    // try {
    //   setIsSubmitting(true);
    //   const response = await axios.post(
    //     `${import.meta.env.VITE_BASE_URL}account/verify-email/`,
    //     { email, code: otpValue },
    //   );

    //   const { access, refresh } = response.data.data.data.tokens;
    //   const user = response.data.data.data.user;

    //   login(access, refresh, user);
    //   toast.success(response?.data?.message || "Email verified successfully!");

    //   navigate("/login");
    // } catch (error: any) {
    //   console.error("Error during form submission:", error);
    //   toast.error(
    //     error?.response?.data?.message ||
    //       "An unexpected error occurred. Please try again.",
    //   );
    // } finally {
    //   setIsSubmitting(false);
    // }
  };

  const handleResendOtp = async () => {
    try {
      setIsResendLoading(true);
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}account/resend-verification/`,
        { email },
      );
      toast.success("OTP has been resent to your email.");
      setResendTimer(60); // Start 60 second timer
    } catch (error: any) {
      console.error("Resend OTP error:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to resend OTP. Please try again.",
      );
    } finally {
      setIsResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 bg-[#F9FAFB]">
      <div className="mx-auto w-full max-w-150 space-y-8">
        <div className="w-full flex justify-start">
          <Link
            to="/register"
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

        <div className="w-full space-y-8 flex flex-col items-center">
          <InputOTP
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS}
            value={otpValue}
            onChange={(value: string) => setOtpValue(value)}
          >
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

          <div className="pt-2 w-full">
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || otpValue.length < 6}
              className="h-13 w-full rounded-lg bg-[#4371EB] font-[Inter] text-[16px] font-semibold leading-6 text-white shadow-none hover:bg-[#3c67db]"
            >
              {isSubmitting ? "Verifying..." : "Verify"}
            </Button>
          </div>
        </div>

        <p className="text-center text-[16px] font-normal leading-6 text-[#637381]">
          Don't have a code?{" "}
          {resendTimer > 0 ? (
            <span className="font-semibold text-[#4371EB]">
              Resend in {resendTimer}s
            </span>
          ) : (
            <button
              type="button"
              className="font-semibold text-[#4371EB] hover:underline disabled:opacity-50"
              onClick={handleResendOtp}
              disabled={isResendLoading}
            >
              Resend code
            </button>
          )}
        </p>
      </div>
    </div>
  );
};

export default VerifyRegisterOtpPage;
