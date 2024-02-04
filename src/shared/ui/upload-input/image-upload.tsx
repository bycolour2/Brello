import { ChangeEvent, FC, ReactNode, useRef } from "react";

import { cn } from "~/shared/lib/cn";

import { Avatar, Button } from "..";

//TODO - move file input component outside and make image upload as extension of file input

type RootProps = {
  className?: string;
  children: ReactNode;
};

const Root: FC<RootProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "flex flex-row items-start justify-start gap-5 lg:items-center",
        className,
      )}
    >
      {children}
    </div>
  );
};

type PriviewProps = {
  className?: string;
  src?: string | null;
  previewText?: string;
};

const Preview: FC<PriviewProps> = ({ className, previewText, src }) => {
  return (
    <Avatar size={"2xl"} className={className} src={src} text={previewText} />
  );
};

type UploadProps = {
  className?: string;
  text?: string;
  supportingText?: string;
  label?: string;
  accept?: string;
  disabled?: boolean;
  buttonText?: string;
  onSelectFile: ({ file }: { file: File }) => void;
};

const Upload: FC<UploadProps> = ({
  className,
  text = "Upload image",
  supportingText = "SVG, PNG, JPG or GIF (max. 500×500px)",
  label = "image-upload",
  accept = "image/*",
  disabled = false,
  buttonText = "Upload",
  onSelectFile,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    if (!inputRef.current) return;

    inputRef.current.click();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.currentTarget.files ?? []);

    if (files.length === 0) return;

    const file = files[0];
    onSelectFile({ file });
  };

  return (
    <div
      className={cn(
        "flex flex-col items-start justify-start gap-3 lg:flex-row",
        className,
      )}
    >
      <div>
        <p className="text-sm font-medium text-gray-700">{text}</p>
        <p className="text-xs font-normal tracking-normal text-gray-600 lg:text-sm">
          {supportingText}
        </p>
      </div>
      <input
        id={label}
        multiple={false}
        ref={inputRef}
        type="file"
        accept={accept}
        disabled={disabled}
        className="sr-only hidden"
        onChange={handleChange}
      />
      <Button
        variant={"secondary-gray"}
        onClick={handleClick}
        disabled={disabled}
      >
        {buttonText}
      </Button>
    </div>
  );
};

export const ImageUpload = {
  Root,
  Preview,
  Upload,
};
