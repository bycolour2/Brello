import {
  chainRoute,
  RouteInstance,
  RouteParams,
  RouteParamsAndQuery,
} from "atomic-router";
import { createEffect, createEvent, sample } from "effector";
import { and, debug, not, or } from "patronum";

import { api } from "~/shared/api";
import { createFlag } from "~/shared/lib/localstorage-flags";
import { comebackSave, routes } from "~/shared/routing";
import { $viewer } from "~/shared/viewer";

/**
 * When user opens page with `chainOnboarded`
 * Chainer MUST check profile content
 *  If user should fill profile, it must open onboarding/user
 *  If user skipped, it should not open anymore (on this session?)
 * After profile check, chainer Must check workspace availability
 *  If no workspace created, chainer must open onboarding/workspaces
 *  User can not skip workspace onboarding
 * When user finished creating workspace, chainer SHOULD open chainedRoute
 */

export const chainOnboarded = <Params extends RouteParams>(
  route: RouteInstance<Params>,
) => {
  const checksStarted = createEvent<RouteParamsAndQuery<Params>>();
  const checksFinished = createEvent();

  const profileChecks = createProfileChecks();
  const workspaceChecks = createWorkspaceChecks();

  sample({
    clock: checksStarted,
    target: profileChecks.started,
  });

  sample({
    clock: profileChecks.finished,
    target: workspaceChecks.started,
  });

  sample({
    clock: workspaceChecks.finished,
    target: checksFinished,
  });

  return chainRoute({
    route,
    beforeOpen: checksStarted,
    openOn: checksFinished,
  });
};

const profileExistsFx = createEffect(async ({ userId }: { userId: string }) => {
  const exists = await api.profiles.profileExistsFx({ userId });
  if (!exists) {
    throw new Error("Profile does not exist");
  }

  return exists;
});

export const onboardingProfileSkip = createFlag({
  fieldName: "pr-on-sk",
  initial: false,
});

//TODO - on user logout clear flag

export const onboardingProfileCheckDone = createFlag({
  fieldName: "pr-on-cd",
  initial: false,
});

debug({ trace: true }, profileExistsFx);

function createProfileChecks() {
  const started = createEvent();
  const finished = createEvent();
  const checksAllowed = createEvent();

  sample({
    clock: started,
    filter: or(onboardingProfileSkip.$isSet, onboardingProfileCheckDone.$isSet),
    target: finished,
  });

  sample({
    clock: started,
    filter: and(
      not(onboardingProfileSkip.$isSet),
      not(onboardingProfileCheckDone.$isSet),
    ),
    target: checksAllowed,
  });

  sample({
    clock: checksAllowed,
    source: $viewer,
    filter: Boolean,
    fn: ({ id }) => ({ userId: id }),
    target: profileExistsFx,
  });

  sample({
    clock: profileExistsFx.failData,
    target: [comebackSave, routes.onboarding.user.open],
  });
  debug(profileExistsFx.failData);

  sample({
    clock: profileExistsFx.doneData,
    target: onboardingProfileCheckDone.enable,
  });

  sample({
    clock: profileExistsFx.doneData,
    target: finished,
  });
  debug(profileExistsFx.doneData);

  return {
    started,
    finished,
  };
}

const workspaceExistsFx = createEffect(
  async ({ userId }: { userId: string }) => {
    const exists = await api.workspaces.workspaceExistsFx({ userId });
    if (!exists) {
      throw new Error("Workspace does not exist");
    }

    return exists;
  },
);
debug({ trace: true }, workspaceExistsFx);

export const onboardingWorkspaceCheckDone = createFlag({
  fieldName: "ws-on-cd",
  initial: false,
});

function createWorkspaceChecks() {
  const started = createEvent();
  const finished = createEvent();
  const checksAllowed = createEvent();

  sample({
    clock: started,
    filter: onboardingWorkspaceCheckDone.$isSet,
    target: finished,
  });

  sample({
    clock: started,
    filter: not(onboardingWorkspaceCheckDone.$isSet),
    target: checksAllowed,
  });

  sample({
    clock: checksAllowed,
    source: $viewer,
    filter: Boolean,
    fn: (viewer) => ({ userId: viewer!.id }),
    target: workspaceExistsFx,
  });

  sample({
    clock: workspaceExistsFx.failData,
    target: [comebackSave, routes.onboarding.workspace.open],
  });
  debug(workspaceExistsFx.failData);

  sample({
    clock: workspaceExistsFx.doneData,
    filter: Boolean,
    target: onboardingWorkspaceCheckDone.enable,
  });

  sample({
    clock: workspaceExistsFx.doneData,
    target: finished,
  });
  debug(workspaceExistsFx.doneData);

  return {
    started,
    finished,
  };
}
