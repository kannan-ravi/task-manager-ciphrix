import { RouterProvider } from "react-router";
import { router } from "./router";
import AppTheme from "./theme/AppTheme";
import { CssBaseline } from "@mui/material";

function App(props) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <RouterProvider router={router} />
    </AppTheme>
  );
}

export default App;
