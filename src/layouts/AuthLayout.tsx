import Logo from "@/components/shared/Logo";
import { cn } from "@/lib/utils";
import { Outlet, ScrollRestoration } from "react-router";
import Banner from "@/assets/images/auth-banner.jpg";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <ScrollRestoration />
      <div className="left flex-1 hidden lg:block shrink lg:max-w-[1051px] min-w-0">
        <div className="p-1.5 sm:p-2 lg:p-2.5 h-screen sticky top-0">
          <figure className="rounded-2xl lg:rounded-3xl overflow-hidden h-full relative">
            <img
              src={Banner}
              alt=""
              className="w-full h-full object-cover object-center"
            />
            <Logo className="absolute top-4 left-4 sm:top-6 sm:left-6 lg:top-8 lg:left-8 xl:top-10 xl:left-10" />
          </figure>
        </div>
      </div>
      <div className="right flex-1 flex flex-col justify-center overflow-y-auto shrink w-full min-w-0 px-4 lg:px-0">
        <div className={cn("max-w-[605px] w-full mx-auto ")}>
          {/* Mobile Logo - Only shown on screens smaller than lg */}
          <div className="lg:hidden mb-6 sm:mb-8 mt-8">
            <Logo />
          </div>
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
