import { Logotype } from "~/shared/ui";

export const Logo = () => {
  return (
    <div className="flex h-8 items-start justify-center gap-2.5">
      <img src="/images/icon.svg" className="h-8 w-8" alt="Logo" title="Logo" />
      <div className="flex h-8 w-[100px] flex-shrink-0">
        <Logotype />
      </div>
    </div>
  );
};
