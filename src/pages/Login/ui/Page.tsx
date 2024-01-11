import { Button, GoogleSocialIcon, Input, MailIcon, Logo } from "~/shared/ui";

export const Page = () => {
  return (
    <main className="relative flex h-screen flex-col items-center gap-8 px-4 pb-12 lg:h-screen lg:w-screen lg:flex-row lg:gap-0 lg:p-0">
      <div className="absolute inset-x-0 top-0 h-16 bg-[url('/images/geometric-shapes-mobile.svg')] lg:static lg:order-2 lg:block lg:aspect-[4/5] lg:h-screen lg:bg-[url('/images/geometric-shapes-desktop.svg')] lg:bg-cover" />
      <div className="flex flex-col items-center justify-between gap-8 self-stretch pt-24 lg:flex-[1_0_0] lg:pt-0">
        <header className="hidden flex-col items-start gap-6 self-stretch lg:flex lg:h-24 lg:p-8">
          <Logo />
        </header>
        <section className="flex flex-col items-center gap-8 self-stretch lg:w-[360px] lg:self-auto lg:px-8">
          <div className="flex flex-col items-start gap-6 self-stretch">
            <img
              src="/images/icon.svg"
              className="h-8 w-8"
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
          <form className="flex flex-col items-start gap-6 self-stretch">
            <Input type="email" label="Email" placeholder="Enter your email" />
            <div className="flex flex-col items-center justify-center gap-4 self-stretch">
              <Button type="submit" size={"lg"} className="self-stretch">
                Get started
              </Button>
              <Button
                type="button"
                variant={"secondary-gray"}
                size={"lg"}
                leadingIcon={<GoogleSocialIcon />}
                className="self-stretch"
              >
                Sign up with Google
              </Button>
            </div>
          </form>
        </section>
        <footer className="hidden lg:flex lg:h-24 lg:items-end lg:justify-between lg:self-stretch lg:p-9">
          <p className="text-sm text-gray-600">© Brello 2023</p>
          <div className="flex items-center gap-2 text-gray-600">
            <MailIcon />
            <p className="text-sm">help@brello.io</p>
          </div>
        </footer>
      </div>
    </main>
  );
};
