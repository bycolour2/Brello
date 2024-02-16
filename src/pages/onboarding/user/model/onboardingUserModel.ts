import { attach, createEvent, createStore, sample } from "effector";
import { delay, not, pending, reset } from "patronum";

import {
  onboardingProfileCheckDone,
  onboardingProfileSkip,
} from "~/features/onboarding";

import { api } from "~/shared/api";
import { comebackRestore, routes } from "~/shared/routing";
import { $viewer, chainAuthenticated } from "~/shared/viewer";

export type OnboardingUserError = "InvalidFirstName" | "UnknownError";

const profileCreateFx = attach({ effect: api.profiles.profileCreateFx });

export const currentRoute = routes.onboarding.user;

export const authenticatedRoute = chainAuthenticated(currentRoute, {
  otherwise: routes.auth.signIn.open,
});

/**
 * 1. Проверка авторизации //*
 * 2. Проверка на существование профиля //*
 *  2.1. Если профиль существует - редирект дальше //*
 *  2.2. Если профиль не существует - показываем форму //*
 * 3. Создание профиля //*
 *  3.1 Пользователь вводит данные в форму //*
 *  3.2 Пропустить форму //*
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
const onbordingUserFinished = createEvent();
export const skipButtonClicked = createEvent();

export const $firstName = createStore("");
export const $lastName = createStore("");
export const $onboardUserFinish = createStore(false);
export const $error = createStore<OnboardingUserError | null>(null);

export const $pending = pending([profileCreateFx]);

const $isFirstNameValid = $firstName.map((firstName) =>
  isFirstNameValid(firstName),
);

sample({
  clock: authenticatedRoute.$isOpened,
  filter: onboardingProfileCheckDone.$isSet,
  target: comebackRestore,
});

sample({
  clock: skipButtonClicked,
  target: onboardingProfileSkip.enable,
});

$firstName.on(firstNameChanged, (_, firstName) => firstName);
$error.reset(firstNameChanged);

$lastName.on(lastNameChanged, (_, lastName) => lastName);

sample({
  clock: formSubmitted,
  filter: not($isFirstNameValid),
  fn: (): OnboardingUserError => "InvalidFirstName",
  target: $error,
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
  target: onbordingUserFinished,
});

sample({
  clock: profileCreateFx.doneData,
  fn: () => true,
  target: $onboardUserFinish,
});

const delayedOnbordingFinished = delay(onbordingUserFinished, 2000);

sample({
  clock: delayedOnbordingFinished,
  target: comebackRestore,
});

sample({
  clock: profileCreateFx.failData,
  fn: (): OnboardingUserError => "UnknownError",
  target: $error,
});

reset({
  clock: currentRoute.closed,
  target: [$firstName, $lastName, $error, $onboardUserFinish],
});

function isFirstNameValid(firstName: string) {
  return firstName.length > 2 && firstName.length < 20;
}
