import { Menu02, XClose } from "~/shared/assets/icons";

import { Button } from "../button";

interface NavMenuButtonProps {
  className?: string;
  isOpened: boolean;
  onClick?: () => void;
}

export const NavMenuButton = ({
  className,
  isOpened,
  onClick,
}: NavMenuButtonProps) => {
  return (
    <Button
      type="button"
      variant={"tertiary-gray"}
      onClick={onClick}
      className={className}
    >
      {isOpened ? (
        <XClose className="h-6 w-6 text-gray-500" />
      ) : (
        <Menu02 className="h-6 w-6 text-gray-500" />
      )}
    </Button>
  );
};
