import { Box, Button } from "@mui/material";
import * as React from "react";
import { Page } from "../../interfaces/page.interface";
import { router } from "../router/Routes";

interface NavigationProps {
  pages: Page[];
}

const Navigation: React.FC<NavigationProps> = ({ pages }) => {
  return (
    <>
      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        {pages.map((page) => (
          <Button
            key={page.title}
            onClick={() => {
              router.navigate(page.path);
            }}
            color="inherit"
            sx={{ my: 2, display: "block", textTransform: "capitalize" }}
          >
            {page.title}
          </Button>
        ))}
      </Box>
    </>
  );
};

export default Navigation;
