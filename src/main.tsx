import ReactDOM from "react-dom/client";
import { RouterProvider } from "atomic-router-react";
import { allSettled, fork } from "effector";
import { Provider } from "effector-react";

import { App } from "~/app";

import { router } from "~/shared/routing";

import { appStarted } from "./shared/init";

import "./main.css";

const scope = fork();

allSettled(appStarted, { scope }).catch(() =>
  console.warn("Failed to start the app"),
);

const root = document.getElementById("root")!;

ReactDOM.createRoot(root).render(
  <Provider value={scope}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </Provider>,
);
