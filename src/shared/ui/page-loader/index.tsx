import { Spinner } from "..";

export const PageLoader = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Spinner className="h-20 w-20 text-blue-600" />
    </div>
  );
};
