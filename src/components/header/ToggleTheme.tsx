import * as React from "react";
import { IconButton, useTheme } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { DarkMode, LightMode } from "@mui/icons-material";
import { ColorModeContext } from "../../theme/theme";

const ToggleTheme: React.FC = () => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const mode = theme.palette.mode;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        style={{ display: "inline-block", marginRight: "1rem" }}
        key={mode === "dark" ? "dark" : "light"}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <IconButton
          onClick={colorMode.toggleColorMode}
          color="secondary"
          sx={{
            backgroundColor: mode === "dark" ? "orange" : "purple",
            borderRadius: 3,
          }}
        >
          {theme.palette.mode === "dark" ? (
            <LightMode sx={{ color: "#fff" }} />
          ) : (
            <DarkMode sx={{ color: "#fff" }} />
          )}
        </IconButton>
      </motion.div>
    </AnimatePresence>
  );
};

export default ToggleTheme;
