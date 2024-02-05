import { ReactNode } from "react";
import { Link } from "atomic-router-react";
import { useUnit } from "effector-react";

import { Checkmark, User01 } from "~/shared/assets/icons";
import {
  GridBackgroundPatternLg,
  GridBackgroundPatternMd,
} from "~/shared/assets/images";
import { routes } from "~/shared/routing";
import { Button, FeaturedIcon, Input, Spinner } from "~/shared/ui";

import {
  $error,
  $firstName,
  $lastName,
  $onboardUserFinish,
  $pending,
  firstNameChanged,
  formSubmitted,
  lastNameChanged,
  OnboardingUserError,
  skipButtonClicked,
} from "../model/onboardingUserModel";

export const PageLoader = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Spinner className="h-20 w-20 text-blue-600" />
    </div>
  );
};

const errorText: { [Key in OnboardingUserError]: ReactNode } = {
  InvalidFirstName: "Must be valid first name.",
  UnknownError: "Something wrong happened. Please, try again.",
};

export const OnboardingUserPage = () => {
  const [
    firstName,
    handleFirstNameChange,
    lastName,
    handleLastNameChange,
    handleFormSubmit,
    formSendSuccess,
    pending,
    error,
    handleSkipClick,
  ] = useUnit([
    $firstName,
    firstNameChanged,
    $lastName,
    lastNameChanged,
    formSubmitted,
    $onboardUserFinish,
    $pending,
    $error,
    skipButtonClicked,
  ]);

  return (
    <main className="relative flex h-screen flex-col items-start overflow-hidden py-16 lg:flex-[1_0_0] lg:items-center lg:justify-center lg:gap-16 lg:self-stretch lg:py-24">
      <GridBackgroundPatternMd className="absolute right-[-53px] top-[-164px] -z-10 block lg:hidden" />
      <GridBackgroundPatternLg className="hidden lg:absolute lg:left-[336px] lg:top-[-196px] lg:-z-10 lg:block lg:h-[768px] lg:w-[768px] lg:shadow-[0_0_8px_8px_white_inset]" />
      <section className="flex flex-col items-start gap-12 px-4 lg:w-[512px] lg:gap-12 lg:px-0">
        {formSendSuccess ? (
          <div className="flex flex-[1_0_0] flex-col items-start gap-8 self-stretch lg:gap-8">
            <FeaturedIcon
              theme={"light-circle-outline"}
              size={"xl"}
              color={"success"}
              icon={<Checkmark className="text-green-600" />}
            />
            <div className="flex flex-col items-start gap-4 self-stretch lg:gap-5">
              <h1 className="text-2xl font-semibold text-gray-900">
                Profile created
              </h1>
              <p className="text-base font-normal text-gray-600">
                You'll be redirected shortly...
              </p>
            </div>
          </div>
        ) : (
          <>
            <header className="flex flex-[1_0_0] flex-col items-start gap-8 self-stretch lg:gap-12">
              <FeaturedIcon theme={"modern"} size={"xl"} icon={<User01 />} />
              <div className="flex flex-col items-start gap-4 self-stretch lg:gap-5">
                <h1 className="text-4xl font-semibold text-gray-900">
                  Please, introduce yourself
                </h1>
                <p className="text-lg text-gray-600 lg:text-xl">
                  You can do this later on Profile page.{" "}
                  <br className="lg:hidden" />
                  <Link to={routes.home}>
                    <Button
                      type="button"
                      variant={"link-color"}
                      onClick={() => handleSkipClick()}
                      className="text-lg font-medium text-blue-600 lg:text-xl"
                    >
                      Skip
                    </Button>
                  </Link>
                </p>
              </div>
            </header>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                handleFormSubmit();
              }}
              className="flex flex-col items-start gap-8 self-stretch"
            >
              <div className="flex flex-col flex-wrap items-start gap-x-2 gap-y-2 self-stretch lg:flex-row lg:gap-x-8">
                <Input
                  name="firstName"
                  label="First name"
                  placeholder="First name"
                  value={firstName}
                  size={"sm"}
                  onValue={(value) => handleFirstNameChange(value)}
                  // error={firstNameError ? errorText[firstNameError] : null}
                  disabled={pending}
                  className="lg:flex-[1_0_0] lg:self-start"
                />
                <Input
                  name="lastName"
                  label="Last name"
                  placeholder="Last name"
                  value={lastName}
                  size="sm"
                  onValue={(value) => handleLastNameChange(value)}
                  disabled={pending}
                  className="lg:flex-[1_0_0] lg:self-start"
                />
                {error ? (
                  <p className="self-stretch text-sm text-red-500">
                    {error ? errorText[error] : null}
                  </p>
                ) : null}
              </div>
              <Button
                type="submit"
                className="self-stretch"
                size={"xl"}
                disabled={pending}
                leadingIcon={pending ? <Spinner /> : null}
              >
                Continue
              </Button>
            </form>
          </>
        )}
      </section>
    </main>
  );
};
