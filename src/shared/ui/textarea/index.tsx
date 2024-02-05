import { ChangeEvent, ReactNode, TextareaHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/shared/lib/cn";

const textareaVariants = cva(
  "min-h-[130px] flex-[1_0_0] resize-none self-stretch rounded-lg border border-gray-300 bg-white px-3.5 py-3 text-base font-normal text-gray-900 outline-none focus-visible:ring-4 focus-visible:ring-[#F4EBFF] disabled:bg-gray-50 disabled:bg-transparent disabled:text-gray-500",
  {
    variants: {
      destructive: {
        true: "border-red-300 focus-visible:ring-[#FEE4E2]",
        false: "",
      },
    },
    defaultVariants: {
      destructive: false,
    },
  },
);

interface TextareaProps<T extends string>
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size">,
    VariantProps<typeof textareaVariants> {
  className?: string;
  label?: string;
  name: T;
  value: string;
  onValue: (value: string, { name }: { name: T }) => void;
  hint?: string;
  error?: ReactNode | null;
}

export const Textarea = <T extends string>({
  className,
  label,
  name,
  value,
  onValue,
  hint,
  error,
  disabled,
  ...rest
}: TextareaProps<T>) => {
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    const { value, name } = event.currentTarget;
    onValue(value, { name: name as T });
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
      <textarea
        name={name}
        disabled={disabled}
        aria-disabled={disabled}
        value={value}
        onChange={handleChange}
        className={cn(
          textareaVariants({
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
      <textarea
        name={name}
        disabled={disabled}
        aria-disabled={disabled}
        value={value}
        onChange={(e) => handleChange(e)}
        className={cn(
          textareaVariants({
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
