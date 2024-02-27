import { router } from "../components/router/Routes";
import client from "../constants/apollo-client";
import { authenticatedVar } from "../constants/authenticated";

export const onLogout = () => {
  authenticatedVar(false);
  router.navigate("/login");
  client.resetStore();
  client.onResetStore(() => new Promise(() => {}));
};
