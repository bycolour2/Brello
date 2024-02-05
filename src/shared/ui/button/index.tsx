import { ButtonHTMLAttributes, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/shared/lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-blue-600 fill-transparent font-semibold outline-none transition-colors disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary:
          "shadow-button border-blue-600 bg-blue-600 stroke-white text-white hover:border-blue-700 hover:bg-blue-700 focus-visible:ring-4 focus-visible:ring-[#F4EBFF] disabled:border-blue-200 disabled:bg-blue-200",
        "secondary-gray":
          "shadow-button border-gray-300 bg-white stroke-gray-700 text-gray-700 hover:bg-gray-50 hover:text-gray-800 focus-visible:ring-4 focus-visible:ring-[#F2F4F7] disabled:border-blue-200 disabled:bg-white disabled:stroke-gray-300 disabled:text-gray-300",
        "secondary-color":
          "border-blue-50 bg-blue-50 text-blue-700 hover:border-blue-100 hover:bg-blue-100 hover:text-blue-800 focus-visible:ring-4 focus-visible:ring-[#F4EBFF] disabled:border-[#F5F8FF] disabled:bg-[#F5F8FF] disabled:stroke-blue-300 disabled:text-blue-300",
        "tertiary-gray":
          "border-none bg-white stroke-gray-600 text-gray-600 hover:bg-gray-50 hover:stroke-gray-700 hover:text-gray-700 disabled:stroke-gray-300 disabled:text-gray-300",
        "tertiary-color":
          "border-none bg-white stroke-blue-700 text-blue-700 hover:bg-blue-50 hover:stroke-blue-800 hover:text-blue-800 disabled:stroke-gray-300 disabled:text-gray-300",
        "link-gray":
          "border-none bg-transparent stroke-gray-600 text-gray-600 hover:stroke-gray-700 hover:text-gray-700 disabled:stroke-gray-300 disabled:text-gray-300",
        "link-color":
          "border-none bg-transparent stroke-blue-700 text-blue-700 hover:stroke-blue-800 hover:text-blue-800 disabled:stroke-gray-300 disabled:text-gray-300",
      },
      destructive: {
        true: "",
        false: "",
      },
      size: {
        sm: "h-7 px-3.5 py-2 text-sm",
        md: "h-10 px-4 py-2.5 text-sm",
        lg: "h-11 px-[18px] py-2.5 text-base",
        xl: "h-12 px-5 py-3 text-base",
        "2xl": "h-[60px] px-7 py-4 text-lg",
      },
    },
    compoundVariants: [
      {
        variant: "primary",
        destructive: true,
        className:
          "border-red-600 bg-red-600 hover:border-red-700 hover:bg-red-700 focus-visible:ring-4 focus-visible:ring-[#FEE4E2] disabled:border-red-200 disabled:bg-red-200",
      },
      {
        variant: "secondary-gray",
        destructive: true,
        className:
          "border-red-300 bg-white text-red-700 hover:border-red-700 hover:bg-red-50 hover:text-red-800 focus-visible:ring-4 focus-visible:ring-[#FEE4E2] disabled:border-red-200 disabled:text-red-300",
      },
      {
        variant: "secondary-color",
        destructive: true,
        className:
          "border-red-50 bg-red-50 text-red-700 hover:border-red-100 hover:bg-red-100 hover:text-red-800 focus-visible:ring-4 focus-visible:ring-[#FEE4E2] disabled:border-[#FFFBFA] disabled:bg-[#FFFBFA] disabled:text-red-300",
      },
      {
        variant: ["tertiary-gray", "tertiary-color"],
        destructive: true,
        className:
          "text-red-700 hover:bg-red-50 hover:text-red-800 disabled:text-red-300",
      },
      {
        variant: ["link-gray", "link-color"],
        destructive: true,
        className: "text-red-700 hover:text-red-800 disabled:text-red-300",
      },
      {
        variant: ["link-gray", "link-color"],
        className: "h-5 p-0",
      },
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
      destructive: false,
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
}

export const Button = ({
  type = "button",
  className,
  variant,
  destructive,
  size,
  children,
  leadingIcon,
  trailingIcon,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      aria-disabled={disabled}
      className={cn(buttonVariants({ variant, destructive, size, className }))}
      {...props}
    >
      {leadingIcon && <div className="h-5 w-5">{leadingIcon}</div>}
      {children}
      {trailingIcon && <div className="h-5 w-5">{trailingIcon}</div>}
    </button>
  );
};
