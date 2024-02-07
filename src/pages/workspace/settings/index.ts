import { createRouteView } from "atomic-router-react";

import { LayoutBase } from "~/layouts/base";

import {
  authenticatedRoute,
  currentRoute,
  workspaceRoute,
} from "./model/workspaceSettingsModel";
import { WorkspaceSettingsPage } from "./ui/Page";

const WorkspaceSettingsView = createRouteView<unknown, object, object>({
  route: workspaceRoute,
  view: WorkspaceSettingsPage,
});

const AuthenticatedView = createRouteView<unknown, object, object>({
  route: authenticatedRoute,
  view: WorkspaceSettingsView,
});

const WorkspaceSettings = {
  route: currentRoute,
  view: AuthenticatedView,
  layout: LayoutBase,
};

export default WorkspaceSettings;
