import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { colorSchemes, typography, shadows, shape } from "./themePrimitives";
import { inputCustomizations } from "./customizations/input/inputCustomizations";
import { cardCustomization } from "./customizations/card/cardCustomization";

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
          components: {
            ...inputCustomizations,
            ...cardCustomization,
          },
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
