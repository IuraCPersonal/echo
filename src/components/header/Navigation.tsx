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
            sx={{ my: 2, color: "white", display: "block" }}
          >
            {page.title}
          </Button>
        ))}
      </Box>
    </>
  );
};

export default Navigation;