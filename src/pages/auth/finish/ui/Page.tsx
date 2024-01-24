import { useUnit } from "effector-react";

import { LayoutAuthn } from "~/layouts/authn";

import {
  IconAlertCircle,
  IconArrowLeft,
  IconMail01,
} from "~/shared/assets/icons";
import { Button, FeaturedIcon, Spinner } from "~/shared/ui";

import {
  $pending,
  $successfully,
  tryAgainClicked,
} from "../model/finishedModel";

export const FinishedPage = () => {
  const [pending, successfully] = useUnit([$pending, $successfully]);

  return (
    <>
      <LayoutAuthn>
        {pending ? (
          <LoginValidating />
        ) : successfully ? (
          <LoginSuccess />
        ) : (
          <LoginError />
        )}
      </LayoutAuthn>
    </>
  );
};

const LoginValidating = () => {
  return (
    <>
      <div className="flex flex-col items-start gap-6 self-stretch">
        <Spinner className="my-1 h-10 w-10 text-blue-600" />
        <div className="flex flex-col items-start gap-2 self-stretch">
          <h1 className="text-2xl font-semibold text-gray-900">
            Signing You In
          </h1>
          <p className="text-base font-normal text-gray-600">
            Validating your credentials. This may take a few seconds...
          </p>
        </div>
      </div>
    </>
  );
};

const LoginSuccess = () => {
  return (
    <>
      <div className="flex flex-col items-start gap-6 self-stretch">
        <FeaturedIcon
          icon={<IconMail01 className="text-blue-600" />}
          color={"primary"}
          size={"xl"}
          theme={"light-circle-outline"}
        />

        <div className="flex flex-col items-start gap-2 self-stretch">
          <h1 className="text-2xl font-semibold text-gray-900">
            Sign In Successful
          </h1>
          <p className="text-base font-normal text-gray-600">
            Your credentials have been verified.
            <br />
            Welcome back!
            <br />
            <br />
            You'll be redirected shortly...
          </p>
        </div>
      </div>
    </>
  );
};

const LoginError = () => {
  const handleTryAgain = useUnit(tryAgainClicked);
  return (
    <>
      <div className="flex flex-col items-start gap-6 self-stretch">
        <FeaturedIcon
          icon={<IconAlertCircle className="text-red-600" />}
          color={"error"}
          size={"xl"}
          theme={"light-circle-outline"}
        />
        <div className="flex flex-col items-start gap-2 self-stretch">
          <h1 className="text-2xl font-semibold text-gray-900">
            Sign In Failed
          </h1>
          <p className="text-base font-normal text-gray-600">
            We encountered an issue validating your sign-in link. Please ensure
            the link hasn't expired or been used before.
          </p>
        </div>
      </div>
      <Button
        className="self-start"
        variant={"link-gray"}
        leadingIcon={<IconArrowLeft />}
        onClick={() => handleTryAgain()}
      >
        Try again
      </Button>
    </>
  );
};
