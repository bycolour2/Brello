import { ReactNode } from "react";
import { useUnit } from "effector-react";

import { LayoutAuthn } from "~/layouts/authn";

import { AlertCircle, ArrowLeft, Mail01 } from "~/shared/assets/icons";
import { Button, FeaturedIcon, Input, Spinner } from "~/shared/ui";

import {
  $email,
  $emailError,
  $formError,
  $formPending,
  $formSend,
  backToLoginPressed,
  emailChanged,
  formSubmited,
  SignInError,
} from "../model/loginModel";

export const PageLoader = () => {
  return (
    <LayoutAuthn>
      <Spinner className="h-20 w-20 text-blue-600" />
    </LayoutAuthn>
  );
};

export const SignInPage = () => {
  const [sended] = useUnit([$formSend]);

  return <LayoutAuthn>{!sended ? <LoginForm /> : <LoginResult />}</LayoutAuthn>;
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
          size={"sm"}
          onValue={(value) => handleEmail(value)}
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
              <AlertCircle className="text-red-600" />
            ) : (
              <Mail01 className="text-blue-600" />
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
        leadingIcon={<ArrowLeft />}
        onClick={() => handleBackToLogin()}
      >
        {authError ? "Try again" : "Back to log in"}
      </Button>
    </>
  );
};
