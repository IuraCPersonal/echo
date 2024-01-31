import * as React from "react";
import ChatListItem from "./chat-list-item/ChatListItem";
import { Box, Divider, Stack } from "@mui/material";
import ChatListHeader from "./chat-list-header/ChatListHeader";
import ChatListAdd from "./chat-list-add/ChatListAdd";
import { useGetChats } from "../../hooks/useGetChats";
import { usePath } from "../../hooks/usePath";
import { useMessageCreated } from "../../hooks/useMessageCreated";
import { PAGE_SIZE } from "../../constants/page-size";
import InfiniteScroll from "react-infinite-scroller";
import { useCountChats } from "../../hooks/useCountChats";

const ChatList: React.FC = () => {
  const [chatListAddVisible, setChatListAddVisible] =
    React.useState<boolean>(false);
  const [selectedChatId, setSelectedChatId] = React.useState<string>("");

  const { path } = usePath();
  const { data, fetchMore } = useGetChats({
    skip: 0,
    limit: PAGE_SIZE,
  });
  const { chatsCount, countChats } = useCountChats();

  useMessageCreated({ chatIds: data?.chats.map((chat) => chat._id) ?? [] });

  React.useEffect(() => {
    const pathSplit = path.split("chats/");

    if (pathSplit.length === 2) {
      setSelectedChatId(pathSplit[1]);
    }
  }, [path]);

  React.useEffect(() => {
    countChats();
  }, [countChats]);

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
        <Box
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          <InfiniteScroll
            pageStart={0}
            loadMore={() =>
              fetchMore({
                variables: {
                  skip: data?.chats.length,
                },
              })
            }
            hasMore={
              data?.chats && chatsCount
                ? data?.chats.length < chatsCount
                : false
            }
            useWindow={false}
          >
            {data?.chats &&
              [...data.chats]
                .sort((chatA, chatB) => {
                  if (!chatA.latestMessage) return -1;

                  return (
                    new Date(chatA.latestMessage?.createdAt).getTime() -
                    new Date(chatB.latestMessage?.createdAt).getTime()
                  );
                })
                .map((chat) => (
                  <ChatListItem
                    key={chat._id}
                    chat={chat}
                    selected={chat._id === selectedChatId}
                  />
                ))
                .reverse()}
          </InfiniteScroll>
        </Box>
      </Stack>
    </>
  );
};

export default ChatList;
