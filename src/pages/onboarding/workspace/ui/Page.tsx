import { ReactNode } from "react";
import { useUnit } from "effector-react";

import { FolderShield } from "~/shared/assets/icons";
import {
  BackgroundPatternDecorativeLg,
  BackgroundPatternDecorativeMd,
} from "~/shared/assets/images";
import { Button, FeaturedIcon, Input, Spinner, Textarea } from "~/shared/ui";

import {
  $description,
  $formError,
  $name,
  $slug,
  descriptionChanged,
  formSubmitted,
  nameChanged,
  OnboardingWorkspaceError,
  slugChanged,
} from "../model/onboardingWorkspaceModel";

export const PageLoader = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Spinner className="h-20 w-20 text-blue-600" />
    </div>
  );
};

const errorText: { [Key in OnboardingWorkspaceError]: ReactNode } = {
  NameInvalid: "Must be valid name.",
  SlugInvalid: "Must be valid slug.",
  SlugTaken: "This slug is already taken.",
  UnknownError: "Something wrong happened. Please, try again.",
};

export const OnboardingWorkspacePage = () => {
  const [
    name,
    handleName,
    slug,
    handleSlug,
    description,
    handleDescription,
    handleFormSubmit,
    formError,
  ] = useUnit([
    $name,
    nameChanged,
    $slug,
    slugChanged,
    $description,
    descriptionChanged,
    formSubmitted,
    $formError,
  ]);
  return (
    <main className="relative flex h-screen flex-col items-start overflow-hidden py-16 lg:flex-[1_0_0] lg:items-center lg:justify-center lg:gap-16 lg:self-stretch lg:py-24">
      <BackgroundPatternDecorativeMd className="absolute right-[-53px] top-[-164px] -z-10 block h-[480px] w-[480px] lg:static lg:hidden" />
      <BackgroundPatternDecorativeLg className="lg:shadow-[0_0_8px_8px_white_inset hidden lg:absolute lg:left-[336px] lg:top-[-196px] lg:-z-10 lg:block lg:h-[768px] lg:w-[768px]" />
      <section className="flex flex-col items-start gap-8 px-4 lg:w-[512px] lg:gap-8 lg:px-0">
        <header className="flex flex-[1_0_0] flex-col items-start gap-8 self-stretch lg:gap-12">
          <FeaturedIcon theme={"modern"} size={"xl"} icon={<FolderShield />} />
          <div className="flex flex-col items-start gap-4 self-stretch lg:gap-5">
            <h1 className="text-3xl font-semibold text-gray-900">
              Let's build a Workspace
            </h1>
            <p className="text-lg text-gray-600 lg:text-xl">
              Boost your productivity by making it easier for everyone to access
              boards in one location.
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
          <div className="flex flex-col items-start gap-6 self-stretch">
            <Input
              name="name"
              label="Workspace name"
              placeholder="Your Company Co."
              size={"md"}
              value={name}
              onValue={({ value }) => handleName(value)}
            />
            <Input
              name="slug"
              label="brello.io/workspaces/"
              placeholder="your-company-co"
              size={"md"}
              value={slug}
              onValue={({ value }) => handleSlug(value)}
            />
            <Textarea
              name="description"
              label="Description"
              placeholder="Our team organizes everything here."
              value={description}
              onValue={({ value }) => handleDescription(value)}
            />
          </div>
          {formError ? (
            <p className="self-stretch text-sm text-red-500">
              {formError ? errorText[formError] : null}
            </p>
          ) : null}
          <Button type="submit" size={"xl"} className="self-stretch">
            Get started
          </Button>
        </form>
      </section>
    </main>
  );
};
