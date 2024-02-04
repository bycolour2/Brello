import { cva, type VariantProps } from "class-variance-authority";

import { User01 } from "~/shared/assets/icons";
import { cn } from "~/shared/lib/cn";

const avatarVariants = cva(
  "flex items-center justify-center rounded-full bg-gray-100 active:border-4 active:border-gray-200",
  {
    variants: {
      size: {
        xs: "h-6 w-6 p-1 text-xs active:p-0",
        sm: "h-8 w-8 p-1.5 text-sm active:p-0.5",
        md: "h-10 w-10 p-2 text-base active:p-1",
        lg: "h-12 w-12 p-2.5 text-lg active:p-1.5",
        xl: "h-14 w-14 p-3 text-xl active:p-2",
        "2xl": "h-16 w-16 p-4 text-2xl active:p-3",
      },
    },
    compoundVariants: [],
    defaultVariants: {
      size: "md",
    },
  },
);

export type AvatarProps = {
  className?: string;
  src?: string | null;
  text?: string;
  status?: "online" | "offline" | "away";
} & VariantProps<typeof avatarVariants>;

//TODO - make avatar more configurable and generic
export const Avatar = ({ size, text, src, className }: AvatarProps) => {
  let content = <User01 />;
  if (text) {
    content = (
      <p className="text-center font-medium uppercase text-gray-600">{text}</p>
    );
  }
  if (src) {
    content = (
      <img
        src={src}
        alt="user avatar"
        className="h-full w-full rounded-full object-cover"
      />
    );
  }

  return (
    <div
      className={cn(avatarVariants({ size }), src ? "p-0" : null, className)}
    >
      {content}
    </div>
  );
};
