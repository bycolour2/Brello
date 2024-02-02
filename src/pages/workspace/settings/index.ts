import { createRouteView } from "atomic-router-react";

import {
  authenticatedRoute,
  currentRoute,
} from "./model/workspaceSettingsModel";
import { WorkspaceSettingsPage } from "./ui/Page";

const AuthenticatedView = createRouteView<unknown, object, object>({
  route: authenticatedRoute,
  view: WorkspaceSettingsPage,
});

const WorkspaceSettings = {
  route: currentRoute,
  view: AuthenticatedView,
};

export default WorkspaceSettings;
