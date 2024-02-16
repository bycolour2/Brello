import { createRouteView } from "atomic-router-react";

import { LayoutBase } from "~/layouts/base";

import { PageLoader } from "~/shared/ui";

import {
  authenticatedRoute,
  currentRoute,
  workspaceRoute,
} from "./model/workspaceSettingsModel";
import { WorkspaceSettingsPage } from "./ui/Page";

const WorkspaceLoadedView = createRouteView<unknown, object, object>({
  route: workspaceRoute,
  view: WorkspaceSettingsPage,
  otherwise: PageLoader,
});

const AuthenticatedView = createRouteView<unknown, object, object>({
  route: authenticatedRoute,
  view: WorkspaceLoadedView,
  otherwise: PageLoader,
});

const WorkspaceSettings = {
  route: currentRoute,
  view: AuthenticatedView,
  layout: LayoutBase,
};

export default WorkspaceSettings;
