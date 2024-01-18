import { currentRoute } from "./model/loginModel";

import { SignInPage } from "./ui/Page";

const AuthSignInRoute = {
  view: SignInPage,
  route: currentRoute,
};

export default AuthSignInRoute;
