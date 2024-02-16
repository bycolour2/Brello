import { ReactNode } from "react";

import { Mail01 } from "~/shared/assets/icons";
import { Logo } from "~/shared/ui";

type LayoutAuthnProps = {
  children: ReactNode;
};

export const LayoutAuthn = ({ children }: LayoutAuthnProps) => {
  return (
    <main className="relative flex h-screen flex-col items-center gap-8 pb-12 lg:h-screen lg:w-screen lg:flex-row lg:justify-between lg:gap-0 lg:p-0">
      <div className="-order-1 h-16 w-full bg-[url('/src/layouts/authn/geometric-shapes-mobile.svg')] bg-center lg:order-1 lg:aspect-[4/5] lg:h-screen lg:w-auto lg:bg-[url('/src/layouts/authn/geometric-shapes-desktop.svg')] lg:bg-cover" />
      <div className="flex flex-col items-center justify-between gap-8 self-stretch px-4 pt-24 lg:min-w-[560px] lg:flex-grow lg:pt-0">
        <header className="hidden flex-col items-start gap-6 self-stretch lg:flex lg:h-24 lg:p-8">
          <Logo />
        </header>
        <section className="flex flex-col items-center gap-8 self-stretch lg:w-[360px] lg:self-auto lg:px-8">
          {children}
        </section>
        <footer className="hidden lg:flex lg:h-24 lg:items-end lg:justify-between lg:self-stretch lg:p-9">
          <p className="text-sm text-gray-600">© Brello 2023</p>
          <p className="flex items-center gap-2 text-sm text-gray-600">
            <Mail01 className="h-4 w-4 stroke-gray-600" />
            help@brello.io
          </p>
        </footer>
      </div>
    </main>
  );
};
