import {
  createStore,
  createEvent,
  sample,
  createEffect,
  attach,
} from "effector";
import { debug, not, reset } from "patronum";

export type SignInError = "InvalidEmail" | "UnknownError" | "RateLimit";

export const emailChanged = createEvent<string>();
export const formSubmited = createEvent();
export const backToLoginPressed = createEvent();

const globalSignInFx = createEffect<
  { email: string },
  string,
  { status: number; message: string }
>(async () => {
  console.log("fx fired");
  // if(Math.random() * 100 > 70) return await new Promise((resolve, reject) => re)
  return await new Promise((resolve, reject) =>
    setTimeout(
      () => (Math.random() * 100 > 50 ? reject("Error") : resolve("Success")),
      500
    )
  );
});

const signInFx = attach({ effect: globalSignInFx });

export const $email = createStore("");
export const $emailError = createStore<SignInError | null>(null);
export const $formPending = signInFx.pending;
export const $formSended = createStore(false);
export const $formError = createStore<SignInError | null>(null);

const $isEmailValid = $email.map((email) => isEmailValid(email));

$email.on(emailChanged, (_, email) => email);

debug({ trace: true }, signInFx, $formError);

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