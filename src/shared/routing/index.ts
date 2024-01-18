import { createHistoryRouter, createRouterControls } from "atomic-router";
import { createBrowserHistory } from "history";
import { pageNotFoundRoute, routesMap } from "./routes";
import { sample } from "effector";
import { appStarted } from "~/shared/init";
export { routes, pageNotFoundRoute } from "./routes";

export const controls = createRouterControls();

export const router = createHistoryRouter({
  routes: routesMap,
  notFoundRoute: pageNotFoundRoute,
});

sample({
  clock: appStarted,
  fn: () => createBrowserHistory(),
  target: router.setHistory,
});
