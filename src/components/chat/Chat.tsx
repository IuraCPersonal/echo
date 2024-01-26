import * as React from "react";
import { useParams } from "react-router-dom";
import { useGetChat } from "../../hooks/useGetChat";
import SendIcon from "@mui/icons-material/Send";
import {
  Box,
  Divider,
  IconButton,
  InputBase,
  Paper,
  Stack,
} from "@mui/material";
import { useCreateMessage } from "../../hooks/useCreateMessage";
import { useGetMessages } from "../../hooks/useGetMessages";

const Chat: React.FC = () => {
  const params = useParams();
  const chatId = params._id!;

  const [message, setMessage] = React.useState("");

  const { data } = useGetChat({ _id: chatId });
  const { data: messages } = useGetMessages({ chatId });
  const [createMessage] = useCreateMessage(chatId);

  return (
    <Stack
      sx={{
        height: "100%",
        justifyContent: "space-between",
      }}
    >
      <h2>{data?.chat.name}</h2>
      <Box sx={{}}>
        {messages?.messages.map((message) => (
          <p>{message.content}</p>
        ))}
      </Box>
      <Paper
        sx={{
          p: "2px 4px",
          display: "flex",
          justifySelf: "flex-end",
          alignItems: "center",
          width: "100%",
        }}
      >
        <InputBase
          sx={{
            ml: 1,
            flex: 1,
            width: "100%",
          }}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Send message"
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          color="primary"
          sx={{
            p: "10px",
          }}
          onClick={() =>
            createMessage({
              variables: {
                createMessageInput: {
                  content: message,
                  chatId,
                },
              },
            })
          }
        >
          <SendIcon />
        </IconButton>
      </Paper>
    </Stack>
  );
};

export default Chat;
