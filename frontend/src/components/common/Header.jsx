import React from "react";
import {
  alpha,
  AppBar,
  Container,
  Stack,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import ThemeSwitcher from "./ThemeSwitcher";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderRadius: theme.shape.borderRadius,
  backdropFilter: "blur(24px)",
  border: "1px solid",
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: "8px 16px",
}));

const Header = () => {
  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: "calc(var(--template-frame-height, 0px) + 28px)",
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Typography sx={{ color: "text.primary" }}>Task Manager</Typography>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{ marginLeft: "auto" }}
          >
            <Stack direction="row" alignItems="center">
              <ThemeSwitcher />
            </Stack>
          </Stack>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
