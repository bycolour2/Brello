import { currentRoute } from "./model/homeModel";
import { HomePage } from "./ui/Page";

const HomeRoute = {
  view: HomePage,
  route: currentRoute,
};

export default HomeRoute;
