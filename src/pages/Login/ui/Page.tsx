import {
  Button,
  GeometricShapesDesktop,
  GeometricShapesMobile,
  GoogleSocialIcon,
  Input,
  Logotype,
  MailIcon,
} from "~/shared/ui";

export const Page = () => {
  return (
    <section className="flex h-screen flex-col items-center gap-8 px-4 pb-12 lg:h-screen lg:w-screen lg:flex-row lg:gap-0 lg:p-0">
      <div className="flex h-16 flex-shrink-0 items-center justify-start self-stretch lg:hidden">
        <div className="absolute inset-x-0 top-0 h-16 w-full">
          <GeometricShapesMobile />
        </div>
      </div>
      <div className="hidden self-stretch lg:order-2 lg:flex lg:items-start">
        <GeometricShapesDesktop />
      </div>
      <div className="lg lg: flex flex-col items-center justify-between gap-8 self-stretch lg:flex-[1_0_0]">
        <div className="flex flex-col items-start gap-6 self-stretch lg:h-24 lg:p-8">
          <div className="flex items-start">
            <div className="flex h-8 items-start justify-center gap-2.5">
              <img
                src="/images/icon.svg"
                className="h-8 w-8"
                alt="Logo"
                title="Logo"
              />
              <div className="hidden lg:flex lg:h-8 lg:w-[100px] lg:flex-shrink-0">
                <Logotype />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start gap-2 self-stretch lg:hidden">
            <h1 className="text-2xl font-semibold text-gray-900">Sign in</h1>
            <p className="text-base font-normal text-gray-600">
              Start your 30-day free trial.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-6 self-stretch lg:px-8">
          <div className="flex flex-col items-center gap-8 self-stretch lg:w-[360px] lg:self-auto">
            <div className="hidden flex-col items-start gap-2 self-stretch lg:flex">
              <h1 className="text-2xl font-semibold text-gray-900">Sign in</h1>
              <p className="text-base font-normal text-gray-600">
                Start your 30-day free trial.
              </p>
            </div>
            <div className="flex flex-col items-center gap-6 self-stretch rounded-xl">
              <form className="flex flex-col items-start gap-5 self-stretch">
                <Input
                  type="email"
                  label="Email"
                  placeholder="Enter your email"
                />
              </form>
              <div className="flex flex-col items-start gap-4 self-stretch">
                <Button type="submit" size={"lg"} className="self-stretch">
                  Get started
                </Button>
                <div className="flex flex-col items-center justify-center gap-3 self-stretch">
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
              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:flex lg:h-24 lg:items-end lg:justify-between lg:self-stretch lg:p-9">
          <p className="text-sm text-gray-600">© Brello 2023</p>
          <div className="flex items-center gap-2 text-gray-600">
            <MailIcon />
            <p className="text-sm">help@brello.io</p>
          </div>
        </div>
      </div>
    </section>
  );
};
