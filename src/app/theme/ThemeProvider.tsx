import React, { useEffect, useState } from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { lightTheme, darkTheme } from "./theme"; // Import your themes
import { addEventListener } from "shared/utils";

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
