import { useUnit } from "effector-react";

import {
  $email,
  emailChanged,
  formSubmited,
} from "~/pages/Login/model/loginModel";
import { IconMail01 } from "~/shared/assets/icons";
import { Button, Input, Logo } from "~/shared/ui";

export const Page = () => {
  const [email, handleEmail, handleFormSubmit] = useUnit([
    $email,
    emailChanged,
    formSubmited,
  ]);

  return (
    <main className="relative flex h-screen flex-col items-center gap-8 pb-12 lg:h-screen lg:w-screen lg:flex-row lg:justify-between lg:gap-0 lg:p-0">
      <div className="-order-1 h-16 w-full bg-[url('/src/pages/Login/ui/geometric-shapes-mobile.svg')] bg-center bg-no-repeat lg:order-1 lg:aspect-[4/5] lg:h-full lg:w-full lg:max-w-[768px] lg:bg-[url('/src/pages/Login/ui/geometric-shapes-desktop.svg')]" />
      <div className="flex flex-col items-center justify-between gap-8 self-stretch px-4 pt-24 lg:min-w-[560px] lg:flex-grow lg:pt-0">
        <header className="hidden flex-col items-start gap-6 self-stretch lg:flex lg:h-24 lg:p-8">
          <Logo />
        </header>
        <section className="flex flex-col items-center gap-8 self-stretch lg:w-[360px] lg:self-auto lg:px-8">
          <div className="flex flex-col items-start gap-6 self-stretch">
            <img
              src="/images/icon.svg"
              className="h-8 w-8 lg:hidden"
              alt="Logo"
              title="Logo"
            />
            <div className="flex flex-col items-start gap-2 self-stretch">
              <h1 className="text-2xl font-semibold text-gray-900">Sign in</h1>
              <p className="text-base font-normal text-gray-600">
                Start your 30-day free trial.
              </p>
            </div>
          </div>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleFormSubmit();
            }}
            className="flex flex-col items-start gap-6 self-stretch"
          >
            <Input
              name="Email"
              type="email"
              label="Email"
              placeholder="Enter your email"
              value={email}
              onValue={({ value }) => handleEmail(value)}
            />
            <div className="flex flex-col items-center justify-center gap-4 self-stretch">
              <Button type="submit" size={"lg"} className="self-stretch">
                Get started
              </Button>
              {/* <Button
                type="button"
                variant={"secondary-gray"}
                size={"lg"}
                leadingIcon={<GoogleSocialIcon />}
                className="self-stretch"
              >
                Sign up with Google
              </Button> */}
            </div>
          </form>
        </section>
        <footer className="hidden lg:flex lg:h-24 lg:items-end lg:justify-between lg:self-stretch lg:p-9">
          <p className="text-sm text-gray-600">© Brello 2023</p>
          <p className="flex items-center gap-2 text-sm text-gray-600">
            <IconMail01 className="h-4 w-4 stroke-gray-600" />
            help@brello.io
          </p>
        </footer>
      </div>
    </main>
  );
};
