import React, { useEffect, useState } from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { lightTheme, darkTheme } from "./theme"; // Import your themes
import { addEventListener } from "@utils";

const ThemeProvider = ({ children }) => {
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
