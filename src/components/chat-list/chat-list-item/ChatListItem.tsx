import * as React from "react";
import {
  Avatar,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { router } from "../../router/Routes";
import { Chat } from "../../../gql/graphql";

interface ChatListItemProps {
  chat: Chat;
  selected: boolean;
}

const ChatListItem: React.FC<ChatListItemProps> = ({ chat, selected }) => {
  return (
    <>
      <ListItem alignItems="flex-start" disablePadding>
        <ListItemButton
          onClick={() => router.navigate(`/chats/${chat._id}`)}
          selected={selected}
        >
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="" />
          </ListItemAvatar>
          <ListItemText
            primary={chat.name}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {chat.latestMessage?.user?.username || ""}
                </Typography>
                {" - " + (chat.latestMessage?.content || "")}
              </React.Fragment>
            }
          />
        </ListItemButton>
      </ListItem>
      <Divider variant="inset" />
    </>
  );
};

export default ChatListItem;
