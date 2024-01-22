import { createRouteView } from "atomic-router-react";

import { authenticatedRoute, currentRoute } from "./model/homeModel";
import { HomePage } from "./ui/Page";

const AuthenticatedView = createRouteView({
  route: authenticatedRoute,
  view: HomePage,
});

const HomeRoute = {
  view: AuthenticatedView,
  route: currentRoute,
};

export default HomeRoute;
