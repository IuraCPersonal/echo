import * as React from "react";
import { Link } from "react-router-dom";
import { Link as MUILink, TextField } from "@mui/material";

import Auth from "./Auth";
import { useCreateUser } from "../../hooks/useCreateUser";
import { extractErrorMessage } from "../../utils/error";
import { useLogin } from "../../hooks/useLogin";
import { UNKNOWN_ERROR_MESSAGE } from "../../constants/errors";

const Signup: React.FC = () => {
  const [createUser] = useCreateUser();
  const [username, setUsername] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");
  const { login } = useLogin();

  return (
    <Auth
      submitLabel="Signup"
      error={error}
      onSubmit={async ({ email, password }) => {
        try {
          await createUser({
            variables: {
              createUserInput: {
                email,
                username,
                password,
              },
            },
          });

          // Login the user after signup
          await login({ email, password });
          setError("");
        } catch (error) {
          const errorMessage = extractErrorMessage(error);

          if (errorMessage) {
            setError(errorMessage);
            return;
          }

          setError(UNKNOWN_ERROR_MESSAGE);
        }
      }}
      extraFields={[
        <TextField
          type="text"
          label="Username"
          variant="outlined"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          error={!!error}
          helperText={error}
        />,
      ]}
    >
      <Link to="/login" style={{ alignSelf: "center" }}>
        <MUILink>Already have an account? Login!</MUILink>
      </Link>
    </Auth>
  );
};

export default Signup;
