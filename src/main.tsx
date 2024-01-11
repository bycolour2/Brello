import ReactDOM from "react-dom/client";
import { Provider } from "effector-react";
import { allSettled, fork } from "effector";

import "./main.css";

import { appStarted } from "./shared/init";
import { App } from "~/app";

const scope = fork();

allSettled(appStarted, { scope }).catch(() =>
  console.warn("Failed to start the app")
);

const root = document.getElementById("root")!;

ReactDOM.createRoot(root).render(
  <Provider value={scope}>
    <App />
  </Provider>
);
