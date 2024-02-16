import { createRouteView } from "atomic-router-react";

import { anonymousRoute, currentRoute } from "./model/loginModel";
import { AuthnPageLoader, SignInPage } from "./ui/Page";

const PageLoaderView = createRouteView({
  route: anonymousRoute,
  view: SignInPage,
  otherwise: AuthnPageLoader,
});

const AuthSignInRoute = {
  view: PageLoaderView,
  route: currentRoute,
};

export default AuthSignInRoute;
