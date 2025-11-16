import { RouterProvider } from "react-router";
import { router } from "./router";
import AppTheme from "./theme/AppTheme";
import { CssBaseline } from "@mui/material";
import Toast from "./components/common/Toast";

function App(props) {
  return (
    <AppTheme {...props}>
      <Toast />
      <CssBaseline enableColorScheme />
      <RouterProvider router={router} />
    </AppTheme>
  );
}

export default App;
