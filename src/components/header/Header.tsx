import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Branding from "./Branding";
import MobileNavigation from "./MobileNavigation";
import MobileBranding from "./MobileBranding";
import Navigation from "./Navigation";
import Settings from "./Settings";
import { useReactiveVar } from "@apollo/client";
import { authenticatedVar } from "../../constants/authenticated";
import { Page } from "../../interfaces/page.interface";

const privatePages: Page[] = [
  {
    title: "Home",
    path: "/",
  },
];

const publicPages: Page[] = [
  {
    title: "Login",
    path: "/login",
  },
  {
    title: "Signup",
    path: "/signup",
  },
];

const Header: React.FC = () => {
  const authenticated = useReactiveVar(authenticatedVar);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Branding />
          <MobileNavigation
            pages={authenticated ? privatePages : publicPages}
          />
          <MobileBranding />
          <Navigation pages={authenticated ? privatePages : publicPages} />

          {authenticated && <Settings />}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;