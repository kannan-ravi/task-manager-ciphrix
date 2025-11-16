import { DataGrid, gridClasses } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import React from "react";
import api from "../config/axios";
import { useDispatch } from "react-redux";
import { showToast } from "../app/features/toast/ToastSlice";
import { Chip, IconButton, Stack, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router";

export default function TaskTable() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tasks, setTasks] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const columns = [
    {
      field: "sno",
      headerName: "S.No",
      width: 90,
      renderCell: (params) => {
        return params.api.getRowIndexRelativeToVisibleRows(params.row._id) + 1;
      },
    },
    { field: "title", headerName: "Title", flex: 1, minWidth: 150 },
    { field: "description", headerName: "Description", flex: 2, minWidth: 250 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => {
        const status = params.value;

        const chipColor = status === "completed" ? "success" : "warning";

        const label = status.charAt(0).toUpperCase() + status.slice(1);

        return (
          <Chip label={label} color={chipColor} size="small" variant="filled" />
        );
      },
    },
    {
      field: "createdAt",
      headerName: "Created Date",
      width: 150,
      renderCell: (params) => new Date(params.value).toLocaleDateString(),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          height="100%"
          spacing={1}
        >
          <Tooltip title="Edit Task">
            <IconButton onClick={() => handleEdit(params.row._id)} size="small">
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Task">
            <IconButton
              onClick={() => handleDelete(params.row._id)}
              size="small"
              color="error"
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  const handleEdit = React.useCallback((id) => {
    navigate(`/task/edit/${id}`);
  }, []);
  const handleDelete = React.useCallback(async (id) => {
    try {
      const response = await api.delete(`/tasks/${id}`);

      if (response.data.success) {
        const message = response.data.message;
        dispatch(showToast({ message, severity: "success" }));

        setTasks((currentTasks) =>
          currentTasks.filter((task) => task._id !== id)
        );
      }
    } catch (error) {
      const message = error?.response?.data?.message || "Could not delete task";
      dispatch(showToast({ message, severity: "error" }));
    }
  }, []);

  const fetchData = React.useCallback(async () => {
    try {
      const response = await api.get("/tasks");
      if (response.data.success) {
        setTasks(response.data.data);
      }
    } catch (error) {
      const message = error?.response?.data?.message || "Something went wrong";
      dispatch(showToast({ message, severity: "error" }));
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <Paper sx={{ width: "100%" }}>
      <DataGrid
        rows={tasks}
        columns={columns}
        loading={loading}
        getRowId={(row) => row._id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10, 25]}
        disableRowSelectionOnClick
        sx={{
          [`& .${gridClasses.columnHeader}, & .${gridClasses.cell}`]: {
            outline: "transparent",
          },
          [`& .${gridClasses.columnHeader}:focus-within, & .${gridClasses.cell}:focus-within`]:
            {
              outline: "none",
            },
          [`& .${gridClasses.row}:hover`]: {
            cursor: "pointer",
          },
        }}
        slotProps={{
          loadingOverlay: {
            variant: "circular-progress",
            noRowsVariant: "circular-progress",
          },
          baseIconButton: {
            size: "small",
          },
        }}
      />
    </Paper>
  );
}
