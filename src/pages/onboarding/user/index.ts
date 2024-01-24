import { createRouteView } from "atomic-router-react";

import {
  authenticatedRoute,
  currentRoute,
  profileLoadRoute,
} from "./model/onboardingModel";
import { OnboardingUserPage, PageLoader } from "./ui/Page";

const ProfileLoadView = createRouteView({
  route: profileLoadRoute,
  view: OnboardingUserPage,
  otherwise: PageLoader,
});

const AuthenticationView = createRouteView<unknown, object, object>({
  route: authenticatedRoute,
  view: ProfileLoadView,
  otherwise: PageLoader,
});

const OnboardingRoute = {
  view: AuthenticationView,
  route: currentRoute,
};

export default OnboardingRoute;
