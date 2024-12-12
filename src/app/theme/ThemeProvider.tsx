import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";

import { darkTheme, lightTheme } from "@/app/theme";
import { addEventListener } from "@/shared/utils";

type ThemeProviderProps = {
  children?: JSX.Element
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState("light");

  useEffect(
    () =>
      addEventListener("changeTheme", () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
      }),
    []
  );

  return (
    <MuiThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      {children}
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
