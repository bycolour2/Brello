import { cn } from "~/shared/lib";

export const GoogleSocialIcon = ({ className }: { className?: string }) => {
  return (
    <img
      src="/images/google-social-icon.svg"
      alt="Google social link"
      className={cn("h-6 w-6", className)}
    />
  );
};
