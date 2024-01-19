import { currentRoute } from "./model/error404model";
import { Error404Page } from "./ui/Page";

const Error404Route = {
  view: Error404Page,
  route: currentRoute,
};

export default Error404Route;
