import * as React from "react";
import { useLocation, useParams } from "react-router-dom";
import { useGetChat } from "../../hooks/useGetChat";
import SendIcon from "@mui/icons-material/Send";
import {
  Avatar,
  Box,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useCreateMessage } from "../../hooks/useCreateMessage";
import { useGetMessages } from "../../hooks/useGetMessages";
import { PAGE_SIZE } from "../../constants/page-size";
import { useCountMessages } from "../../hooks/useCountMessages";
import InfiniteScroll from "react-infinite-scroller";
import MessageContainer from "./Message";

const Chat: React.FC = () => {
  const params = useParams();
  const chatId = params._id!;

  const [message, setMessage] = React.useState("");
  const divRef = React.useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  const { data } = useGetChat({ _id: chatId });
  const { data: messages, fetchMore } = useGetMessages({
    chatId,
    skip: 0,
    limit: PAGE_SIZE,
  });
  const [createMessage] = useCreateMessage();
  const { messagesCount, countMessages } = useCountMessages(chatId);

  React.useEffect(() => {
    countMessages();
  }, [countMessages]);

  const scrollToBottom = () => {
    divRef.current?.scrollIntoView();
  };

  React.useEffect(() => {
    if (messages?.messages && messages.messages.length <= PAGE_SIZE) {
      setMessage("");
      scrollToBottom();
    }
  }, [messages, location.pathname]);

  const handleCreateMessage = async () => {
    await createMessage({
      variables: {
        createMessageInput: {
          content: message.trim(),
          chatId,
        },
      },
    });

    setMessage("");
    scrollToBottom();
  };

  return (
    <Stack
      sx={{
        height: "100%",
        justifyContent: "space-between",
      }}
    >
      <h2>{data?.chat.name} My Title</h2>
      <Box
        sx={{
          height: "64vh",
          overflowY: "auto",
        }}
      >
        <InfiniteScroll
          pageStart={0}
          isReverse={true}
          loadMore={() =>
            fetchMore({
              variables: {
                skip: messages?.messages.length,
              },
            })
          }
          hasMore={
            messages && messagesCount
              ? messages.messages.length < messagesCount
              : false
          }
          useWindow={false}
        >
          {messages &&
            [...messages.messages]
              .sort(
                (messageA, messageB) =>
                  new Date(messageA.createdAt).getTime() -
                  new Date(messageB.createdAt).getTime()
              )
              .map((message) => (
                <MessageContainer key={message._id} message={message} />
              ))}
          <div ref={divRef}></div>
        </InfiniteScroll>
      </Box>
      <Paper
        sx={{
          p: "2px 4px",
          display: "flex",
          justifySelf: "flex-end",
          alignItems: "center",
          width: "100%",
          m: "1rem 0",
        }}
      >
        <InputBase
          sx={{
            ml: 1,
            flex: 1,
            width: "100%",
          }}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Send message"
          onKeyDown={async (event) => {
            if (event.key === "Enter" && message.length > 0) {
              await handleCreateMessage();
            }
          }}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          color="primary"
          sx={{
            p: "10px",
          }}
          disabled={message.length === 0}
          onClick={handleCreateMessage}
        >
          <SendIcon />
        </IconButton>
      </Paper>
    </Stack>
  );
};

export default Chat;
