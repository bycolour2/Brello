import { PostgrestError } from "@supabase/supabase-js";
import { createEffect } from "effector";

import { client } from "../client";
import { checkError } from "./common";

export enum Visibility {
  "private",
  "public",
}

interface Board {
  id: Uuid;
  workspaceId: Uuid;
  authorId: Uuid;
  name: string;
  color?: string | null;
  backgroundUrl?: string | null;
  deletedAt?: string | null;
  createdAt: string;
  visibility: Visibility;
}

export const boardCreateFx = createEffect<
  Omit<Board, "id" | "deletedAt">,
  void,
  PostgrestError
>(
  async ({
    authorId,
    name,
    visibility,
    workspaceId,
    backgroundUrl = null,
    color = null,
  }) => {
    await client
      .from("boards")
      .insert({
        workspace_id: workspaceId,
        author_id: authorId,
        name,
        visibility,
        background_url: backgroundUrl,
        color,
      })
      .throwOnError();

    return;
  },
);

export const boardsActiveListFx = createEffect<
  Pick<Board, "workspaceId">,
  Omit<Board, "deletedAt">[],
  PostgrestError
>(async ({ workspaceId }) => {
  const { data } = await client
    .from("boards")
    .select()
    .eq("workspace_id", workspaceId)
    .is("deleted_at", null)
    .throwOnError();

  return (
    data?.map(
      ({
        id,
        workspace_id,
        author_id,
        name,
        color,
        background_url,
        visibility,
        created_at,
      }) => ({
        id,
        workspaceId: workspace_id,
        authorId: author_id,
        name,
        color,
        backgroundUrl: background_url,
        visibility,
        createdAt: created_at,
      }),
    ) ?? []
  );
});

export const boardDeleteFx = createEffect<{ id: Uuid }, void, PostgrestError>(
  async ({ id }) => {
    await client
      .from("boards")
      .update({
        deleted_at: new Date().toISOString(),
      })
      .eq("id", id)
      .throwOnError();

    return;
  },
);

export const boardUpdateFx = createEffect<
  Pick<Board, "id"> &
    Partial<Pick<Board, "name" | "backgroundUrl" | "visibility">>,
  void,
  PostgrestError
>(async ({ id, backgroundUrl, name, visibility }) => {
  await client
    .from("boards")
    .update({ background_url: backgroundUrl, name, visibility })
    .eq("id", id)
    .throwOnError();
  return;
});

interface RandomPhoto {
  full: string;
  thumb: string;
  alt: string;
}

export const boardGetRandomPhotosFx = createEffect<
  { count: string },
  RandomPhoto[] | null
>(async ({ count }) => {
  const { data, error } = await client.functions.invoke<RandomPhoto[]>(
    "unsplash-random-photo",
    {
      method: "POST",
      body: { count, orientation: "landscape" },
    },
  );

  checkError(error);

  return data;
});
