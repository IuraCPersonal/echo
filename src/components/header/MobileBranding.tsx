import * as React from "react";
import { Typography } from "@mui/material";
import ForumIcon from "@mui/icons-material/Forum";
import { router } from "../router/Routes";

const MobileBranding: React.FC = () => {
  return (
    <>
      <ForumIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
      <Typography
        variant="h5"
        noWrap
        component="a"
        onClick={() => router.navigate("/")}
        sx={{
          mr: 2,
          display: { xs: "flex", md: "none" },
          flexGrow: 1,
          fontFamily: "monospace",
          fontWeight: 700,
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

export default MobileBranding;
