import { useUnit } from "effector-react";

import {
  $email,
  $emailError,
  $formSended,
  $formPending,
  backToLoginPressed,
  emailChanged,
  formSubmited,
  $formError,
  SignInError,
} from "../model/loginModel";
import {
  IconAlertCircle,
  IconArrowLeft,
  IconMail01,
} from "~/shared/assets/icons";
import { Button, FeaturedIcon, Input, Logo, Spinner } from "~/shared/ui";
import { ReactNode } from "react";

export const Page = () => {
  const [sended, authError] = useUnit([$formSended, $formError]);
  console.log(authError);

  return (
    <main className="relative flex h-screen flex-col items-center gap-8 pb-12 lg:h-screen lg:w-screen lg:flex-row lg:justify-between lg:gap-0 lg:p-0">
      <div className="-order-1 h-16 w-full bg-[url('/src/pages/auth/Login/ui/geometric-shapes-mobile.svg')] bg-center bg-no-repeat lg:order-1 lg:aspect-[4/5] lg:h-full lg:w-full lg:max-w-[768px] lg:bg-[url('/src/pages/auth/Login/ui/geometric-shapes-desktop.svg')]" />
      <div className="flex flex-col items-center justify-between gap-8 self-stretch px-4 pt-24 lg:min-w-[560px] lg:flex-grow lg:pt-0">
        <header className="hidden flex-col items-start gap-6 self-stretch lg:flex lg:h-24 lg:p-8">
          <Logo />
        </header>
        <section className="flex flex-col items-center gap-8 self-stretch lg:min-w-[360px] lg:self-auto lg:px-8">
          {!sended ? <LoginForm /> : <LoginResult />}
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

//NOTE - good practice
const errorText: { [Key in SignInError]: ReactNode } = {
  InvalidEmail: "Must be valid email.",
  UnknownError: "Something wrong happened. Please, try again.",
  RateLimit: "Too much requests. Try again later.",
};

const LoginForm = () => {
  const [email, emailError, handleEmail, handleFormSubmit, formPending] =
    useUnit([$email, $emailError, emailChanged, formSubmited, $formPending]);

  return (
    <>
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
        noValidate
        className="flex flex-col items-start gap-6 self-stretch"
      >
        <Input
          name="Email"
          type="email"
          label="Email"
          placeholder="Enter your email"
          value={email}
          onValue={({ value }) => handleEmail(value)}
          error={emailError ? errorText[emailError] : null}
          disabled={formPending}
        />
        <div className="flex flex-col items-center gap-4 self-stretch">
          <Button
            type="submit"
            size={"lg"}
            className="self-stretch"
            disabled={formPending}
            trailingIcon={formPending ? <Spinner /> : null}
          >
            Get started
          </Button>
          {/* <Button
            type="button"
            variant={"secondary-gray"}
            size={"lg"}
            leadingIcon={<GoogleSocialIcon />}
            className="self-stretch"
            disabled={formPending}
          >
            Sign up with Google
          </Button> */}
        </div>
      </form>
    </>
  );
};

const LoginResult = () => {
  const [email, authError, handleBackToLogin] = useUnit([
    $email,
    $formError,
    backToLoginPressed,
  ]);

  return (
    <>
      <div className="flex flex-col items-start gap-6 self-stretch">
        <FeaturedIcon
          icon={
            authError ? (
              <IconAlertCircle className="text-red-600" />
            ) : (
              <IconMail01 className="text-blue-600" />
            )
          }
          color={authError ? "error" : "primary"}
          size={"xl"}
          theme={"light-circle-outline"}
        />

        <div className="flex flex-col items-start gap-2 self-stretch">
          <h1 className="text-2xl font-semibold text-gray-900">
            {authError ? "Error" : "Check your email"}
          </h1>
          <p className="text-base font-normal text-gray-600">
            {authError
              ? errorText[authError]
              : `We sent a login link to ${email}`}
          </p>
        </div>
      </div>
      <Button
        className="self-start"
        variant={"link-gray"}
        leadingIcon={<IconArrowLeft />}
        onClick={handleBackToLogin}
      >
        {authError ? "Try again" : "Back to log in"}
      </Button>
    </>
  );
};
