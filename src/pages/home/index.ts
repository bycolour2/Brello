import { createRouteView } from "atomic-router-react";

import {
  authenticatedRoute,
  currentRoute,
  onboardedRoute,
} from "./model/homeModel";
import { HomePage } from "./ui/Page";

const OnboardedView = createRouteView({
  route: onboardedRoute,
  view: HomePage,
});

const AuthenticatedView = createRouteView<unknown, object, object>({
  route: authenticatedRoute,
  view: OnboardedView,
});

const HomeRoute = {
  route: currentRoute,
  view: AuthenticatedView,
};

export default HomeRoute;
