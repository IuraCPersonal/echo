import * as React from "react";
import AddCircle from "@mui/icons-material/AddCircle";
import {
  AppBar,
  Divider,
  IconButton,
  InputBase,
  Paper,
  Toolbar,
} from "@mui/material";
import { Search } from "@mui/icons-material";

interface ChatListHeaderProps {
  handleAddChat: () => void;
  handleFilterBy: (event: any) => void;
  filterBy: string;
}

const ChatListHeader: React.FC<ChatListHeaderProps> = ({
  handleAddChat,
  handleFilterBy,
  filterBy,
}) => {
  return (
    <AppBar
      position="static"
      color="transparent"
      sx={{
        boxShadow: "none",
      }}
    >
      <Toolbar disableGutters>
        <IconButton size="large" edge="start" onClick={handleAddChat}>
          <AddCircle />
        </IconButton>

        <Paper
          sx={{
            p: "2px 4px",
            display: "flex",
            justifySelf: "flex-end",
            alignItems: "center",
            width: "100%",
            m: "1rem 0 1rem 1rem",
          }}
        >
          <InputBase
            sx={{
              ml: 1,
              flex: 1,
              width: "100%",
            }}
            value={filterBy}
            onChange={handleFilterBy}
            placeholder="Search chats"
            inputProps={{ "aria-label": "search" }}
          />
          <Search />
        </Paper>
      </Toolbar>
    </AppBar>
  );
};

export default ChatListHeader;
