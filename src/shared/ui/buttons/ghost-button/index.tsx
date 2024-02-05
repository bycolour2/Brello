import { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "~/shared/lib/cn";

interface GhostButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: ReactNode;
}

export const GhostButton = ({
  children,
  className,
  ...rest
}: GhostButtonProps) => {
  return (
    <button
      className={cn(
        "m-0 border-none bg-none p-0 hover:cursor-pointer",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
