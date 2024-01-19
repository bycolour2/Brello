import { ChangeEvent, InputHTMLAttributes, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/shared/lib/cn";

const inputVariants = cva(
  "flex-[1_0_0] self-stretch rounded-lg border border-gray-300 bg-white text-gray-900 outline-none focus-visible:ring-4 focus-visible:ring-[#F4EBFF] disabled:bg-gray-50 disabled:bg-transparent disabled:text-gray-500",
  {
    variants: {
      destructive: {
        true: "border-red-300 focus-within:ring-[#FEE4E2]",
        false: "",
      },
      size: {
        sm: "min-h-[42px] px-3 py-2 text-base",
        md: "min-h-[46px] px-3.5 py-2.5 text-base",
      },
    },
    defaultVariants: {
      size: "sm",
      destructive: false,
    },
  },
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
  error?: ReactNode | null;
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
  error,
  disabled,
  ...rest
}: InputProps<T>) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.currentTarget;
    onValue({ value, name: name as T });
  };

  const hasError = Boolean(error);

  return label ? (
    <label
      className={cn(
        "flex flex-col items-start gap-1.5 self-stretch",
        className,
      )}
    >
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <input
        name={name}
        type={type}
        value={value}
        disabled={disabled}
        aria-disabled={disabled}
        onChange={handleChange}
        className={cn(
          inputVariants({
            size,
            destructive: hasError,
          }),
        )}
        {...rest}
      />
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
      <input
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
        className={cn(
          inputVariants({
            size,
            destructive: hasError,
          }),
        )}
        {...rest}
      />
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
