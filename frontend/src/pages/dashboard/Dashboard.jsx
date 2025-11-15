import { Box, Button, Stack, Typography } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import React from "react";
import TaskTable from "../../components/TaskTable";
import { useNavigate } from "react-router";
import AppLayout from "../../components/layout/AppLayout";

const Dashboard = () => {
  const navigate = useNavigate();
  const handleCreateClick = React.useCallback(() => {
    navigate("/task/create");
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
          <Typography variant="h4">Tasks</Typography>
        </Box>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreateClick}
          >
            Create
          </Button>
        </Stack>
      </Stack>
      <Stack sx={{ marginTop: 4 }}>
        <TaskTable />
      </Stack>
    </AppLayout>
  );
};

export default Dashboard;
