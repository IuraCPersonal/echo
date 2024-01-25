import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { ApolloProvider } from "@apollo/client";
import { RouterProvider } from "react-router-dom";

import { router } from "./components/router/Routes";
import client from "./constants/apollo-client";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Container maxWidth="md">
          <RouterProvider router={router} />
        </Container>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
