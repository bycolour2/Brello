import { redirect } from "atomic-router";
import { createEvent, sample } from "effector";
import { debug } from "patronum";

import { controls, pageNotFoundRoute, routes } from "~/shared/routing";

export const currentRoute = pageNotFoundRoute;

export const goBackButtonClicked = createEvent();
export const takeMeHomeButtonClicked = createEvent();

debug(goBackButtonClicked, takeMeHomeButtonClicked);

sample({
  clock: goBackButtonClicked,
  target: controls.back,
});

redirect({
  clock: takeMeHomeButtonClicked,
  route: routes.home,
});
