import { Alert, Snackbar } from "@mui/material";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { hideToast } from "../../app/features/toast/toastSlice";

const Toast = () => {
  const dispatch = useDispatch();

  const { open, message, severity } = useSelector((state) => state.toast);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(hideToast());
  };
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
