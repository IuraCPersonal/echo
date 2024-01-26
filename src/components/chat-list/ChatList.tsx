import * as React from "react";
import List from "@mui/material/List";
import ChatListItem from "./chat-list-item/ChatListItem";
import { Divider, Stack } from "@mui/material";
import ChatListHeader from "./chat-list-header/ChatListHeader";
import ChatListAdd from "./chat-list-add/ChatListAdd";
import { useGetChats } from "../../hooks/useGetChats";

const ChatList: React.FC = () => {
  const [chatListAddVisible, setChatListAddVisible] =
    React.useState<boolean>(false);

  const { data } = useGetChats();

  return (
    <>
      <ChatListAdd
        open={chatListAddVisible}
        handleClose={() => setChatListAddVisible(false)}
      />

      <Stack>
        <ChatListHeader
          handleAddChat={() => {
            setChatListAddVisible(true);
          }}
        />
        <Divider />
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          {data?.chats.map((chat) => (
            <ChatListItem key={chat._id} chat={chat} />
          ))}
        </List>
      </Stack>
    </>
  );
};

export default ChatList;
