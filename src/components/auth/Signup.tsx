import * as React from "react";
import { Link } from "react-router-dom";
import { Link as MUILink } from "@mui/material";

import Auth from "./Auth";
import { useCreateUser } from "../../hooks/useCreateUser";

const Signup: React.FC = () => {
  const [createUser] = useCreateUser();

  return (
    <Auth
      submitLabel="Signup"
      onSubmit={async ({ email, password }) => {
        await createUser({
          variables: {
            createUserInput: {
              email,
              password,
            },
          },
        });
      }}
    >
      <Link to="/login" style={{ alignSelf: "center" }}>
        <MUILink>Already have an account? Login!</MUILink>
      </Link>
    </Auth>
  );
};

export default Signup;
