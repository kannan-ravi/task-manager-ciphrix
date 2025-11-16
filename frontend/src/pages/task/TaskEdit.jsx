import React from "react";
import AppLayout from "../../components/layout/AppLayout";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { TaskForm } from "../../components/common/TaskForm";
import { useNavigate, useParams } from "react-router";
import api from "../../config/axios";
import { showToast } from "../../app/features/toast/ToastSlice";
import { useDispatch } from "react-redux";

const TaskEdit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const [task, setTask] = React.useState({
    title: "",
    description: "",
    status: "pending",
  });

  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: null,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!task.title?.trim()) {
      newErrors.title = "Title is required.";
    }
    if (!task.description?.trim()) {
      newErrors.description = "Description is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGoBack = React.useCallback(() => {
    navigate("/");
  }, [navigate]);

  const fetchSingleTask = React.useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get(`/tasks/${id}`);
      if (response.data.success) {
        setTask(response.data.data);
      }
    } catch (error) {
      const message = error?.response?.data?.message || "Something went wrong";
      dispatch(showToast({ message, severity: "error" }));
      navigate("/");
    } finally {
      setLoading(false);
    }
  }, [id, dispatch, navigate]);

  React.useEffect(() => {
    fetchSingleTask();
  }, [fetchSingleTask]);

  const handleEdit = React.useCallback(
    async (event) => {
      event.preventDefault();

      if (!validateForm()) {
        return;
      }

      try {
        const response = await api.put(`/tasks/${id}`, task);

        if (response.data.success) {
          dispatch(
            showToast({
              message: response.data.message || "Task edited successfully!",
              severity: "success",
            })
          );
          navigate("/");
        }
      } catch (error) {
        const message =
          error?.response?.data?.message || "Could not create task.";
        dispatch(showToast({ message, severity: "error" }));
      }
    },
    [id, task, dispatch, navigate, validateForm]
  );

  if (loading) {
    return (
      <AppLayout>
        <Backdrop
          sx={(theme) => ({
            color: (theme.vars || theme).palette.text.primary,
            zIndex: theme.zIndex.drawer + 1,
          })}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={1}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Typography variant="h4">Edit Task</Typography>
        </Box>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={handleGoBack}
          >
            Go back
          </Button>
        </Stack>
      </Stack>
      <Stack sx={{ marginTop: 4 }}>
        <TaskForm
          task={task}
          handleChange={handleChange}
          handleSubmit={handleEdit}
          errors={errors}
          submitButtonText="Edit Task"
        />
      </Stack>
    </AppLayout>
  );
};

export default TaskEdit;
