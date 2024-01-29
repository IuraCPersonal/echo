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
  Typography,
} from "@mui/material";
import { useCreateMessage } from "../../hooks/useCreateMessage";
import { useGetMessages } from "../../hooks/useGetMessages";
import { useMessageCreated } from "../../hooks/useMessageCreated";
import { Message } from "../../gql/graphql";

const Chat: React.FC = () => {
  const params = useParams();
  const chatId = params._id!;

  const [message, setMessage] = React.useState("");
  const divRef = React.useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  const { data } = useGetChat({ _id: chatId });
  const { data: messages } = useGetMessages({ chatId });
  const [createMessage] = useCreateMessage();
  useMessageCreated({ chatId });

  const scrollToBottom = () => {
    divRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    setMessage("");
    scrollToBottom();
  }, [messages, location.pathname]);

  const handleCreateMessage = async () => {
    await createMessage({
      variables: {
        createMessageInput: {
          content: message,
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
      <h2>{data?.chat.name}</h2>
      <Box
        sx={{
          maxHeight: "70vh",
          overflowY: "scroll",
          flex: 1,
        }}
      >
        {messages &&
          [...messages?.messages]
            .sort(
              (messageA, messageB) =>
                new Date(messageA.createdAt).getTime() -
                new Date(messageB.createdAt).getTime()
            )
            .map((message) => (
              <Grid container alignItems="center" marginBottom="1rem">
                <Grid
                  item
                  xs={2}
                  lg={1}
                  sx={{
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  <Avatar alt="Me" src="" sx={{ height: 52, width: 52 }} />
                </Grid>
                <Grid item xs={10} lg={11}>
                  <Stack>
                    <Paper sx={{ width: "fit-content" }}>
                      <Typography
                        sx={{
                          p: "0.9rem",
                          wordBreak: "break-word",
                          overflowWrap: "break-word",
                        }}
                      >
                        {message.content}
                      </Typography>
                    </Paper>
                    <Typography
                      variant="caption"
                      sx={{ marginLeft: "0.25rem" }}
                    >
                      {new Date(message.createdAt).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            ))}
        <div ref={divRef}></div>
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
            if (event.key === "Enter") {
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
          onClick={handleCreateMessage}
        >
          <SendIcon />
        </IconButton>
      </Paper>
    </Stack>
  );
};

export default Chat;
