alter table "public"."boards" add column "author_id" uuid not null;

alter table "public"."boards" add column "deleted_at" timestamp with time zone;

alter table "public"."boards" add column "visibility" smallint not null;

alter table "public"."boards" add column "workspace_id" uuid not null;

alter table "public"."boards" add constraint "boards_author_id_fkey" FOREIGN KEY (author_id) REFERENCES auth.users(id) not valid;

alter table "public"."boards" validate constraint "boards_author_id_fkey";

alter table "public"."boards" add constraint "boards_workspace_id_fkey" FOREIGN KEY (workspace_id) REFERENCES workspaces(id) not valid;

alter table "public"."boards" validate constraint "boards_workspace_id_fkey";

create policy "Enable insert for authenticated users only"
on "public"."boards"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for authenticated author"
on "public"."boards"
as permissive
for select
to authenticated
using ((auth.uid() = author_id));


create policy "Enable update for authenticated author"
on "public"."boards"
as permissive
for update
to authenticated
using ((auth.uid() = author_id))
with check ((auth.uid() = author_id));



