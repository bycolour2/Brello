import {
  chainRoute,
  RouteInstance,
  RouteParams,
  RouteParamsAndQuery,
} from "atomic-router";
import {
  attach,
  createEvent,
  createStore,
  Effect,
  Event,
  sample,
} from "effector";

import { api, User } from "~/shared/api";

enum ViewerStatus {
  Initial = 0,
  Pending,
  Authenticated,
  Anonymous,
}

export const viewerGetFx = attach({ effect: api.auth.getMeFx });

export const $viewer = createStore<User | null>(null);
const $viewerStatus = createStore(ViewerStatus.Initial);

$viewerStatus.on(viewerGetFx, (status) => {
  if (status === ViewerStatus.Initial) return ViewerStatus.Pending;
  return status;
});

$viewer.on(viewerGetFx.doneData, (_, user) => user);
$viewerStatus.on(viewerGetFx.doneData, (_, user) => {
  if (user) return ViewerStatus.Authenticated;
  return ViewerStatus.Anonymous;
});

$viewerStatus.on(viewerGetFx.failData, (status, error) => {
  if (error.status === 401 || error.status === 403) {
    return ViewerStatus.Anonymous;
  }
  // If it is not the Authn or Authz error
  // we need to go to anonymous when its the first viewerGet call
  if (status === ViewerStatus.Pending) {
    return ViewerStatus.Anonymous;
  }
  // Otherwise don't change, to mitigate screen flicks and data loss
  return status;
});

viewerGetFx.failData.watch((error) =>
  console.log(error.status, error.name, error.message),
);

interface ChainParams {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  otherwise?: Event<void> | Effect<void, any, any>;
}

export function chainAuthenticated<Params extends RouteParams>(
  route: RouteInstance<Params>,
  { otherwise }: ChainParams = {},
): RouteInstance<Params> {
  const authenticationCheckStarted = createEvent<RouteParamsAndQuery<Params>>();
  const userAuthenticated = createEvent();
  const userAnonymous = createEvent();

  /**
   * 0 authenticatedCheckStarted
   * 1. status - Initial
   *  1.1 viewerGetFx //*
   * 2. status - Pending
   *  2.1 //nothing //*
   * 3. status - Authenticated
   *  3.1 open chained route //*
   * 4. status - Anonymous
   *  4.1 cancel //*
   *
   * 5. chained route still not opened, but viewerGetFx.finally
   * 5.1 if status Authenticatied - open chained route //*
   * 5.2 if status Anonymous - cancel //*
   *
   * 6. chained route still not opened, route closed //*
   *
   * 7. chained route already opened, but viewer status changed
   */

  sample({
    clock: authenticationCheckStarted,
    source: $viewerStatus,
    filter: (status) => status === ViewerStatus.Initial,
    target: viewerGetFx,
  });

  sample({
    clock: [authenticationCheckStarted, viewerGetFx.done],
    source: $viewerStatus,
    filter: (status) => status === ViewerStatus.Authenticated,
    target: userAuthenticated,
  });

  sample({
    clock: [authenticationCheckStarted, viewerGetFx.done, viewerGetFx.fail],
    source: $viewerStatus,
    filter: (status) => status === ViewerStatus.Anonymous,
    target: userAnonymous,
  });

  if (otherwise) {
    sample({
      clock: userAnonymous,
      filter: route.$isOpened,
      target: otherwise as Event<void>,
    });
  }

  // TODO - When chained route already opened, but viewer status changed,
  // looks like we need to close chainedRoute (or trigger check in parent route)

  return chainRoute({
    route,
    beforeOpen: authenticationCheckStarted,
    openOn: [userAuthenticated],
    cancelOn: [userAnonymous],
  });
}

export function chainAnonymous<Params extends RouteParams>(
  route: RouteInstance<Params>,
  { otherwise }: ChainParams = {},
): RouteInstance<Params> {
  const authenticationCheckStarted = createEvent<RouteParamsAndQuery<Params>>();
  const userAuthenticated = createEvent();
  const userAnonymous = createEvent();

  sample({
    clock: authenticationCheckStarted,
    source: $viewerStatus,
    filter: (status) => status === ViewerStatus.Initial,
    target: viewerGetFx,
  });

  sample({
    clock: [authenticationCheckStarted, viewerGetFx.done],
    source: $viewerStatus,
    filter: (status) => status === ViewerStatus.Authenticated,
    target: userAuthenticated,
  });

  sample({
    clock: [authenticationCheckStarted, viewerGetFx.done, viewerGetFx.fail],
    source: $viewerStatus,
    filter: (status) => status === ViewerStatus.Anonymous,
    target: userAnonymous,
  });

  if (otherwise) {
    sample({
      clock: userAuthenticated,
      filter: route.$isOpened,
      target: otherwise as Event<void>,
    });
  }

  return chainRoute({
    route,
    beforeOpen: authenticationCheckStarted,
    openOn: [userAnonymous],
    cancelOn: [userAuthenticated],
  });
}
