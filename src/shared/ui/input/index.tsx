import { ChangeEvent, InputHTMLAttributes, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/shared/lib/cn";

const inputVariants = cva(
  "flex-[1_0_0] self-stretch rounded-lg border border-gray-300 bg-white text-gray-900 outline-none focus-visible:ring-4 focus-visible:ring-[#F4EBFF] disabled:bg-gray-50 disabled:bg-transparent disabled:text-gray-500",
  {
    variants: {
      destructive: {
        true: "border-red-300 focus-visible:ring-[#FEE4E2]",
        false: "",
      },
      size: {
        sm: "min-h-[42px] px-3 py-2 text-base",
        md: "min-h-[46px] px-3.5 py-2.5 text-base",
      },
      leadingText: {
        true: "rounded-l-none",
        false: "",
      },
    },
    defaultVariants: {
      size: "sm",
      destructive: false,
      leadingText: false,
    },
  },
);

interface InputProps<T extends string>
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
    Omit<VariantProps<typeof inputVariants>, "leadingText"> {
  className?: string;
  type?: "text" | "email" | "search";
  label?: string;
  name: T;
  leadingText?: string;
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
  leadingText,
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
      <div className="inline-flex items-center self-stretch">
        {leadingText ? (
          <p className="max-w-[33%] overflow-hidden text-ellipsis rounded-l-lg border border-r-0 border-gray-300 py-2.5 pl-3.5 pr-3 text-base tracking-tight text-gray-600">
            {leadingText}
          </p>
        ) : null}
        <input
          name={name}
          type={type}
          disabled={disabled}
          aria-disabled={disabled}
          value={value}
          onChange={handleChange}
          className={cn(
            inputVariants({
              size,
              destructive: hasError,
              leadingText: !!leadingText,
            }),
          )}
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
      <div className="inline-flex items-center self-stretch">
        {leadingText ? (
          <p className="max-w-[33%] overflow-hidden text-ellipsis rounded-l-lg border border-r-0 border-gray-300 py-2.5 pl-3.5 pr-3 text-base tracking-tight text-gray-600 lg:max-w-none">
            {leadingText}
          </p>
        ) : null}
        <input
          name={name}
          type={type}
          disabled={disabled}
          aria-disabled={disabled}
          value={value}
          onChange={handleChange}
          className={cn(
            inputVariants({
              size,
              destructive: hasError,
              leadingText: !!leadingText,
            }),
          )}
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
