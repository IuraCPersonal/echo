import { router } from "../components/router/Routes";
import client from "../constants/apollo-client";

export const onLogout = () => {
  router.navigate("/login");
  client.resetStore();
};
