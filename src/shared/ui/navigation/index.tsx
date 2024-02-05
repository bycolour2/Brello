import { ReactNode, useEffect, useState } from "react";
import { Link } from "atomic-router-react";
import { useUnit } from "effector-react";

import {
  ChevronDown,
  ChevronUp,
  LayersTwo01,
  Menu02,
  UserCircle,
  XClose,
} from "~/shared/assets/icons";
import { cn } from "~/shared/lib/cn";
import { $viewer } from "~/shared/viewer";

import { Avatar, Button, Logo } from "..";

//TODO - rewrite as compound component

export const Navigation = () => {
  const viewer = useUnit($viewer);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setIsMobileNavOpen((prev) => !prev);
  };

  useEffect(() => {
    const container = document.body;

    if (!container) return;
    if (isMobileNavOpen) {
      container.classList.add("overflow-hidden");
    } else {
      container.classList.remove("overflow-hidden");
    }

    return () => {
      if (container) container.classList.remove("overflow-auto");
    };
  }, [isMobileNavOpen]);

  return (
    <>
      <div className="z-10 flex h-[64px] flex-col items-center self-stretch border-b border-gray-200 shadow-sm lg:h-[72px]">
        <div className=" flex flex-[1_0_0] items-center justify-between self-stretch bg-white py-3 pl-4 pr-2 lg:mx-auto lg:w-[1280px]">
          <div className="flex items-center gap-4">
            <Logo />
            <nav className="hidden lg:block">
              <ul className="flex flex-row gap-1">
                <NavigationItem>
                  <LayersTwo01 className="h-6 w-6 text-gray-500" />
                  Boards
                </NavigationItem>
                <NavigationItem>
                  <UserCircle className="h-6 w-6 text-gray-500" />
                  Members
                </NavigationItem>
              </ul>
            </nav>
          </div>

          <button
            type="button"
            onClick={handleMobileMenuToggle}
            className="flex items-center justify-center rounded-lg bg-white p-2 hover:bg-gray-50 lg:hidden"
          >
            {isMobileNavOpen ? (
              <XClose className="h-6 w-6 text-gray-500" />
            ) : (
              <Menu02 className="h-6 w-6 text-gray-500" />
            )}
          </button>

          <div className="hidden gap-4 lg:flex lg:items-center">
            <Avatar />
          </div>
        </div>
      </div>
      <div
        className={cn(
          "absolute left-0 right-0 top-0 z-0 flex -translate-y-full flex-col items-start justify-start bg-black transition-transform duration-500 lg:hidden",
          isMobileNavOpen ? "translate-y-[64px]" : "",
        )}
      >
        <nav className="flex flex-col items-start justify-start self-stretch bg-white shadow-lg">
          <ul className="flex flex-col items-start justify-start gap-2 self-stretch border-b border-gray-200 py-6">
            <NavigationItem>
              <LayersTwo01 className="h-6 w-6 text-gray-500" />
              Boards
            </NavigationItem>
            <NavigationItem>
              <UserCircle className="h-6 w-6 text-gray-500" />
              Members
            </NavigationItem>
          </ul>
          {!viewer ? (
            <footer className="flex flex-col items-start justify-start self-stretch px-4 py-6 lg:hidden">
              <Button
                variant={"secondary-gray"}
                size={"xl"}
                className="self-stretch"
              >
                Sign in
              </Button>
            </footer>
          ) : null}
        </nav>
      </div>
    </>
  );
};

type NavigationItemProps = {
  to?: string;
  dot?: boolean;
  badge?: number;
  dropdown?: boolean;
  children?: ReactNode;
};

export const NavigationItem = ({
  to,
  dot,
  badge,
  dropdown,
  children,
}: NavigationItemProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownOpen = () => {
    setIsDropdownOpen(true);
  };
  const handleDropdownClose = () => {
    setIsDropdownOpen(false);
  };

  return (
    <li
      onMouseEnter={handleDropdownOpen}
      onMouseLeave={handleDropdownClose}
      className="relative flex h-12 items-center gap-2 self-stretch rounded-md bg-white px-4 py-3 hover:bg-gray-50 lg:h-10 lg:px-3 lg:py-2"
    >
      <Link to={to ? to : "#"}>
        <div className="flex flex-[1_0_0] flex-row items-center gap-3">
          {dot ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
            >
              <circle cx="5" cy="5" r="4" fill="#12B76A" />
            </svg>
          ) : null}
          <span className="inline-flex flex-row items-center gap-3 text-base font-semibold text-gray-900">
            {children}
          </span>
        </div>
      </Link>
      {badge ? (
        <div className="flex items-center rounded-2xl bg-gray-100 px-2 py-0.5 mix-blend-multiply">
          <span className="select-none text-xs font-medium text-gray-700">
            {badge}
          </span>
        </div>
      ) : null}
      {dropdown ? (
        <>
          {isDropdownOpen ? (
            <ChevronUp className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          )}
          {/* //TODO - add dropdown menu item full support */}
          <ul
            className={cn(
              "absolute bottom-0 left-0 right-0 flex translate-y-full flex-col gap-1 self-stretch pb-2 pt-1",
              isDropdownOpen ? "" : "hidden",
            )}
          >
            <li className="flex items-center gap-2 self-stretch rounded-md border border-gray-100/60 bg-white py-2 pl-12 pr-3 font-semibold text-gray-700 shadow-sm hover:bg-gray-50">
              <Link to={""}>1dfsdf</Link>
            </li>
          </ul>
        </>
      ) : null}
    </li>
  );
};
