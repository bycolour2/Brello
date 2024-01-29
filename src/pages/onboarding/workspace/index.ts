import { createRouteView } from "atomic-router-react";

import {
  authenticatedRoute,
  currentRoute,
} from "./model/onboardingWorkspaceModel";
import { OnboardingWorkspacePage, PageLoader } from "./ui/Page";

const AuthenticationView = createRouteView<unknown, object, object>({
  route: authenticatedRoute,
  view: OnboardingWorkspacePage,
  otherwise: PageLoader,
});

const OnboardingRoute = {
  view: AuthenticationView,
  route: currentRoute,
};

export default OnboardingRoute;
