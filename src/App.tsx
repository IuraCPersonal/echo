import {
  Container,
  CssBaseline,
  Grid,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { ApolloProvider } from "@apollo/client";
import { RouterProvider } from "react-router-dom";

import { router } from "./components/router/Routes";
import client from "./constants/apollo-client";
import Guard from "./components/auth/Guard";
import Header from "./components/header/Header";
import Snackbar from "./components/snackbar/Snackbar";
import ChatList from "./components/chat-list/ChatList";
import { usePath } from "./hooks/usePath";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App = () => {
  const { path } = usePath();

  const showChatList = path === "/" || path.includes("chats") ? true : false;

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Header />
        <Guard>
          <Container
            maxWidth="xl"
            sx={{ marginTop: "1rem", height: "calc(100vh - 64px)" }}
          >
            {showChatList ? (
              <Grid container spacing={5} sx={{ height: "100%" }}>
                <Grid item xs={12} md={5} lg={3} xl={3}>
                  <ChatList />
                </Grid>
                <Grid item xs={12} md={7} lg={9} xl={9}>
                  <Routes />
                </Grid>
              </Grid>
            ) : (
              <Routes />
            )}
          </Container>
        </Guard>
        <Snackbar />
      </ThemeProvider>
    </ApolloProvider>
  );
};

const Routes = () => <RouterProvider router={router} />;

export default App;
