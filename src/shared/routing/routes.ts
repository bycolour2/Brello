import { createRoute, UnmappedRouteObject } from "atomic-router";

export const routes = {
  home: createRoute(),
  auth: {
    signIn: createRoute(),
    finish: createRoute(),
  },
  onboarding: {
    user: createRoute(),
    workspace: createRoute(),
  },
  workspaces: {
    view: {
      boards: createRoute<{ workspaceId: string }>(),
    },
    settings: createRoute<{ workspaceId: string }>(),
  },
};

export const pageNotFoundRoute = createRoute();

// export const routesMap: UnmappedRouteObject<object>[] = [
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const routesMap: UnmappedRouteObject<any>[] = [
  { path: "/", route: routes.home },
  { path: "/auth/signin", route: routes.auth.signIn },
  { path: "/auth/finish", route: routes.auth.finish },
  { path: "/onboarding/user", route: routes.onboarding.user },
  { path: "/onboarding/workspace", route: routes.onboarding.workspace },
  {
    path: "/workspaces/:workspaceId/boards",
    route: routes.workspaces.view.boards,
  },
  {
    path: "/workspaces/:workspaceId/settings",
    route: routes.workspaces.settings,
  },
];
