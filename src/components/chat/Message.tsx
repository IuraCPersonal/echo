import * as React from "react";
import { motion } from "framer-motion";
import { Avatar, Grid, Paper, Stack, Tooltip, Typography } from "@mui/material";

import { Message } from "../../gql/graphql";
import { useGetMe } from "../../hooks/useGetMe";
import MessageActions from "./MessageActions";
import useAnchorElement from "../../hooks/useAnchorElement";
import { blue } from "@mui/material/colors";

interface MessageProps {
  message: Message;
}

const variants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
};

const MessageContainer: React.FC<MessageProps> = ({ message }) => {
  const { data: user } = useGetMe();
  const isMe = message.user._id === user?.me._id;

  const {
    anchorEl: anchorElMessage,
    handleClick: handleOpenMessageActions,
    handleClose: handleCloseMessageActions,
  } = useAnchorElement();

  return (
    <Grid
      container
      component={motion.div}
      variants={variants}
      initial="initial"
      animate="animate"
      alignItems="start"
      justifyContent="flex-end"
      flexDirection={isMe ? "row-reverse" : "row"}
      marginBottom="1rem"
    >
      <Grid
        item
        xs={2}
        lg={1}
        sx={{
          display: "grid",
          placeItems: "center",
        }}
      >
        <Tooltip placement="top" title={message.user.username}>
          <Avatar alt="Me" src="" sx={{ height: 52, width: 52 }}>
            {message.user.username[0]}
          </Avatar>
        </Tooltip>
      </Grid>
      <Grid item xs={10} lg={11}>
        <Stack alignItems={isMe ? "flex-end" : "flex-start"}>
          <Paper
            elevation={1}
            sx={{
              width: "fit-content",
              backgroundColor: isMe ? "primary.main" : "background.paper",
            }}
            onContextMenu={(event) => {
              event.preventDefault();
              handleCloseMessageActions();
              handleOpenMessageActions(event);
            }}
          >
            <Typography
              color={isMe ? "#ffffff" : "text.primary"}
              sx={{
                p: "0.9rem",
                wordBreak: "break-word",
                overflowWrap: "break-word",
              }}
            >
              {message.content}
            </Typography>
          </Paper>
          <Typography variant="caption" sx={{ marginLeft: "0.25rem" }}>
            {new Date(message.createdAt).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            - {new Date(message.createdAt).toLocaleDateString()}
          </Typography>
        </Stack>
        <MessageActions
          anchorEl={anchorElMessage}
          handleClose={handleCloseMessageActions}
        />
      </Grid>
    </Grid>
  );
};

export default MessageContainer;
