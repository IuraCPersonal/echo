import * as React from "react";
import {
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputBase,
  Modal,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useCreateChat } from "../../../hooks/useCreateChat";
import { UNKNOWN_ERROR_MESSAGE } from "../../../constants/errors";

interface ChatListAddProps {
  open: boolean;
  handleClose: () => void;
}

const ChatListAdd: React.FC<ChatListAddProps> = ({ open, handleClose }) => {
  const [name, setName] = React.useState<string | undefined>();
  const [error, setError] = React.useState<string | undefined>("");
  const [isPrivate, setIsPrivate] = React.useState<boolean>(false);
  const [createChat] = useCreateChat();

  const onClose = () => {
    setError("");
    setName("");
    setIsPrivate(false);
    handleClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Stack spacing={2}>
          <Typography variant="h6" component="h2">
            Add Chat
          </Typography>

          <FormGroup>
            <FormControlLabel
              style={{ width: 0 }}
              control={
                <Switch
                  defaultChecked={isPrivate}
                  value={isPrivate}
                  onChange={(event) => setIsPrivate(event.target.checked)}
                />
              }
              label="Private"
            />
          </FormGroup>

          {isPrivate ? (
            <Paper
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search users..."
              />
              <IconButton sx={{ p: "10px" }}>
                <SearchIcon />
              </IconButton>
            </Paper>
          ) : (
            <TextField
              label="Name"
              error={!!error}
              helperText={error}
              onChange={(event) => setName(event.target.value)}
            />
          )}
          <Button
            variant="outlined"
            onClick={async () => {
              if (!name?.length) {
                setError("Name is required");
                return;
              }

              try {
                await createChat({
                  variables: {
                    createChatInput: {
                      isPrivate,
                      name: name || undefined,
                    },
                  },
                });
              } catch (error) {
                setError(UNKNOWN_ERROR_MESSAGE);
              }

              onClose();
            }}
          >
            Save
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ChatListAdd;
