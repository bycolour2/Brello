import ReactDOM from "react-dom/client";
import { Provider } from "effector-react";
import { allSettled, fork } from "effector";
import { RouterProvider } from "atomic-router-react";

import "./main.css";

import { appStarted } from "./shared/init";
import { App } from "~/app";
import { router } from "~/shared/routing";

const scope = fork();

allSettled(appStarted, { scope }).catch(() =>
  console.warn("Failed to start the app")
);

const root = document.getElementById("root")!;

ReactDOM.createRoot(root).render(
  <Provider value={scope}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </Provider>
);
