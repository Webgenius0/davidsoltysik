import { Link, useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

const imgVuesaxLinearSms =
  "https://www.figma.com/api/mcp/asset/99b4e4db-5bc4-41de-8f1b-ec374d46895d";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const [isLoading] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    sessionStorage.setItem("resetPasswordEmail", values.email);
    navigate("/verify-reset-pass-otp");

    // try {
    //   setIsLoading(true);
    //   await axios.post(
    //     `${import.meta.env.VITE_BASE_URL}account/forgot-password/`,
    //     { email: values.email }
    //   );
    //   toast.success("Reset code sent to your email.");
    //   navigate("/verify-reset-pass-otp");
    // } catch (error: any) {
    //   console.error("Error during form submission:", error);
    //   toast.error(
    //     error.response?.data?.message ||
    //       "An unexpected error occurred. Please try again.",
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
            to="/login"
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
              Forgot your password?
            </h1>
            <p className=" text-[16px] font-normal leading-6 text-[#637381]">
              Please enter the email address associated with your account, and
              we'll email you a link to reset your password.
            </p>
          </div>
        </header>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormControl>
                    <FieldShell
                      icon={
                        <img
                          src={imgVuesaxLinearSms}
                          alt=""
                          className="size-6"
                        />
                      }
                    >
                      <input
                        {...field}
                        placeholder="johncarter@brix.com"
                        className={inputClassName}
                      />
                    </FieldShell>
                  </FormControl>
                  <FormMessage className=" text-xs text-destructive" />
                </FormItem>
              )}
            />

            <div className="pt-2">
              <Button
                type="submit"
                className="h-13 w-full rounded-lg bg-[#4371EB] font-[Inter] text-[16px] font-semibold leading-6 text-white shadow-none hover:bg-[#3c67db]"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Reset Password"}
              </Button>
            </div>
          </form>
        </Form>

        <div className="w-full text-center pt-2">
          <Link
            to="/login"
            className="text-[14px] font-semibold text-[#212B36] hover:opacity-80"
          >
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;

const inputClassName =
  "w-full border-0 bg-transparent p-0  text-[16px] font-semibold leading-6 text-[#212B36] placeholder:text-[#212B36] placeholder:opacity-100 focus:outline-none";

type FieldShellProps = {
  icon: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
  children: ReactNode;
};

function FieldShell({ icon, rightIcon, className, children }: FieldShellProps) {
  return (
    <div
      className={cn(
        "flex h-14 items-center gap-3 rounded-[12px] border border-[#DFE3E8] bg-[#F9FAFB] px-4 shadow-[0px_0.5px_0.5px_rgba(25,33,61,0.04)]",
        className,
      )}
    >
      <span className="flex size-6 shrink-0 items-center justify-center">
        {icon}
      </span>
      <div className="min-w-0 flex-1">{children}</div>
      {rightIcon ? (
        <span className="flex size-6 shrink-0 items-center justify-center">
          {rightIcon}
        </span>
      ) : null}
    </div>
  );
}
