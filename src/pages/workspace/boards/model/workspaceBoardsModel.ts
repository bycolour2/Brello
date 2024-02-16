import { createEvent, sample } from "effector";

import { chainWorkspace, workspaceById } from "~/entities/workpaces";

import { pageNotFoundRoute, routes } from "~/shared/routing";
import { chainAuthenticated } from "~/shared/viewer";

const workspaceNotFound = createEvent();

export const currentRoute = routes.workspaces.view.boards;
export const authenticatedRoute = chainAuthenticated(currentRoute);
export const workspaceRoute = chainWorkspace(authenticatedRoute, {
  notFound: workspaceNotFound,
});

sample({
  clock: workspaceNotFound,
  filter: currentRoute.$isOpened,
  target: pageNotFoundRoute.open,
});

export const $workspace = workspaceById(
  workspaceRoute.$params.map(({ workspaceId }) => workspaceId ?? "<id>"),
);
