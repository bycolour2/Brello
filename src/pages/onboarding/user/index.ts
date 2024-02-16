import { createRouteView } from "atomic-router-react";

import { PageLoader } from "~/shared/ui";

import { authenticatedRoute, currentRoute } from "./model/onboardingUserModel";
import { OnboardingUserPage } from "./ui/Page";

const AuthenticationView = createRouteView<unknown, object, object>({
  route: authenticatedRoute,
  view: OnboardingUserPage,
  otherwise: PageLoader,
});

const OnboardingRoute = {
  route: currentRoute,
  view: AuthenticationView,
};

export default OnboardingRoute;
