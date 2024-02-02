import { User01 } from "~/shared/assets/icons";
import { cn } from "~/shared/lib/cn";

type AvatarProps = {
  size?: number;
  src?: string;
};

//TODO - make avatar more configurable and generic
export const Avatar = ({ src, size = 6 }: AvatarProps) => {
  const avatarSize = `h-${size} w-${size}`;
  return (
    <div className="flex items-center justify-center rounded-full bg-gray-100 p-2">
      {src ? (
        <img
          src={src}
          className={cn("h-6 w-6", avatarSize)}
          alt="user avatar"
        />
      ) : (
        <User01 className={(cn("h-6 w-6"), avatarSize)} />
      )}
    </div>
  );
};
