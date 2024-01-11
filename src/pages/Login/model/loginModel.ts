import { createStore, createEvent } from "effector";

export const emailChanged = createEvent<string>();

export const $email = createStore("");

$email.on(emailChanged, (_, email) => email);

console.log("sid of $email", $email.sid);
