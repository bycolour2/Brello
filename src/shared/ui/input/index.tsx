import { ChangeEvent, InputHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/shared/lib/cn";

const inputVariants = cva(
  "flex flex-row items-center gap-2 self-stretch rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-gray-900 has-[:disabled]:bg-gray-50 has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-[#F4EBFF]",
  {
    variants: {
      destructive: {
        true: "border-red-300 focus-within:ring-[#FEE4E2]",
        false: "",
      },
      size: {
        sm: "h-10 px-3 py-2 text-sm",
        md: "h-[44px] px-3.5 py-2.5 text-base",
      },
    },
    defaultVariants: {
      size: "md",
      destructive: false,
    },
  }
);

interface InputProps<T extends string>
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  className?: string;
  type?: "text" | "email" | "search";
  label?: string;
  name: T;
  value: string;
  onValue: ({ value, name }: { value: string; name: T }) => void;
  hint?: string;
  hasError?: boolean;
  error?: string;
}

export const Input = <T extends string>({
  className,
  type = "text",
  label,
  name,
  size,
  value,
  onValue,
  hint,
  hasError = false,
  error,
  ...rest
}: InputProps<T>) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.currentTarget;
    onValue({ value, name: name as T });
  };

  return label ? (
    <label
      className={cn(
        "flex flex-col items-start gap-1.5 self-stretch",
        className
      )}
    >
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <div
        className={cn(
          inputVariants({
            size,
            destructive: hasError,
          })
        )}
      >
        <input
          name={name}
          type={type}
          value={value}
          onChange={handleChange}
          className="flex-[1_0_0] text-gray-900 outline-none disabled:bg-transparent disabled:text-gray-500"
          {...rest}
        />
      </div>
      {hasError ? (
        <span className="self-stretch text-sm text-red-500">{error}</span>
      ) : (
        hint && (
          <span className="self-stretch text-sm text-gray-600">{hint}</span>
        )
      )}
    </label>
  ) : (
    <div className="flex flex-col items-start gap-1.5 self-stretch">
      <div
        className={cn(
          inputVariants({
            size,
            destructive: hasError,
          })
        )}
      >
        <input
          name={name}
          type={type}
          value={value}
          onChange={handleChange}
          className="flex-[1_0_0] text-gray-900 outline-none disabled:bg-transparent disabled:text-gray-500"
          {...rest}
        />
      </div>
      {hasError ? (
        <span className="self-stretch text-sm text-red-500">{error}</span>
      ) : (
        hint && (
          <span className="self-stretch text-sm text-gray-600">{hint}</span>
        )
      )}
    </div>
  );
};
