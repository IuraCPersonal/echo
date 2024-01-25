import * as React from "react";
import { Link } from "react-router-dom";
import { Link as MUILink } from "@mui/material";

import Auth from "./Auth";

const Login: React.FC = () => {
  return (
    <Auth submitLabel="Login" onSubmit={async () => {}}>
      <Link to="/signup" style={{ alignSelf: "center" }}>
        <MUILink>Don't have an account? Sign up!</MUILink>
      </Link>
    </Auth>
  );
};

export default Login;
