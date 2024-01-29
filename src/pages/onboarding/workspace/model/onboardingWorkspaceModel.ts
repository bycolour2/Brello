import { chainRoute, redirect } from "atomic-router";
import { debug } from "console";
import { attach, createEvent, createStore, sample } from "effector";
import { and, delay, not, reset } from "patronum";

import { api } from "~/shared/api";
import { routes } from "~/shared/routing";
import { $viewer, chainAuthenticated } from "~/shared/viewer";

export type OnboardingWorkspaceError =
  | "NameInvalid"
  | "SlugInvalid"
  | "SlugTaken"
  | "UnknownError";

const workspaceExistFx = attach({
  source: $viewer,
  async effect(viewer) {
    return api.workspaces.workspaceExistsFx({ userId: viewer!.id });
  },
});
const workspaceCreateFx = attach({ effect: api.workspaces.workspaceCreateFx });

export const currentRoute = routes.onboarding.workspace;
export const authenticatedRoute = chainAuthenticated(currentRoute, {
  otherwise: routes.auth.signIn.open,
});
export const workspaceLoadedRoute = chainRoute({
  route: authenticatedRoute,
  beforeOpen: { effect: workspaceExistFx, mapParams: () => ({}) },
});

export const nameChanged = createEvent<string>();
export const slugChanged = createEvent<string>();
export const descriptionChanged = createEvent<string>();
export const formSubmitted = createEvent();
const onbordingFinished = createEvent();

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
const $isSlugTaken = $slug.map(() => false);

sample({
  clock: workspaceExistFx.doneData,
  filter: (exists) => exists,
  target: routes.home.open,
});

debug({ trace: true }, $formError, workspaceExistFx.doneData);

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
  target: onbordingFinished,
});

sample({
  clock: workspaceCreateFx.doneData,
  fn: () => true,
  target: $onboardingWorkspaceFinish,
});

const delayedOnbordingFinished = delay({
  source: onbordingFinished,
  timeout: 2000,
});

redirect({
  clock: delayedOnbordingFinished,
  route: routes.home,
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
