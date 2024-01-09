import { Input } from "~/shared/ui";
import { GoogleSocialIcon } from "~/shared/ui";

export const Page = () => {
  return (
    <section className="flex h-screen flex-col items-center gap-8 px-4 pb-12">
      <div className="flex h-16 flex-shrink-0 items-center justify-start self-stretch">
        <img
          src="/images/geometric-shapes-mobile.svg"
          className="absolute inset-x-0 top-0 h-16 w-full object-cover"
          alt="brello-shapes"
          title="Brello shapes"
        />
      </div>
      <div className="flex flex-col items-center gap-8 self-stretch">
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
        <div className="flex flex-col items-center gap-6 self-stretch">
          <form className="flex flex-col items-start gap-5 self-stretch">
            <Input type="email" label="Email" placeholder="Enter your email" />
          </form>
          <div className="flex flex-col items-start gap-4 self-stretch">
            <button className="flex items-center justify-center gap-2 self-stretch rounded-lg border border-blue-600 bg-blue-600 px-[18px] py-2.5 font-semibold text-white shadow-sm shadow-[rgba(16,24,40,0.05)]">
              Get started
            </button>
            <div className="flex flex-col items-center justify-center gap-3 self-stretch">
              <button className="flex items-center justify-center gap-3 self-stretch rounded-lg border border-gray-300 px-4 py-2.5 font-semibold text-gray-700 shadow-sm shadow-[rgba(16,24,40,0.05)]">
                <GoogleSocialIcon />
                Sign up with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
