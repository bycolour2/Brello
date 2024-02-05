import { ReactNode } from "react";

import { Navigation } from "~/shared/ui";

export const LayoutBase = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <header className="inline-flex w-full flex-col items-start self-stretch">
        <Navigation />
      </header>
      <main className="flex flex-col overflow-scroll">{children}</main>
    </>
  );
};
