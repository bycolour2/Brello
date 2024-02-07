import { chainRoute, RouteInstance, RouteParamsAndQuery } from "atomic-router";
import { attach, createEvent, Effect, EventCallable, sample } from "effector";
import { condition } from "patronum";

import { api } from "~/shared/api";

import { $workspaceCache, workspaceCached } from "./model";

type WorkspaceParams = { workspaceId: string };

//REVIEW - предложенное решение, но не очень понимаю как это использовать
// interface WorkspaceChainParams<Params extends WorkspaceParams> {
//   notFound?: Event<Params>;
// }

interface WorkspaceChainParams {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  notFound?: EventCallable<any> | Effect<void, any, any>;
}

const workspaceGetFx = attach({ effect: api.workspaces.workspaceGetFx });

/**
 * 1. Проверить кэш на наличие данных
 * 2.1. Если кэш найден
 *  3. Выгружаем данные из кэша
 * 2.2. Если кэш не найден
 *  3. Выгружаем данные с сервера
 */

export function chainWorkspace<Params extends WorkspaceParams>(
  route: RouteInstance<Params>,
  params: WorkspaceChainParams = {},
): RouteInstance<Params> {
  const workspaceCheckStarted = createEvent<RouteParamsAndQuery<Params>>();
  const workspaceInCacheFound = createEvent();
  const workspaceInCacheNotFound = createEvent();
  const workspaceExists = createEvent();
  const workspaceNotExists = createEvent();

  const doesWorkspaceExist = sample({
    clock: workspaceCheckStarted,
    source: $workspaceCache,
    fn: (cache, { params }) => Boolean(cache[params.workspaceId]),
  });

  condition({
    source: doesWorkspaceExist,
    if: Boolean,
    then: workspaceInCacheFound,
    else: workspaceInCacheNotFound,
  });
  sample({
    clock: workspaceInCacheFound,
    target: workspaceExists,
  });

  sample({
    clock: workspaceInCacheNotFound,
    source: route.$params,
    fn: ({ workspaceId }) => ({ workspaceId }),
    target: workspaceGetFx,
  });

  sample({
    clock: workspaceGetFx.doneData,
    filter: Boolean,
    target: [workspaceCached, workspaceExists],
  });
  sample({
    clock: workspaceGetFx.doneData,
    filter: (workspace) => !workspace,
    target: workspaceNotExists,
  });

  sample({
    clock: workspaceGetFx.fail,
    target: workspaceNotExists,
  });

  if (params.notFound) {
    sample({
      clock: workspaceNotExists,
      source: route.$params,
      filter: route.$isOpened,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      target: params.notFound as EventCallable<any>,
    });
  }

  return chainRoute({
    route,
    beforeOpen: workspaceCheckStarted,
    openOn: workspaceExists,
    cancelOn: workspaceNotExists,
  });
}
