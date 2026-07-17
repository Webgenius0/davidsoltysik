import { Link, useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, type ReactNode } from "react";
import toast from "react-hot-toast";
import axios from "axios";

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
import { useAuthContext } from "@/hooks/useAppContext";

const imgVuesaxLinearSms =
  "https://www.figma.com/api/mcp/asset/99b4e4db-5bc4-41de-8f1b-ec374d46895d";
const imgVuesaxLinearLock =
  "https://www.figma.com/api/mcp/asset/8b31db40-d8cf-43c0-89f1-50f8275c9db4";
const imgIconIcEyeOff =
  "https://www.figma.com/api/mcp/asset/b7afbd8e-98a7-4667-bbb0-cc1618974b0f";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const LoginPage = () => {
  const { login } = useAuthContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}account/login/`,
        {
          email: values.email,
          password: values.password,
        },
      );
      const { access, refresh } = response.data.data.data.tokens;
      const user = response.data.data.data.user;

      login(access, refresh, user);

      navigate("/business-dashboard");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "An error occurred. Please try again.",
      );
      console.error("Login error:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-150 space-y-10">
      <header className="w-full text-center">
        <div className="space-y-3">
          <h1 className=" text-[32px] font-semibold leading-12 tracking-normal text-[#212B36]">
            Login
          </h1>
          <p className=" text-[16px] font-normal leading-6 text-[#637381]">
            Welcome Back! Access Your Account Securely.
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
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className=" text-[16px] font-normal leading-6 text-[#637381]">
                  Email address
                </FormLabel>
                <FormControl>
                  <FieldShell
                    icon={
                      <img src={imgVuesaxLinearSms} alt="" className="size-6" />
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

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className=" text-[16px] font-normal leading-6 text-[#637381]">
                  Password
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
                        <img src={imgIconIcEyeOff} alt="" className="size-6" />
                      </button>
                    }
                    className="pr-4"
                  >
                    <input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      placeholder="***********"
                      className={inputClassName}
                    />
                  </FieldShell>
                </FormControl>
                <FormMessage className=" text-xs text-destructive" />
              </FormItem>
            )}
          />

          <div className="flex justify-end pt-2">
            <Link
              to="/forgot-password"
              className="font-semibold text-[14px] text-[#4371EB] hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              className="h-13 w-full rounded-lg bg-[#4371EB] font-[Inter] text-[16px] font-semibold leading-6 text-white shadow-none hover:bg-[#3c67db]"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </div>
        </form>
      </Form>

      <p className="text-center  text-[16px] font-normal leading-6 text-[#637381]">
        Don't have an account yet?{" "}
        <Link
          to="/register"
          className="font-semibold text-[#4371EB] hover:underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;

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
