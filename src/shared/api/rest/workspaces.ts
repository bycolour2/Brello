import { PostgrestError } from "@supabase/supabase-js";
import { createEffect } from "effector";

import { client } from "../client";
import { checkError, UserId } from "./common";
import { uploadAvatar } from "./storage";

export interface Workspace {
  id: string;
  userId: UserId;
  name: string;
  slug: string | null;
  description: string | null;
  avatarUrl: string | null;
}

export const workspaceExistsFx = createEffect<
  { userId: UserId },
  boolean,
  PostgrestError
>(async ({ userId }) => {
  const { data: workspaces, error } = await client
    .from("workspaces")
    .select()
    .eq("user_id", userId);

  checkError(error);

  if (workspaces === null || workspaces.length === 0) {
    return false;
  }

  return true;
});

export const workspaceCreateFx = createEffect<
  { workspace: Omit<Workspace, "id"> },
  void,
  PostgrestError
>(async ({ workspace }) => {
  const { userId, name, slug, description } = workspace;
  const { error } = await client.from("workspaces").insert({
    user_id: userId,
    name,
    slug,
    description,
  });

  checkError(error);
});

export const workspaceGetFx = createEffect<
  { workspaceId: string },
  Workspace | null,
  PostgrestError
>(async ({ workspaceId }) => {
  const { data, error } = await client
    .from("workspaces")
    .select()
    .eq("id", workspaceId);

  checkError(error);

  if (data === null) {
    return null;
  }

  const { id, name, user_id, slug, description, avatar_url } = data[0];

  return {
    id,
    userId: user_id,
    name,
    slug,
    description,
    avatarUrl: avatar_url,
  };
});

export const workspaceUpdateFx = createEffect<
  { workspace: Workspace },
  void,
  PostgrestError
>(async ({ workspace }) => {
  const { id, userId, name, slug, description, avatarUrl } = workspace;
  const { error } = await client
    .from("workspaces")
    .update({
      user_id: userId,
      name,
      slug,
      description,
      avatar_url: avatarUrl,
    })
    .eq("id", id)
    .eq("user_id", userId);

  checkError(error);
});

export const workspaceUploadAvatarFx = createEffect<
  {
    workspaceId: string;
    file: File;
  },
  string,
  PostgrestError
>(async ({ workspaceId, file }) => {
  const upload = uploadAvatar({
    filePath: `workspaces/${workspaceId}`,
    fileOptions: {
      upsert: true,
      contentType: "image/*",
    },
  });
  const avatarUrl = await upload({ file });

  const { error } = await client
    .from("workspaces")
    .update({ avatar_url: avatarUrl })
    .eq("id", workspaceId);

  checkError(error);

  return avatarUrl;
});
