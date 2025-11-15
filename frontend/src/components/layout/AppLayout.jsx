import { Container, Stack } from "@mui/material";
import React from "react";

const AppLayout = ({ children }) => {
  return (
    <Container maxWidth="lg">
      <Stack sx={{ marginTop: 14 }}>{children}</Stack>
    </Container>
  );
};

export default AppLayout;
