import React from "react";
import AppLayout from "../../components/layout/AppLayout";
import { Box, Button, Stack, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { TaskForm } from "../../components/common/TaskForm";
import { useNavigate } from "react-router";

const TaskCreate = () => {
  const navigate = useNavigate();

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
        <TaskForm />
      </Stack>
    </AppLayout>
  );
};

export default TaskCreate;
