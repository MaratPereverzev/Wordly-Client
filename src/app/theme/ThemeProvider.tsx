import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";

import { darkTheme, lightTheme } from "app/theme";
import { addEventListener } from "shared/utils";

type ThemeProviderProps = {
  children?: JSX.Element
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const isLightTheme = () => window.matchMedia("(prefers-color-scheme: light)").matches
  const [theme, setTheme] = useState("light");

  useEffect(
    () =>
      addEventListener<{theme: string} | undefined>("changeTheme", (detail) => {
        if(detail?.theme) setTheme(() => detail.theme)
        else setTheme((prev) => (prev === "light" ? "dark" : "light"));
      }),
    []
  );

  return (
    <MuiThemeProvider theme={theme === "light" || (theme === "system" && isLightTheme()) ? lightTheme : darkTheme}>
      {children}
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
