import { type VariantProps, cva } from "class-variance-authority";
import { ReactNode } from "react";
import { cn } from "~/shared/lib/cn";

const featuredIconVariants = cva("", {
  variants: {
    color: {
      primary: "border-blue-50 bg-blue-100",
      gray: "border-gray-50 bg-gray-100",
      error: "border-red-50 bg-red-100",
      warning: "border-yellow-50 bg-yellow-100",
      success: "border-green-50 bg-green-100",
    },
    theme: {
      "light-circle": "rounded-full",
      "light-circle-outline": "rounded-full p-1",
      "dark-circle": "rounded-full p-1",
    },
    size: {
      xs: "h-6 w-6",
      sm: "h-8 w-8",
      md: "h-10 w-10",
      lg: "h-12 w-12",
      xl: "h-14 w-14",
    },
  },
  compoundVariants: [
    {
      theme: "light-circle",
      size: "xs",
      className: "p-1.5",
    },
    {
      theme: "light-circle",
      size: "sm",
      className: "p-2",
    },
    {
      theme: "light-circle",
      size: "md",
      className: "p-2.5",
    },
    {
      theme: "light-circle",
      size: "lg",
      className: "p-3",
    },
    {
      theme: "light-circle",
      size: "xl",
      className: "p-3.5",
    },
    {
      theme: "light-circle-outline",
      size: "xs",
      className: "border-2",
    },
    {
      theme: "light-circle-outline",
      size: "sm",
      className: "border-4",
    },
    {
      theme: "light-circle-outline",
      size: "md",
      className: "border-[6px]",
    },
    {
      theme: "light-circle-outline",
      size: "lg",
      className: "border-8",
    },
    {
      theme: "light-circle-outline",
      size: "xl",
      className: "border-[10px]",
    },
    {
      theme: "dark-circle",
      size: "xs",
      className: "border-2",
    },
    {
      theme: "dark-circle",
      size: "sm",
      className: "border-4",
    },
    {
      theme: "dark-circle",
      size: "md",
      className: "border-[6px]",
    },
    {
      theme: "dark-circle",
      size: "lg",
      className: "border-8",
    },
    {
      theme: "dark-circle",
      size: "xl",
      className: "border-[10px]",
    },
    {
      theme: "dark-circle",
      color: "primary",
      className: "border-blue-700 bg-blue-600",
    },
    {
      theme: "dark-circle",
      color: "gray",
      className: "border-gray-700 bg-gray-600",
    },
    {
      theme: "dark-circle",
      color: "error",
      className: "border-red-600 bg-red-500",
    },
    {
      theme: "dark-circle",
      color: "warning",
      className: "border-yellow-600 bg-yellow-500",
    },
    {
      theme: "dark-circle",
      color: "success",
      className: "border-green-600 bg-green-500",
    },
  ],
  defaultVariants: {
    color: "primary",
    theme: "light-circle",
    size: "md",
  },
});

type FeaturedIconProps = {
  className?: string;
  icon: ReactNode;
} & VariantProps<typeof featuredIconVariants>;

export const FeaturedIcon = ({
  className,
  icon,
  size,
  theme,
  color,
}: FeaturedIconProps) => {
  return (
    <div
      className={cn(featuredIconVariants({ size, theme, color }), className)}
    >
      {icon}
    </div>
  );
};
