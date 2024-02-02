import { Button, Input, Navigation, Textarea } from "~/shared/ui";

export const WorkspaceSettingsPage = () => {
  return (
    <main className="flex flex-col">
      <Navigation />
      <section className="flex flex-col items-start justify-start gap-8 pb-16 pt-8">
        <header className="flex flex-col items-start justify-start self-stretch px-4">
          <h3 className="text-2xl font-semibold text-gray-900">
            Workspace settings
          </h3>
        </header>
        <div className="flex flex-col items-start justify-start gap-8 self-stretch px-4">
          <form className="flex flex-col items-start justify-start gap-5 self-stretch">
            <div className="flex flex-col items-start justify-start gap-5 self-stretch">
              <label
                htmlFor="1"
                className="flex flex-col items-start justify-start self-stretch text-sm font-medium text-gray-700"
              >
                Logo
                <span className="text-sm font-normal text-gray-600">
                  Update your logo.
                </span>
              </label>
              <div className="flex flex-col items-start justify-start gap-4 self-stretch"></div>
            </div>
            <div className="h-px w-full self-stretch bg-gray-200" />
            <div className="flex flex-col items-start justify-start gap-5 self-stretch">
              <label
                htmlFor="1"
                className="flex flex-col items-start justify-start self-stretch text-sm font-medium text-gray-700"
              >
                Name
                <span className="text-sm font-normal text-gray-600">
                  This will be displayed on your profile.
                </span>
              </label>
              <div className="flex flex-col items-start justify-start gap-4 self-stretch">
                <Input
                  name="name"
                  placeholder="Name"
                  value=""
                  onValue={() => {}}
                />
                <Input
                  name="slug"
                  placeholder="Slug"
                  value=""
                  onValue={() => {}}
                />
              </div>
            </div>
            <div className="h-px w-full self-stretch bg-gray-200" />
            <div className="flex flex-col items-start justify-start gap-5 self-stretch">
              <label
                htmlFor="description"
                className="flex flex-col items-start justify-start self-stretch text-sm font-medium text-gray-700"
              >
                Description
                <span className="text-sm font-normal text-gray-600">
                  A quick snapshot of your workspace.
                </span>
              </label>
              <Textarea
                id="description"
                name="description"
                placeholder="Description"
                value=""
                onValue={() => {}}
              />
            </div>
          </form>
          <footer className="flex-start flex flex-col items-center gap-4 self-stretch">
            <div className="h-px w-full self-stretch bg-gray-200" />
            <div className="flex flex-row items-center justify-end self-stretch">
              <div className="flex flex-row items-center justify-end gap-3">
                <Button variant={"secondary-gray"}>Cancel</Button>
                <Button>Save</Button>
              </div>
            </div>
          </footer>
        </div>
      </section>
    </main>
  );
};
