import { ReactNode } from "react";

type LayoutBoards = {
  headerContent: ReactNode;
  content: ReactNode;
};

export const LayoutBoards = ({ headerContent, content }: LayoutBoards) => {
  return (
    <>
      <header className="flex flex-col items-start justify-start gap-6 px-6 py-8 lg:mx-auto lg:w-[1280px] lg:px-8 lg:pt-12">
        {headerContent}
        <div className="h-px w-full self-stretch bg-gray-200" />
      </header>
      <section className="flex flex-grow flex-col items-center justify-center px-6 lg:mx-auto lg:w-[1280px] lg:px-8 lg:pb-24">
        {content}
      </section>
    </>
  );
};
