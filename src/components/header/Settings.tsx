import * as React from "react";
import {
  Badge,
  IconButton,
  Box,
  Typography,
  Menu,
  Avatar,
  Tooltip,
  MenuItem,
} from "@mui/material";

import { useLogout } from "../../hooks/useLogout";
import { onLogout } from "../../utils/logout";
import { snackVar } from "../../constants/snack";
import { useGetMe } from "../../hooks/useGetMe";
import { UNKNOWN_ERROR_SNACK_MESSAGE } from "../../constants/errors";
import { router } from "../router/Routes";

const Settings: React.FC = () => {
  const { logout } = useLogout();
  const { data: user } = useGetMe();

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Badge
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              variant="dot"
              color="success"
              overlap="circular"
            >
              <Avatar alt="Remy Sharp" src={user?.me?.imageUrl}>
                {user?.me.username[0]}
              </Avatar>
            </Badge>
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem
            key="Profile"
            onClick={() => {
              router.navigate("/profile");
            }}
          >
            <Typography textAlign="center">Profile</Typography>
          </MenuItem>
          <MenuItem
            key="Logout"
            onClick={async () => {
              try {
                await logout();

                onLogout();
                handleCloseUserMenu();
              } catch (error) {
                snackVar(UNKNOWN_ERROR_SNACK_MESSAGE);
              }
            }}
          >
            <Typography textAlign="center">Logout</Typography>
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
};

export default Settings;
