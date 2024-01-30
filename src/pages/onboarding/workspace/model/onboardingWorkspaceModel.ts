// import { chainRoute } from "atomic-router";
import { attach, createEvent, createStore, sample } from "effector";
import { and, delay, not, reset } from "patronum";

import { onboardingWorkspaceCheckDone } from "~/features/onboarding";

import { api } from "~/shared/api";
import { routes } from "~/shared/routing";
import { comebackRestore } from "~/shared/routing/comeback";
import { $viewer, chainAuthenticated } from "~/shared/viewer";

export type OnboardingWorkspaceError =
  | "NameInvalid"
  | "SlugInvalid"
  | "SlugTaken"
  | "UnknownError";

// const workspaceExistsFx = attach({
//   source: $viewer,
//   async effect(viewer) {
//     return api.workspaces.workspaceExistsFx({ userId: viewer!.id });
//   },
// });
const workspaceCreateFx = attach({ effect: api.workspaces.workspaceCreateFx });

export const currentRoute = routes.onboarding.workspace;
export const authenticatedRoute = chainAuthenticated(currentRoute, {
  otherwise: routes.auth.signIn.open,
});
// export const workspaceLoadedRoute = chainRoute({
//   route: authenticatedRoute,
//   beforeOpen: { effect: workspaceExistsFx, mapParams: () => ({}) },
// });

export const nameChanged = createEvent<string>();
export const slugChanged = createEvent<string>();
export const descriptionChanged = createEvent<string>();
export const formSubmitted = createEvent();
const onbordingWorkspaceFinished = createEvent();

export const $name = createStore("");
export const $slug = createStore("");
export const $description = createStore("");
export const $formPending = workspaceCreateFx.pending;
export const $onboardingWorkspaceFinish = createStore(false);
export const $formError = createStore<OnboardingWorkspaceError | null>(null);

$name.on(nameChanged, (_, name) => name);
$slug.on(slugChanged, (_, slug) => slug);
$description.on(descriptionChanged, (_, description) => description);

const $isNameValid = $name.map((name) => isNameValid(name));
const $isSlugValid = $slug.map((slug) => isSlugValid(slug));
const $isSlugTaken = $slug.map(() => true);

sample({
  clock: authenticatedRoute.$isOpened,
  filter: onboardingWorkspaceCheckDone.$isSet,
  target: comebackRestore,
});

sample({
  clock: formSubmitted,
  filter: not($isNameValid),
  fn: (): OnboardingWorkspaceError => "NameInvalid",
  target: $formError,
});
sample({
  clock: formSubmitted,
  filter: not($isSlugValid),
  fn: (): OnboardingWorkspaceError => "SlugInvalid",
  target: $formError,
});
sample({
  clock: formSubmitted,
  filter: not($isSlugTaken),
  fn: (): OnboardingWorkspaceError => "SlugTaken",
  target: $formError,
});

sample({
  clock: formSubmitted,
  source: {
    name: $name,
    slug: $slug,
    description: $description,
    viewer: $viewer,
  },
  filter: and($isNameValid, $isSlugValid, $isSlugTaken),
  fn: ({ name, slug, description, viewer }) => ({
    workspace: { name, slug, description, userId: viewer!.id, avatarUrl: null },
  }),
  target: workspaceCreateFx,
});

sample({
  clock: workspaceCreateFx.doneData,
  target: onbordingWorkspaceFinished,
});

sample({
  clock: workspaceCreateFx.doneData,
  fn: () => true,
  target: $onboardingWorkspaceFinish,
});

const delayedOnbordingFinished = delay({
  source: onbordingWorkspaceFinished,
  timeout: 2000,
});

sample({
  clock: delayedOnbordingFinished,
  target: comebackRestore,
});

sample({
  clock: workspaceCreateFx.failData,
  fn: (): OnboardingWorkspaceError => "UnknownError",
  target: $formError,
});

reset({
  clock: currentRoute.closed,
  target: [$name, $slug, $description, $formError, $onboardingWorkspaceFinish],
});

function isNameValid(name: string) {
  return name.length > 2 && name.length < 20;
}
function isSlugValid(slug: string) {
  return slug.length > 2 && slug.length < 15 && /^[A-Za-z0-9]*$/.test(slug);
}
