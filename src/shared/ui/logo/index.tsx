import { Logotype } from "~/shared/assets/images";

export const Logo = () => {
  return (
    <div className="flex h-8 items-start justify-center gap-2.5">
      <div className="relative flex flex-col items-start">
        <img
          src="/images/icon.svg"
          className="h-8 w-8"
          alt="Logo"
          title="Logo"
        />
        <div className="absolute bottom-0 left-0 right-0 h-4 backdrop-blur-xs"></div>
      </div>
      <div className="flex h-8 w-[100px] flex-shrink-0">
        <Logotype />
      </div>
    </div>
  );
};
