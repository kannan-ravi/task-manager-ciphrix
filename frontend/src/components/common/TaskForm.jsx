import {
  alpha,
  Box,
  Button,
  FormControl,
  FormGroup,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  styled,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import React from "react";

const StyledTextarea = styled(TextareaAutosize)(({ theme }) => ({
  boxSizing: "border-box",
  fontFamily: theme.typography.fontFamily,
  fontSize: "1rem",
  fontWeight: 400,

  resize: "vertical",
  padding: "8px 12px",
  marginTop: 6,
  borderRadius: (theme.vars || theme).shape.borderRadius,
  color: (theme.vars || theme).palette.text.primary,
  backgroundColor: (theme.vars || theme).palette.background.default,
  border: `1px solid ${(theme.vars || theme).palette.divider}`,
  transition: "border 120ms ease-in",

  "&::placeholder": {
    opacity: 0.7,
    color: theme.palette.grey[500],
  },

  "&:hover": {
    borderColor: theme.palette.grey[400],
  },

  "&:focus-visible": {
    outline: `3px solid ${alpha(theme.palette.primary.main, 0.5)}`,
    outlineOffset: "2px",
    borderColor: theme.palette.primary.light,
  },

  ...theme.applyStyles("dark", {
    backgroundColor: theme.palette.grey[800],
    borderColor: theme.palette.grey[700],

    "&:hover": {
      borderColor: theme.palette.grey[500],
    },

    "&::placeholder": {
      color: theme.palette.grey[400],
    },
  }),
}));
export const TaskForm = () => {
  return (
    <Box component="form" onSubmit={() => {}} noValidate autoComplete="off">
      <FormGroup>
        <Grid container spacing={2} sx={{ mb: 2, width: "100%" }}>
          <Grid size={{ xs: 12, sm: 6 }} sx={{ display: "flex" }}>
            <TextField
              value={""}
              onChange={() => {}}
              name="title"
              label="Title"
              error={""}
              helperText={""}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }} sx={{ display: "flex" }}>
            <FormControl error={""} fullWidth>
              <InputLabel id="status">Status</InputLabel>
              <Select
                value={""}
                onChange={() => {}}
                labelId="status"
                name="status"
                label="Status"
                defaultValue=""
                fullWidth
              >
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
              </Select>
              <FormHelperText> </FormHelperText>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12 }} sx={{ display: "flex" }}>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="description">Description</InputLabel>
              <StyledTextarea aria-label="Title Description" minRows={3} />
            </FormControl>
          </Grid>
        </Grid>
      </FormGroup>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={1}
      >
        <Button
          type="submit"
          size="large"
          variant="contained"
          onClick={() => {}}
        >
          Submit
        </Button>
      </Stack>
    </Box>
  );
};
