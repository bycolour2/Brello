import { createRouteView } from "atomic-router-react";

import { anonymousRoute, currentRoute } from "./model/loginModel";
import { PageLoader, SignInPage } from "./ui/Page";

const PageLoaderView = createRouteView({
  route: anonymousRoute,
  view: SignInPage,
  otherwise: PageLoader,
});

const AuthSignInRoute = {
  view: PageLoaderView,
  route: currentRoute,
};

export default AuthSignInRoute;
