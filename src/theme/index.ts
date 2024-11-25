import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "rgba(0, 0, 0, 0.12)",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#000000",
      secondary: "#393E46",
    },
    secondary: {
      main: "#9c27b0",
      light: "#ba68c8",
      dark: "#7b1fa2",
      contrastText: "#fff",
    },
    divider: "#DDDDDD",
  },
  typography: {
    fontFamily: "Inter, Arial, sans-serif",
    h1: {
      fontSize: "32px",
      fontWeight: 700,
    },
    h2: {
      fontSize: "24px",
      fontWeight: 600,
    },
    h3: {
      fontSize: "18px",
      fontWeight: 500,
    },
    body1: {
      fontSize: "14px",
      fontWeight: 400,
    },
    button: {
      textTransform: "none",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
      paper: "#252525",
    },
    primary: {
      main: "#0077d9",
      contrastText: "#FFFFFF",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#FFFFFF",
    },
    secondary: {
      main: "#9c27b0",
      light: "#ba68c8",
      dark: "#7b1fa2",
      contrastText: "#fff",
    },
    divider: "#444444",
  },
  typography: {
    fontFamily: "Inter, Arial, sans-serif",
    h1: {
      fontSize: "32px",
      fontWeight: 700,
    },
    h2: {
      fontSize: "24px",
      fontWeight: 600,
    },
    h3: {
      fontSize: "18px",
      fontWeight: 500,
    },
    body1: {
      fontSize: "14px",
      fontWeight: 400,
    },
    button: {
      textTransform: "none",
    },
  },
});

export { lightTheme, darkTheme };
