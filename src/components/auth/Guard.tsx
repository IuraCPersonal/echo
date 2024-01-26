import * as React from "react";
import { useGetMe } from "../../hooks/useGetMe";
import { excludedRoutes } from "../../constants/routes";
import { authenticatedVar } from "../../constants/authenticated";
import { snackVar } from "../../constants/snack";
import { UNKNOWN_ERROR_SNACK_MESSAGE } from "../../constants/errors";
import { usePath } from "../../hooks/usePath";

interface GuardProps {
  children: JSX.Element;
}

const Guard: React.FC<GuardProps> = ({ children }) => {
  const { data: user, error } = useGetMe();
  const { path } = usePath();

  React.useEffect(() => {
    if (user) {
      authenticatedVar(true);
    }
  }, [user]);

  React.useEffect(() => {
    if (error?.networkError) {
      snackVar(UNKNOWN_ERROR_SNACK_MESSAGE);
    }
  }, [error]);

  return <>{excludedRoutes.includes(path) ? children : !!user && children}</>;
};

export default Guard;
