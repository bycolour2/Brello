import { createRouteView } from "atomic-router-react";

import {
  authenticatedRoute,
  currentRoute,
  // profileLoadRoute,
} from "./model/onboardingUserModel";
import { OnboardingUserPage, PageLoader } from "./ui/Page";

// const ProfileLoadView = createRouteView({
//   route: profileLoadRoute,
//   view: OnboardingUserPage,
//   otherwise: PageLoader,
// });

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
