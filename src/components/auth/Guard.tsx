import * as React from "react";
import { useGetMe } from "../../hooks/useGetMe";
import { excludedRoutes } from "../../constants/routes";

interface GuardProps {
  children: JSX.Element;
}

const Guard: React.FC<GuardProps> = ({ children }) => {
  const { data: user } = useGetMe();

  return (
    <>
      {excludedRoutes.includes(window.location.pathname)
        ? children
        : !!user && children}
    </>
  );
};

export default Guard;
