import { chainRoute, redirect } from "atomic-router";
import { attach, createEvent, createStore, sample } from "effector";
import { debug, delay, not, reset } from "patronum";

import { api } from "~/shared/api";
import { profileExistsFx } from "~/shared/api/rest/profiles";
import { routes } from "~/shared/routing";
import { $viewer, chainAuthenticated } from "~/shared/viewer";

export type OnboardingUserError = "InvalidFirstName" | "UnknownError";

const profileExistFx = attach({
  source: $viewer,
  async effect(viewer) {
    return api.profiles.profileExistsFx({ userId: viewer!.id });
  },
});
const profileCreateFx = attach({ effect: api.profiles.profileCreateFx });

export const currentRoute = routes.onboarding.user;

export const authenticatedRoute = chainAuthenticated(currentRoute, {
  otherwise: routes.auth.signIn.open,
});

export const profileLoadRoute = chainRoute({
  route: authenticatedRoute,
  beforeOpen: {
    effect: profileExistFx,
    mapParams: () => ({}),
  },
});

/**
 * 1. Проверка авторизации //*
 * 2. Проверка на существование профиля //*
 *  2.1. Если профиль существует - редирект дальше //*
 *  2.2. Если профиль не существует - показываем форму //*
 * 3. Создание профиля //*
 *  3.1 Пользователь вводит данные в форму //*
 *  3.2 Пропустить форму
 * 4. Попытка отправки формы //*
 * 5. Валидация формы //*
 * 6. Если валидация прошла успешно - отправка формы на сервер //*
 *  6.1. Если на сервере нет ошибки - редирект дальше //*
 *  6.2. Если ошибка есть - показать ошибку
 * 7. Если валидация не прошла - отображение ошибки //*
 */

export const firstNameChanged = createEvent<string>();
export const lastNameChanged = createEvent<string>();
export const formSubmitted = createEvent();
const onbordingFinished = createEvent();
export const skipButtonClicked = createEvent();

export const $firstName = createStore("");
export const $lastName = createStore("");
export const $formPending = profileCreateFx.pending;
export const $onboardUserFinish = createStore(false);
export const $formError = createStore<OnboardingUserError | null>(null);

const $isFirstNameValid = $firstName.map((firstName) =>
  isFirstNameValid(firstName),
);

sample({
  clock: profileExistsFx.doneData,
  filter: (exists) => exists,
  target: routes.home.open,
});

$firstName.on(firstNameChanged, (_, firstName) => firstName);
$formError.reset(firstNameChanged);

$lastName.on(lastNameChanged, (_, lastName) => lastName);

debug({ trace: true }, $formError, profileExistsFx.doneData);

sample({
  clock: formSubmitted,
  filter: not($isFirstNameValid),
  fn: (): OnboardingUserError => "InvalidFirstName",
  target: $formError,
});

sample({
  clock: formSubmitted,
  source: { firstName: $firstName, lastName: $lastName, viewer: $viewer },
  filter: $isFirstNameValid,
  fn: ({ firstName, lastName, viewer }) => ({
    profile: { firstName, lastName, userId: viewer!.id },
  }),
  target: profileCreateFx,
});

sample({
  clock: profileCreateFx.doneData,
  target: onbordingFinished,
});

sample({
  clock: profileCreateFx.doneData,
  fn: () => true,
  target: $onboardUserFinish,
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
  clock: profileCreateFx.failData,
  fn: (): OnboardingUserError => "UnknownError",
  target: $formError,
});

reset({
  clock: currentRoute.closed,
  target: [$firstName, $lastName, $formError, $onboardUserFinish],
});

function isFirstNameValid(firstName: string) {
  return firstName.length > 2 && firstName.length < 20;
}
