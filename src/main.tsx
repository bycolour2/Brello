import { RouterProvider } from "atomic-router-react";
import { allSettled, fork } from "effector";
import { Provider } from "effector-react";
import ReactDOM from "react-dom/client";
import { App } from "~/app";
import { router } from "~/shared/routing";

import "./main.css";
import { appStarted } from "./shared/init";

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
