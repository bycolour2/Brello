import { IconArrowLeft } from "~/shared/assets/icons";
import { Button } from "~/shared/ui";

export const Error404Page = () => {
  return (
    <>
      <div className="flex flex-col items-center py-16">
        <div className="px-4 flex flex-col items-center gap-8 self-stretch">
          <div className="flex flex-col items-center gap-8 self-stretch">
            <div className="flex flex-col gap-4 items-start self-stretch">
              <div className="flex flex-col gap-3 items-start self-stretch">
                <h2 className="text-blue-700 font-semibold self-stretch">
                  404 error
                </h2>
                <h1 className="font-semibold self-stretch text-gray-900 text-4xl tracking-[-0.045rem]">
                  We can’t find that page
                </h1>
              </div>
              <p className="text-lg text-gray-600 self-stretch">
                Sorry, the page you are looking for doesn't exist or has been
                moved.
              </p>
            </div>
            <div className="flex flex-col gap-3 items-start self-stretch">
              <Button size={"xl"} className="self-stretch">
                Take me home
              </Button>
              <Button
                size={"xl"}
                variant={"secondary-gray"}
                leadingIcon={<IconArrowLeft />}
                className="self-stretch"
              >
                Go back
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
