import { DataGrid, gridClasses } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import React from "react";

const columns = [
  { field: "id", headerName: "S.No" },
  { field: "title", headerName: "Title" },
  { field: "description", headerName: "Description" },
  { field: "status", headerName: "Status" },
  { field: "createdAt", headerName: "Created Date", width: 130 },
];

const rows = [
  {
    id: 1,
    title: "Snow",
    description: "Jon",
    status: 35,
    createdAt: "20-10-2024",
  },
  {
    id: 2,
    title: "Lannister",
    description: "Cersei",
    status: 42,
    createdAt: "20-10-2024",
  },
  {
    id: 3,
    title: "Lannister",
    description: "Jaime",
    status: 45,
    createdAt: "20-10-2024",
  },
  {
    id: 4,
    title: "Stark",
    description: "Arya",
    status: 16,
    createdAt: "20-10-2024",
  },
  {
    id: 5,
    title: "Targaryen",
    description: "Daenerys",
    status: 25,
    createdAt: "20-10-2024",
  },
  {
    id: 6,
    title: "Melisandre",
    description: null,
    status: 150,
    createdAt: "20-10-2024",
  },
  {
    id: 7,
    title: "Clifford",
    description: "Ferrara",
    status: 44,
    createdAt: "20-10-2024",
  },
  {
    id: 8,
    title: "Frances",
    description: "Rossini",
    status: 36,
    createdAt: "20-10-2024",
  },
  {
    id: 9,
    title: "Roxie",
    description: "Harvey",
    status: 65,
    createdAt: "20-10-2024",
  },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function TaskTable() {
  const loadData = React.useCallback(async () => {}, []);

  React.useEffect(() => {
    loadData();
  }, [loadData]);
  return (
    <Paper sx={{ width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pagination
        paginationModel={paginationModel}
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
