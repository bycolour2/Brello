import { createRouteView } from "atomic-router-react";

import { LayoutBase } from "~/layouts/base";

import {
  authenticatedRoute,
  currentRoute,
  workspaceRoute,
} from "./model/workspaceSettingsModel";
import { WorkspaceSettingsPage } from "./ui/Page";

const WorkspaceLoadedView = createRouteView<unknown, object, object>({
  route: workspaceRoute,
  view: WorkspaceSettingsPage,
});

const AuthenticatedView = createRouteView<unknown, object, object>({
  route: authenticatedRoute,
  view: WorkspaceLoadedView,
});

const WorkspaceSettings = {
  route: currentRoute,
  view: AuthenticatedView,
  layout: LayoutBase,
};

export default WorkspaceSettings;
