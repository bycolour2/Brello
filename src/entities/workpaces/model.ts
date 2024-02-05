import { combine, createEvent, createStore, Store } from "effector";

import { Workspace } from "~/shared/api";

type WorkspaceId = Workspace["id"];

export const workspaceCached = createEvent<Workspace>();

export const $workspaceCache = createStore<Record<WorkspaceId, Workspace>>({});

$workspaceCache.on(workspaceCached, (cache, workspace) => ({
  ...cache,
  [workspace.id]: workspace,
}));

export function workspaceById(
  $id: Store<WorkspaceId>,
): Store<Workspace | null> {
  return combine(
    $workspaceCache,
    $id,
    (cache, id) => (cache[id] ?? null) as Workspace | null,
  );
}
