import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { colorSchemes, typography, shadows, shape } from "./themePrimitives";

export default function AppTheme(props) {
  const { children, disableCustomTheme } = props;
  const theme = React.useMemo(() => {
    return disableCustomTheme
      ? {}
      : createTheme({
          cssVariables: {
            colorSchemeSelector: "data-mui-color-scheme",
            cssVarPrefix: "template",
          },
          colorSchemes,
          typography,
          shadows,
          shape,
        });
  }, [disableCustomTheme]);
  if (disableCustomTheme) {
    return <React.Fragment>{children}</React.Fragment>;
  }
  return (
    <ThemeProvider theme={theme} disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}
