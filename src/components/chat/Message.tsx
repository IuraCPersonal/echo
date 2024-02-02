import { Avatar, Grid, Paper, Stack, Tooltip, Typography } from "@mui/material";
import * as React from "react";
import { Message } from "../../gql/graphql";
import { motion } from "framer-motion";

interface MessageProps {
  message: Message;
}

const variants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
};

const MessageContainer: React.FC<MessageProps> = ({ message }) => {
  return (
    <Grid
      container
      component={motion.div}
      variants={variants}
      initial="initial"
      animate="animate"
      alignItems="center"
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
          <Typography variant="caption" sx={{ marginLeft: "0.25rem" }}>
            {new Date(message.createdAt).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            - {new Date(message.createdAt).toLocaleDateString()}
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default MessageContainer;
