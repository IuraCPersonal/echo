import * as React from "react";

import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { Paper, Popover, useTheme } from "@mui/material";

interface EmojiPickerProps {
  onSelect: (emoji: string) => void;
  anchorEl: HTMLElement | null;
  handleClose: () => void;
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({
  onSelect,
  anchorEl,
  handleClose,
}) => {
  const theme = useTheme();

  return (
    <Popover
      className="emoji-picker"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      open={Boolean(anchorEl)}
      onClose={handleClose}
      slotProps={{
        paper: {
          sx: {
            backgroundColor: "transparent",
            background: "none",
          },
          elevation: 0,
        },
      }}
    >
      <Paper sx={{ mb: 7, backgroundColor: "transparent" }}>
        <Picker
          theme={theme.palette.mode}
          data={data}
          onEmojiSelect={onSelect}
        />
      </Paper>
    </Popover>
  );
};

export default EmojiPicker;
