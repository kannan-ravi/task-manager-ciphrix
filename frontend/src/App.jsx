import { RouterProvider } from "react-router";
import { router } from "./router";
import AppTheme from "./theme/AppTheme";
import { CssBaseline } from "@mui/material";
import Header from "./components/common/Header";

function App(props) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Header />
      <RouterProvider router={router} />
    </AppTheme>
  );
}

export default App;
