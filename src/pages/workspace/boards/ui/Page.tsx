import { ReactNode } from "react";
import { Link } from "atomic-router-react";
import { useUnit } from "effector-react";

import { LayoutBoards } from "~/layouts/boards";

import {
  AlertCircle,
  Plus,
  PlusCircle,
  SearchLg,
  Settings02,
  UsersPlus,
} from "~/shared/assets/icons";
import { Avatar, Button, FeaturedIcon, Input } from "~/shared/ui";

import { $workspace } from "../model/workspaceBoardsModel";

export const BoardsPage = () => {
  return (
    <LayoutBoards
      headerContent={<BoardsHeader />}
      content={<BoardsContent />}
    />
  );
};

const BoardsHeader = () => {
  const [workspace] = useUnit([$workspace]);
  return (
    <div className="flex flex-col gap-5 self-stretch lg:flex-row lg:justify-between">
      <div className="flex flex-row items-center gap-4 self-stretch">
        <Avatar size={"xl"} src={workspace?.avatarUrl} className="lg:hidden" />
        <Avatar
          size={"2xl"}
          src={workspace?.avatarUrl}
          className="hidden lg:block"
        />
        <div className="flex flex-grow flex-col items-start justify-start gap-1">
          <h4 className="self-stretch text-2xl font-semibold text-gray-900 lg:text-3xl">
            {workspace?.name}
          </h4>
          <p className="self-stretch text-base font-normal text-gray-600">
            {workspace?.description}
          </p>
        </div>
      </div>
      <div className="flex flex-row gap-3">
        <Button
          variant={"secondary-gray"}
          leadingIcon={<Settings02 className="h-5 w-5" />}
        >
          Settings
        </Button>
        <Button leadingIcon={<UsersPlus className="h-5 w-5" />}>
          Invite members
        </Button>
      </div>
    </div>
  );
};

const BoardsContent = () => {
  const boards = [{}];
  const filteredBoards = [{}];
  const error = false;
  return (
    <>
      {boards.length === 0 ? (
        <BoardsEmpty
          actions={
            <Button size={"lg"} leadingIcon={<Plus className="h-5 w-5" />}>
              New board
            </Button>
          }
          featuredIcon={
            <FeaturedIcon
              theme={"light-circle-outline"}
              size={"lg"}
              icon={<Plus className="h-3.5 w-3.5 text-black" />}
            />
          }
          text="Start by creating a board"
          supportingText={
            <>
              Your boards will live here. Start creating by clicking
              <br />
              on «New board»
            </>
          }
        />
      ) : (
        <div className="flex flex-col items-center justify-start self-stretch">
          <div className="flex flex-col items-start justify-start gap-4 self-stretch lg:flex-row lg:items-center lg:justify-between">
            <p className="text-lg font-semibold text-gray-900">Boards</p>
            <Input
              name="search"
              placeholder="Search"
              size={"sm"}
              value=""
              onValue={() => {}}
              className="lg:w-[320px]"
            />
          </div>

          {filteredBoards.length === 0 ? (
            <BoardsEmpty
              actions={
                <>
                  <Button size={"lg"} variant={"secondary-gray"}>
                    Clear search
                  </Button>
                  <Button
                    size={"lg"}
                    leadingIcon={<Plus className="h-5 w-5" />}
                  >
                    New board
                  </Button>
                </>
              }
              featuredIcon={
                <FeaturedIcon
                  theme={"light-circle-outline"}
                  size={"lg"}
                  icon={<SearchLg className="h-[18px] w-[18px] text-black" />}
                />
              }
              text="No boards found"
              supportingText={
                <>
                  Your search “%CHANGE_SEARCH_VALUE%” did not match any boards.
                  <br />
                  Please try again.
                </>
              }
            />
          ) : (
            <div className="flex flex-grow flex-col items-center justify-start gap-8 self-stretch pt-8 lg:flex-row lg:flex-wrap">
              <CreateBoardCard />
              <BoardCard label="Sample text" />
              <BoardCard label="Sample text" />
              <BoardCard label="Sample text" />
              <BoardCard label="Sample text" />
              <BoardCard label="Sample text" />
              <BoardCard label="Sample text" />
              <BoardCard label="Sample text" />
              <BoardCard label="Sample text" />
            </div>
          )}

          {error ? (
            <BoardsEmpty
              actions={
                <Button size={"lg"} leadingIcon={<Plus className="h-5 w-5" />}>
                  Try again
                </Button>
              }
              featuredIcon={
                <FeaturedIcon
                  theme={"light-circle-outline"}
                  color={"error"}
                  size={"lg"}
                  icon={<AlertCircle className="h-5 w-5 text-red-600" />}
                />
              }
              text="Oops, something goes wrong"
              supportingText="Some description here"
            />
          ) : null}
        </div>
      )}
    </>
  );
};

type BoardsEmptyProps = {
  actions?: ReactNode;
  featuredIcon?: ReactNode;
  text: ReactNode;
  supportingText?: ReactNode;
};

const BoardsEmpty = ({
  actions,
  featuredIcon,
  supportingText,
  text,
}: BoardsEmptyProps) => {
  return (
    <div className="flex flex-grow flex-col items-center justify-start gap-6 py-8 lg:flex-grow-0">
      <div className="flex flex-col items-center justify-start gap-4 self-stretch">
        {featuredIcon}
        <div className="flex flex-col items-center gap-1 self-stretch">
          <p className="text-center text-base font-semibold text-gray-900">
            {text}
          </p>
          <p className="text-center text-xs text-gray-600">{supportingText}</p>
        </div>
      </div>
      <div className="flex flex-row items-start justify-start gap-3">
        {actions}
      </div>
    </div>
  );
};

type BoardCardProps = {
  link?: string;
  label: string;
};

const BoardCard = ({ link, label }: BoardCardProps) => {
  return (
    <div className="flex h-[120px] w-[280px] flex-col items-start justify-start rounded-2xl border border-gray-200 bg-blue-600 px-5 pb-6 pt-5">
      <Link to={link ? link : "#"}>
        <p className="text-lg font-medium text-gray-50/90">{label}</p>
      </Link>
    </div>
  );
};

const CreateBoardCard = () => {
  return (
    <div className="flex h-[120px] w-[280px] items-center justify-center rounded-2xl border border-gray-200 px-5 pb-6 pt-5">
      <Button
        variant={"tertiary-gray"}
        leadingIcon={<PlusCircle className="h-5 w-5" />}
      >
        Create new board
      </Button>
    </div>
  );
};
