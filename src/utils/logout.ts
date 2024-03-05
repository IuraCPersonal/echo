import { router } from "../components/router/Routes";
import client from "../constants/apollo-client";
import { authenticatedVar } from "../constants/authenticated";
import { removeToken } from "./token";

export const onLogout = () => {
  authenticatedVar(false);
  removeToken();
  router.navigate("/login");
  client.resetStore();
  client.onResetStore(() => new Promise(() => {}));
};
