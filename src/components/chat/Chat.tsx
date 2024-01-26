import * as React from "react";
import { useParams } from "react-router-dom";
import { useGetChat } from "../../hooks/useGetChat";
import SendIcon from "@mui/icons-material/Send";
import { Divider, IconButton, InputBase, Paper, Stack } from "@mui/material";

const Chat: React.FC = () => {
  const params = useParams();
  const { data } = useGetChat({ _id: params._id! });

  return (
    <Stack
      sx={{
        height: "100%",
        justifyContent: "space-between",
      }}
    >
      <h2>{data?.chat.name}</h2>
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
          placeholder="Send message"
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          color="primary"
          sx={{
            p: "10px",
          }}
        >
          <SendIcon />
        </IconButton>
      </Paper>
    </Stack>
  );
};

export default Chat;
