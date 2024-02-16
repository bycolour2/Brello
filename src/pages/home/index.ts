import { createRouteView } from "atomic-router-react";

import { PageLoader } from "~/shared/ui";

import {
  authenticatedRoute,
  currentRoute,
  onboardedRoute,
} from "./model/homeModel";
import { HomePage } from "./ui/Page";

const OnboardedView = createRouteView({
  route: onboardedRoute,
  view: HomePage,
  otherwise: PageLoader,
});

const AuthenticatedView = createRouteView<unknown, object, object>({
  route: authenticatedRoute,
  view: OnboardedView,
  otherwise: PageLoader,
});

const HomeRoute = {
  route: currentRoute,
  view: AuthenticatedView,
};

export default HomeRoute;
