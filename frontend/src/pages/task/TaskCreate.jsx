import React from "react";
import AppLayout from "../../components/layout/AppLayout";
import { Box, Button, Stack, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { TaskForm } from "../../components/common/TaskForm";
import { useNavigate } from "react-router";
import api from "../../config/axios";
import { showToast } from "../../app/features/toast/toastSlice";
import { useDispatch } from "react-redux";

const TaskCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [task, setTask] = React.useState({
    title: "",
    description: "",
    status: "pending",
  });
  const [errors, setErrors] = React.useState({});

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
    if (!task.title.trim()) {
      newErrors.title = "Title is required.";
    }
    if (!task.description.trim()) {
      newErrors.description = "Description is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreate = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await api.post("/tasks", task);
      if (response.data.success) {
        dispatch(
          showToast({
            message: response.data.message || "Task created successfully!",
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
  };

  const handleGoBack = React.useCallback(() => {
    navigate("/");
  }, [navigate]);

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
          <Typography variant="h4">Create Task</Typography>
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
          handleSubmit={handleCreate}
          errors={errors}
          submitButtonText="Create Task"
        />
      </Stack>
    </AppLayout>
  );
};

export default TaskCreate;
