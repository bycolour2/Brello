import { IconArrowLeft } from "~/shared/assets/icons";
import { Button } from "~/shared/ui";

export const Error404Page = () => {
  return (
    <>
      <div className="fdsf flex h-screen flex-row items-center py-16 lg:justify-center lg:py-24">
        <div className="flex flex-col items-center gap-8 self-stretch px-4 lg:w-[1280px] lg:items-start lg:px-8">
          <div className="flex flex-[1_0_0] flex-col items-center gap-8 self-stretch lg:w-[720px] lg:items-start lg:justify-center lg:gap-12">
            <div className="flex flex-col items-start gap-4 self-stretch lg:gap-6">
              <div className="flex flex-col items-start gap-3 self-stretch">
                <h2 className="self-stretch font-semibold text-blue-700">
                  404 error
                </h2>
                <h1 className="self-stretch text-4xl font-semibold tracking-[-0.045rem] text-gray-900 lg:text-6xl">
                  We can’t find that page
                </h1>
              </div>
              <p className="self-stretch text-lg text-gray-600 lg:text-xl">
                Sorry, the page you are looking for doesn't exist or has been
                moved.
              </p>
            </div>
            <div className="flex flex-col items-start gap-3 self-stretch lg:flex-row">
              <Button
                size={"xl"}
                className="self-stretch lg:order-2 lg:self-auto"
              >
                Take me home
              </Button>
              <Button
                size={"xl"}
                variant={"secondary-gray"}
                leadingIcon={<IconArrowLeft />}
                className="self-stretch lg:self-auto"
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
