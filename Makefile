install:
	pnpm install

start:
	pnpm dev

supabase.init:
	pnpm supabase init

supabase.login:
	pnpm supabase login

supabase.link:
	pnpm supabase link --project-ref $(project)

supabase.start:
	pnpm supabase start

supabase.start.db-only:
	pnpm supabase db start

supabase.stop:
	pnpm supabase stop

supabase.migrations.pull:
	pnpm supabase db pull

supabase.migrations.push:
	pnpm supabase db push

supabase.migrations.diff.local:
	pnpm supabase db diff -f $(name) --local

supabase.generate.types:
	pnpm supabase gen types typescript --local > ./src/shared/api/database.types.ts

supabase.functions.serve:
	pnpm supabase functions serve --env-file ./supabase/.env.local

supabase.secrets.push:
	pnpm supabase secrets set --env-file ./supabase/.env.local --project-ref $(project)
