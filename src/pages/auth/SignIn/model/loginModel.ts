import { attach, createEvent, createStore, sample } from "effector";
import { debug, not, reset } from "patronum";
import { api } from "~/shared/api";
import { routes } from "~/shared/routing";

export type SignInError = "InvalidEmail" | "UnknownError" | "RateLimit";

export const currentRoute = routes.auth.signIn;

const signInFx = attach({ effect: api.auth.signInWithEmailFx });

export const emailChanged = createEvent<string>();
export const formSubmited = createEvent();
export const backToLoginPressed = createEvent();

export const $email = createStore("");
export const $emailError = createStore<SignInError | null>(null);
export const $formPending = signInFx.pending;
export const $formSended = createStore(false);
export const $formError = createStore<SignInError | null>(null);

const $isEmailValid = $email.map((email) => isEmailValid(email));

$email.on(emailChanged, (_, email) => email);

debug({ trace: true }, signInFx);

sample({
  clock: formSubmited,
  source: { email: $email },
  filter: $isEmailValid,
  target: [signInFx, $emailError.reinit],
});

$formSended.on(signInFx.finally, () => true);

sample({
  clock: formSubmited,
  filter: not($isEmailValid),
  fn: (): SignInError => "InvalidEmail",
  target: $emailError,
});

$formError.on(signInFx.failData, (_, error) => {
  if (error.status === 429) return "RateLimit";
  return "UnknownError";
});

reset({
  clock: backToLoginPressed,
  target: [$formSended, $email, $emailError, $formError],
});

function isEmailValid(email: string) {
  return email.length > 5 && email.indexOf("@") > 0 && email.includes(".");
}
