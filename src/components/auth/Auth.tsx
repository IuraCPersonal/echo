import { Button, Stack, TextField } from "@mui/material";
import * as React from "react";

interface AuthProps {
  submitLabel: string;
  onSubmit: (credentials: { email: string; password: string }) => Promise<void>;
  children: React.ReactNode;
  error?: string;
}

const Auth: React.FC<AuthProps> = ({
  submitLabel,
  onSubmit,
  children,
  error,
}) => {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  return (
    <Stack
      spacing={3}
      sx={{
        height: "100vh",
        maxWidth: {
          xs: "70%",
          md: "50%",
        },
        margin: "0 auto",
        justifyContent: "center",
      }}
    >
      <TextField
        type="email"
        label="Email"
        variant="outlined"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        error={!!error}
        helperText={error}
      />
      <TextField
        type="password"
        label="Password"
        variant="outlined"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        error={!!error}
        helperText={error}
      />

      <Button variant="contained" onClick={() => onSubmit({ email, password })}>
        {submitLabel}
      </Button>

      {children}
    </Stack>
  );
};

export default Auth;
