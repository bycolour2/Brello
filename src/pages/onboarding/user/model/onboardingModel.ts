import { chainRoute } from "atomic-router";
import { attach } from "effector";
import { debug } from "patronum";

import { api } from "~/shared/api";
import { routes } from "~/shared/routing";
import { $viewer, chainAuthenticated } from "~/shared/viewer";

const profileExistFx = attach({
  source: $viewer,
  async effect(viewer) {
    return api.profiles.profileExistsFx({ userId: viewer!.id });
  },
});
// const profileCreateFx = attach({ effect: api.profiles.profileCreateFx });

export const currentRoute = routes.onboarding.user;

export const authenticatedRoute = chainAuthenticated(currentRoute, {
  otherwise: routes.auth.signIn.open,
});

debug(authenticatedRoute.$isOpened);

export const profileLoadRoute = chainRoute({
  route: authenticatedRoute,
  beforeOpen: {
    effect: profileExistFx,
    mapParams: () => ({}),
  },
});
