import { createHistoryRouter, createRouterControls } from "atomic-router";
import { sample } from "effector";
import { createBrowserHistory } from "history";

import { appStarted } from "~/shared/init";

import { pageNotFoundRoute, routesMap } from "./routes";

export { routes, pageNotFoundRoute } from "./routes";

export const controls = createRouterControls();

export const router = createHistoryRouter({
  routes: routesMap,
  controls,
  notFoundRoute: pageNotFoundRoute,
});

sample({
  clock: appStarted,
  fn: () => createBrowserHistory(),
  target: router.setHistory,
});
