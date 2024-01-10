import { InputHTMLAttributes } from "react";

type InputProps = {
  label?: string;
  trailingIcon?: boolean;
  hint?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = ({
  label,
  trailingIcon = false,
  hint,
  ...rest
}: InputProps) => {
  return (
    <div className="flex flex-col items-start gap-1.5 self-stretch">
      <div className="flex flex-col items-start gap-1.5 self-stretch">
        {label ? (
          <label className="text-sm font-medium text-gray-700">{label}</label>
        ) : null}
        <div className="flex flex-row items-center gap-2 self-stretch rounded-lg border border-gray-300 bg-white px-3.5 py-2.5">
          <input
            {...rest}
            className="flex-[1_0_0] text-gray-900 outline-none"
          />
          {trailingIcon ? (
            <div className="flex h-4 w-4 items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <g clip-path="url(#clip0_6735_603)">
                  <path
                    d="M6.05992 6.00004C6.21665 5.55449 6.52602 5.17878 6.93322 4.93946C7.34042 4.70015 7.81918 4.61267 8.2847 4.69252C8.75022 4.77236 9.17246 5.01439 9.47664 5.37573C9.78081 5.73706 9.94729 6.19439 9.94659 6.66671C9.94659 8.00004 7.94659 8.66671 7.94659 8.66671M7.99992 11.3334H8.00659M14.6666 8.00004C14.6666 11.6819 11.6818 14.6667 7.99992 14.6667C4.31802 14.6667 1.33325 11.6819 1.33325 8.00004C1.33325 4.31814 4.31802 1.33337 7.99992 1.33337C11.6818 1.33337 14.6666 4.31814 14.6666 8.00004Z"
                    stroke="#98A2B3"
                    strokeWidth="1.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_6735_603">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          ) : null}
        </div>
      </div>
      {hint ? (
        <div className="self-stretch text-sm text-gray-600">{hint}</div>
      ) : null}
    </div>
  );
};