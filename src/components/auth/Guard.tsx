import * as React from "react";
import { useGetMe } from "../../hooks/useGetMe";
import { excludedRoutes } from "../../constants/routes";
import { authenticatedVar } from "../../constants/authenticated";

interface GuardProps {
  children: JSX.Element;
}

const Guard: React.FC<GuardProps> = ({ children }) => {
  const { data: user } = useGetMe();

  React.useEffect(() => {
    if (user) {
      authenticatedVar(true);
    }
  }, [user]);

  return (
    <>
      {excludedRoutes.includes(window.location.pathname)
        ? children
        : !!user && children}
    </>
  );
};

export default Guard;
