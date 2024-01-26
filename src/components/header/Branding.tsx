import * as React from "react";
import Typography from "@mui/material/Typography";
import ForumIcon from "@mui/icons-material/Forum";
import { router } from "../router/Routes";

const Branding: React.FC = () => {
  return (
    <>
      <ForumIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
      <Typography
        variant="h6"
        noWrap
        component="a"
        onClick={() => router.navigate("/")}
        sx={{
          mr: 2,
          display: { xs: "none", md: "flex" },
          fontFamily: "monospace",
          fontWeight: 700,
          cursor: "pointer",
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        ECHO
      </Typography>
    </>
  );
};

export default Branding;