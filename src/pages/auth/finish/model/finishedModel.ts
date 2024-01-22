import { attach, createEvent, createStore, sample } from "effector";
import { delay } from "patronum";

import { api } from "~/shared/api";
import { routes } from "~/shared/routing";

export const currentRoute = routes.auth.finish;

const getMeFx = attach({ effect: api.auth.getMeFx });

export const tryAgainClicked = createEvent();
const authFinished = createEvent();
const authFailed = createEvent();

export const $pending = getMeFx.pending;
export const $successfully = createStore(false);

/**
 * 1. current route opened -> getMeFx //*
 * 2. pending //*
 * 3.1. getMeFx.done User -> successfully true //*
 *  4. after delay redirect to home page //*
 * 3.2. getMeFx.done null -> successfully false //*
 * 3.3. getMeFx.fail -> successfully false //*
 * 3.4. try again clicked -> redirect to sign in page //*
 *  4. current route closed -> reset stores //*
 */

sample({
  clock: currentRoute.opened,
  target: getMeFx,
});

sample({
  clock: getMeFx.doneData,
  filter: Boolean,
  target: authFinished,
});

$successfully.on(authFinished, () => true);

delay({
  source: authFinished,
  timeout: 1500,
  target: routes.home.open,
});

sample({
  clock: getMeFx.doneData,
  filter: (user) => !user,
  target: authFailed,
});

sample({
  clock: getMeFx.fail,
  target: authFailed,
});

$successfully.on(authFailed, () => false);

sample({
  clock: tryAgainClicked,
  target: routes.auth.signIn.open,
});
