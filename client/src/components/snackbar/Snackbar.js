import { useState, useEffect, useRef } from "react";
import { addEventListener } from "@utils";
import { Snackbar as SnackbarMui, Alert } from "@mui/material";

export const Snackbar = (props) => {
  const { vertical = "top", horizontal = "center" } = props;
  const data = useRef(null);

  const [state, setState] = useState({
    open: false,
    vertical,
    horizontal,
  });

  const handleClose = () => {
    setState((prev) => {
      prev = { ...state, open: false };
      return prev;
    });
  };

  useEffect(
    () =>
      addEventListener("snackbarTrigger", ({ detail }) => {
        data.current = detail;

        setState((prev) => {
          prev = { ...prev, open: true };
          return prev;
        });
      }),
    [setState, state]
  );

  return (
    <SnackbarMui
      autoHideDuration={2000}
      anchorOrigin={{ vertical, horizontal }}
      open={state.open}
      onClose={handleClose}
      message={data.current?.message}
      key={vertical + horizontal}
    >
      {data.current?.status ? (
        <Alert
          severity={data.current?.status ?? "error"}
          sx={{ width: "100%" }}
        >
          {data.current?.message}
        </Alert>
      ) : (
        data.current?.message
      )}
    </SnackbarMui>
  );
};
