import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { Box, IconButton, Tooltip } from "@mui/material";
import { useDispatch } from "react-redux";
import { removeUser } from "../../app/features/user/userSlice";
import api from "../../config/axios";
import { useNavigate } from "react-router";
import { showToast } from "../../app/features/toast/ToastSlice";
const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = React.useCallback(async () => {
    try {
      const response = await api.post("/auth/logout");
      if (response.data.success) {
        const { message } = response.data;
        dispatch(removeUser());
        dispatch(showToast({ message, severity: "success" }));
        navigate("/login");
      }
    } catch (error) {
      const { message } =
        error?.response?.data?.message || "Something went wrong";
      dispatch(showToast({ message, severity: "error" }));
    }
  }, []);
  return (
    <Tooltip title="Logout" enterDelay={1000}>
      <Box>
        <IconButton size="small" aria-label="Logout" onClick={handleLogout}>
          <LogoutIcon
            sx={{
              display: "inline",
            }}
          />
        </IconButton>
      </Box>
    </Tooltip>
  );
};

export default Logout;
