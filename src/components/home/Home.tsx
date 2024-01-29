import { Link, Stack, Typography } from "@mui/material";
import * as React from "react";

const Home: React.FC = () => {
  return (
    <Stack ml={4} mt={4} spacing={4}>
      <Typography fontFamily="monospace" variant="h3">
        Welcome, to <b>Echo</b> Chat! 👋
      </Typography>
      <Typography fontFamily="monospace" variant="h6">
        This is a simple chat application built with React, GraphQL, and
        MongoDB.
      </Typography>
      <Typography fontFamily="monospace" variant="h6">
        To get started, create a new chat or join an existing one 🚀.
      </Typography>
      <Typography fontFamily="monospace" variant="h6">
        If you have any questions, sugestions, please contact me at{" "}
        <Link href="mailto:iurie.cius.personal@gmail.com">IuraCPersonal</Link>.
      </Typography>
    </Stack>
  );
};

export default Home;
