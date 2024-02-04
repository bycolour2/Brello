import { FormEvent } from "react";
import { reflect } from "@effector/reflect";
import { useUnit } from "effector-react";

import { Button, Input, Navigation, Textarea } from "~/shared/ui";
import { ImageUpload } from "~/shared/ui/upload-input";

import {
  $avatarUrl,
  $description,
  $error,
  $name,
  $pending,
  $slug,
  avatarFileSelected,
  descriptionChanged,
  formSubmitted,
  nameChanged,
  slugBlured,
  slugChanged,
  WorkspaceSettingsError,
} from "../model/workspaceSettingsModel";

export const WorkspaceSettingsPage = () => {
  const [pending, handleFormSubmit] = useUnit([$pending, formSubmitted]);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleFormSubmit();
  };

  return (
    <main className="flex h-screen flex-col">
      <Navigation />
      <section
        id="scrollContainer"
        className="flex flex-grow flex-col items-start justify-start gap-8 pb-12 pt-6 lg:pb-24 lg:pt-12"
      >
        <header className="flex flex-col items-start justify-start self-stretch px-4 lg:mx-auto lg:w-[1280px] lg:gap-5 lg:px-8">
          <h3 className="text-2xl font-semibold text-gray-900 lg:text-3xl">
            Workspace settings
          </h3>
          <div className="hidden h-px w-full self-stretch bg-gray-200 lg:block" />
        </header>
        <div className="flex flex-col items-start justify-start gap-6 self-stretch px-4 lg:mx-auto lg:w-[1280px] lg:px-8">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-start justify-start gap-5 self-stretch"
          >
            <LogoUpload />
            <div className="h-px w-full self-stretch bg-gray-200" />
            <div className="flex flex-col items-start justify-start gap-5 self-stretch lg:flex-row">
              <label
                htmlFor="name"
                className="flex flex-col items-start justify-start self-stretch text-sm font-medium text-gray-700 lg:w-[280px]"
              >
                Name
                <span className="text-sm font-normal text-gray-600">
                  This will be displayed on your profile.
                </span>
              </label>
              <div className="flex w-full flex-col items-start justify-start gap-4 self-stretch lg:w-[512px]">
                <Name />
                <Slug />
              </div>
            </div>
            <div className="h-px w-full self-stretch bg-gray-200" />
            <div className="flex flex-col items-start justify-start gap-5 self-stretch lg:flex-row">
              <label
                htmlFor="description"
                className="flex flex-col items-start justify-start self-stretch text-sm font-medium text-gray-700 lg:w-[280px]"
              >
                Description
                <span className="text-sm font-normal text-gray-600">
                  A quick snapshot of your workspace.
                </span>
              </label>
              <div className="flex flex-col items-start justify-start gap-4 self-stretch lg:w-[512px]">
                <Description />
              </div>
            </div>
            <footer className="flex-start flex flex-col items-center gap-4 self-stretch">
              <Error />
              <div className="h-px w-full self-stretch bg-gray-200" />
              <div className="flex flex-row items-center justify-end self-stretch">
                <div className="flex flex-row items-center justify-end gap-3">
                  <Button variant={"secondary-gray"} disabled={pending}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={pending}>
                    Save
                  </Button>
                </div>
              </div>
            </footer>
          </form>
        </div>
      </section>
    </main>
  );
};

function LogoUpload() {
  const [imageSrc, onSelectFile] = useUnit([$avatarUrl, avatarFileSelected]);
  const handleSelectFile = ({ file }: { file: File }) => {
    onSelectFile(file);
  };

  return (
    <div className="flex flex-col items-start justify-start gap-5 self-stretch lg:flex-row">
      <label
        htmlFor="img-upload"
        className="flex flex-col items-start justify-start self-stretch text-sm font-medium text-gray-700 lg:w-[280px]"
      >
        Logo
        <span className="text-sm font-normal text-gray-600">
          Update your logo.
        </span>
      </label>
      <div className="flex flex-col items-start justify-start gap-4 self-stretch">
        <ImageUpload.Root>
          <ImageUpload.Preview src={imageSrc} />
          <ImageUpload.Upload label="logo" onSelectFile={handleSelectFile} />
        </ImageUpload.Root>
      </div>
    </div>
  );
}

const Name = reflect({
  view: Input,
  bind: {
    id: "name",
    name: "name",
    placeholder: "Name",
    value: $name,
    onValue: nameChanged,
    disabled: $pending,
  },
});

const Slug = reflect({
  view: Input,
  bind: {
    name: "slug",
    placeholder: "Slug",
    leadingText: "brello.io/workspaces/",
    value: $slug,
    onValue: slugChanged,
    onBlur: slugBlured.prepend(() => {}),
    disabled: $pending,
  },
});

const Description = reflect({
  view: Textarea,
  bind: {
    id: "description",
    name: "description",
    placeholder: "Description",
    value: $description,
    onValue: descriptionChanged,
    disabled: $pending,
  },
});

const errorText: { [Key in WorkspaceSettingsError]: string } = {
  NotFound: "Workspace not found or you don't have access to",
  InvalidFile: "You're uploaded an incorrect file, please upload another one",
  UnknownError: "Something goes wrong. Please, try again later",
  EmptyName:
    "Please, fill the organization name. It must be longer than 2 symbol",
  SlugTaken: "This URL is already taken, please choose another one",
};

const Error = () => {
  const error = useUnit($error);

  return error ? (
    <p className="text-sm text-red-600 lg:text-base">{errorText[error]}</p>
  ) : null;
};
