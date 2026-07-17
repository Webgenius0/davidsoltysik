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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

const imgVuesaxLinearLock =
  "https://www.figma.com/api/mcp/asset/8b31db40-d8cf-43c0-89f1-50f8275c9db4";
const imgIconIcEyeOff =
  "https://www.figma.com/api/mcp/asset/b7afbd8e-98a7-4667-bbb0-cc1618974b0f";

const formSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

const ResetPasswordPage = () => {
  const [isSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async function onSubmit(_values: z.infer<typeof formSchema>) {
    navigate("/login");

    // setIsSubmitting(true);
    // try {
    //   const response = await axios.post(
    //     `${import.meta.env.VITE_BASE_URL}account/set-new-password/`,
    //     {
    //       email: email,
    //       new_password: values.password,
    //       confirm_password: values.confirmPassword,
    //     },
    //   );
    //   toast.success(response?.data?.message || "Password reset successfully.");
    //   sessionStorage.removeItem("resetPasswordEmail");
    //   navigate("/login");
    // } catch (error: any) {
    //   console.error("Error during form submission:", error);
    //   toast.error(
    //     error.response?.data?.message ||
    //       "An unexpected error occurred. Please try again.",
    //   );
    // } finally {
    //   setIsSubmitting(false);
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
              Enter your new password.
            </h1>
            <p className=" text-[16px] font-normal leading-6 text-[#637381]">
              Secure Your Account with a New Password.
            </p>
          </div>
        </header>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-4"
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className=" text-[14px] font-normal leading-6 text-[#637381]">
                    Enter password
                  </FormLabel>
                  <FormControl>
                    <FieldShell
                      icon={
                        <img
                          src={imgVuesaxLinearLock}
                          alt=""
                          className="size-6"
                        />
                      }
                      rightIcon={
                        <button
                          type="button"
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                          onClick={() => setShowPassword((current) => !current)}
                          className="flex size-6 items-center justify-center text-[#919EAB] transition-opacity hover:opacity-80"
                        >
                          <img
                            src={imgIconIcEyeOff}
                            alt=""
                            className="size-6"
                          />
                        </button>
                      }
                    >
                      <input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="*************"
                        className={inputClassName}
                      />
                    </FieldShell>
                  </FormControl>
                  <FormMessage className=" text-xs text-destructive" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className=" text-[14px] font-normal leading-6 text-[#637381]">
                    Confirm password
                  </FormLabel>
                  <FormControl>
                    <FieldShell
                      icon={
                        <img
                          src={imgVuesaxLinearLock}
                          alt=""
                          className="size-6"
                        />
                      }
                      rightIcon={
                        <button
                          type="button"
                          aria-label={
                            showConfirmPassword
                              ? "Hide password"
                              : "Show password"
                          }
                          onClick={() =>
                            setShowConfirmPassword((current) => !current)
                          }
                          className="flex size-6 items-center justify-center text-[#919EAB] transition-opacity hover:opacity-80"
                        >
                          <img
                            src={imgIconIcEyeOff}
                            alt=""
                            className="size-6"
                          />
                        </button>
                      }
                    >
                      <input
                        {...field}
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="*************"
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
                disabled={isSubmitting}
              >
                {isSubmitting ? "Updating..." : "Update Password"}
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

export default ResetPasswordPage;

const inputClassName =
  "w-full border-0 bg-transparent p-0 text-[16px] font-semibold leading-6 text-[#212B36] placeholder:text-[#212B36] placeholder:opacity-100 focus:outline-none";

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
