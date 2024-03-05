import { Avatar, Button, Stack, Typography } from "@mui/material";
import * as React from "react";
import { useGetMe } from "../../hooks/useGetMe";
import { UploadFileOutlined } from "@mui/icons-material";
import { API_URL } from "../../constants/urls";
import { snackVar } from "../../constants/snack";
import { commonFetch } from "../../utils/fetch";

const Profile: React.FC = () => {
  const me = useGetMe();

  const handleFileUpload = async (event: any) => {
    try {
      const formData = new FormData();

      formData.append("file", event.target.files[0]);

      const res = await commonFetch(`${API_URL}/users/image`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Error uploading file");
      }

      snackVar({ message: "Images Uploaded.", severity: "success" });

      me.refetch();
    } catch (error) {
      snackVar({ message: "Error Uploading File.", severity: "error" });
    }
  };

  return (
    <Stack
      spacing={6}
      sx={{
        mt: "2.5rem",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h1">{me?.data?.me?.username}</Typography>
      <Avatar sx={{ width: 256, height: 256 }} src={me?.data?.me?.imageUrl} />
      <Button
        component="label"
        variant="contained"
        size="large"
        startIcon={<UploadFileOutlined />}
      >
        Upload Image
        <input type="file" hidden onChange={handleFileUpload} />
      </Button>
    </Stack>
  );
};

export default Profile;
