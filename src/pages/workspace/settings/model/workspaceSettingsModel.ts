import { chainRoute } from "atomic-router";
import {
  attach,
  combine,
  createEffect,
  createEvent,
  createStore,
  sample,
} from "effector";
import { debug, not, pending, spread } from "patronum";

import { api, Workspace } from "~/shared/api";
import { readFileAsDataURL } from "~/shared/lib/file-upload";
import { comebackNavigate, routes } from "~/shared/routing";
import { chainAuthenticated } from "~/shared/viewer";

export type WorkspaceSettingsError =
  | "EmptyName"
  | "SlugTaken"
  | "NotFound"
  | "InvalidFile"
  | "UnknownError";

export const avatarFileSelected = createEvent<File>();
export const nameChanged = createEvent<string>();
export const slugChanged = createEvent<string>();
export const slugBlured = createEvent();
export const descriptionChanged = createEvent<string>();
export const formSubmitted = createEvent();

const formValidated = createEvent();
const avatarShouldBeUploaded = createEvent<File>();
const avatarProcessingFinished = createEvent();

const workspaceGetFx = attach({ effect: api.workspaces.workspaceGetFx });
const workspaceUpdateFx = attach({ effect: api.workspaces.workspaceUpdateFx });
const workspaceUploadAvatarFx = attach({
  effect: api.workspaces.workspaceUploadAvatarFx,
});

export const currentRoute = routes.workspaces.settings;
export const authenticatedRoute = chainAuthenticated(currentRoute, {
  otherwise: comebackNavigate(routes.auth.signIn),
});
export const workspaceRoute = chainRoute({
  route: authenticatedRoute,
  beforeOpen: {
    effect: workspaceGetFx,
    mapParams: ({ params }) => ({ workspaceId: params.workspaceId }),
  },
});

const previewUrlCreateFx = createEffect(async (file: File) => {
  return readFileAsDataURL(file).then((dataUrl) => dataUrl.toString());
});

const $workspace = createStore<Workspace | null>(null);
const $slugCustom = createStore("");
export const $name = createStore("");
export const $description = createStore("");

debug($workspace);

export const $avatarFile = createStore<File | null>(null);
export const $avatarUrl = createStore<string | null>(null);

export const $error = createStore<WorkspaceSettingsError | null>(null);

export const $pending = pending({
  effects: [
    previewUrlCreateFx,
    workspaceUploadAvatarFx,
    workspaceUpdateFx,
    workspaceGetFx,
  ],
});

const $slugGenerated = $name.map((name) => slugify(name, { lower: true }));

export const $slug = combine(
  $slugCustom,
  $slugGenerated,
  (custom, generated) => (custom.trim() === "" ? generated : custom),
);

debug(formSubmitted);

const $nameValid = $name.map((name) => name.trim().length > 2);

const $form = combine({
  avatarUrl: $avatarUrl,
  name: $name,
  slug: $slug,
  description: $description,
});

sample({
  clock: workspaceGetFx.doneData,
  filter: Boolean,
  target: [$error.reinit, $workspace],
});

spread({
  source: $workspace,
  targets: {
    name: $name,
    slug: $slugCustom,
    description: $description,
    avatarUrl: $avatarUrl,
  },
});

sample({
  clock: workspaceGetFx.doneData,
  filter: (workspce) => !workspce,
  fn: (): WorkspaceSettingsError => "NotFound",
  target: $error,
});

sample({
  clock: workspaceGetFx.failData,
  fn: (error): WorkspaceSettingsError => {
    if (error.code === "PGRST116") return "NotFound";
    return "UnknownError";
  },
  target: $error,
});

sample({
  clock: avatarFileSelected,
  target: [previewUrlCreateFx, $avatarFile, $error.reinit],
});

sample({
  clock: previewUrlCreateFx.doneData,
  target: [$avatarUrl, $error.reinit],
});

sample({
  clock: previewUrlCreateFx.failData,
  fn: (): WorkspaceSettingsError => "InvalidFile",
  target: $error,
});

$name.on(nameChanged, (_, name) => name);
$description.on(descriptionChanged, (_, description) => description);

$slugCustom.on(slugChanged, (_, slug) => slug);

sample({
  clock: slugBlured,
  source: $slugCustom,
  filter: (slug) => slug.trim().length > 0,
  fn: (slug) => slugify(slug, { lower: true, strict: true }),
  target: $slugCustom,
});

sample({
  clock: formSubmitted,
  filter: $nameValid,
  target: formValidated,
});

sample({
  clock: formSubmitted,
  filter: not($nameValid),
  fn: (): WorkspaceSettingsError => "EmptyName",
  target: $error,
});

sample({
  clock: formValidated,
  source: $avatarFile,
  filter: Boolean,
  target: avatarShouldBeUploaded,
});

sample({
  clock: avatarShouldBeUploaded,
  source: $workspace,
  filter: Boolean,
  fn: (workspace, file) => ({ workspaceId: workspace.id, file }),
  target: [workspaceUploadAvatarFx, $error.reinit],
});

sample({
  clock: workspaceUploadAvatarFx.doneData,
  target: [
    $avatarUrl,
    $avatarFile.reinit,
    $error.reinit,
    avatarProcessingFinished,
  ],
});

sample({
  clock: workspaceUploadAvatarFx.failData,
  fn: (): WorkspaceSettingsError => "InvalidFile",
  target: $error,
});

sample({
  clock: formValidated,
  filter: not($avatarFile),
  target: avatarProcessingFinished,
});

sample({
  clock: avatarProcessingFinished,
  source: { workspace: $workspace, form: $form },
  fn: ({ workspace, form }) => ({ workspace: { ...workspace!, ...form } }),
  target: workspaceUpdateFx,
});

sample({
  clock: workspaceUpdateFx.doneData,
  source: $workspace,
  filter: currentRoute.$isOpened,
  fn: (workspace) => ({ workspaceId: workspace!.id }),
  target: routes.workspaces.view.boards.open,
});

$error.on(workspaceUpdateFx.failData, (_, error) => {
  if (error.code === "23505") return "SlugTaken";
  return "UnknownError";
});

interface SlugifyOptions {
  lower?: boolean;
  strict?: boolean;
}

function slugify(value: string, options?: SlugifyOptions) {
  if (options && options.lower) value = value.toLowerCase();
  return value.trim().replace(/ /g, "-");
}
