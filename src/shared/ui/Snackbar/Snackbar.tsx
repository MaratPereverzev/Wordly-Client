import { useState, useEffect, useRef } from "react";
import { Snackbar as SnackbarMui, Alert, SnackbarProps } from "@mui/material";

import { addEventListener } from "shared/utils";

type SnackbarPayload = {message?: string, status?: "success" | "warning" | "error" | "info"}

export const Snackbar = (props: SnackbarProps): React.JSX.Element => {
  const data = useRef<SnackbarPayload | null>(null);

  const [state, setState] = useState({
    open: false,
  });

  const handleClose = () => {
    setState((prev) => {
      prev = { ...state, open: false };
      return prev;
    });
  };

  useEffect(
    () =>
      addEventListener<SnackbarPayload>("snackbar/trigger", (detail) => {
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
      open={state.open}
      onClose={handleClose}
      message={data.current?.message}
      {...props}
    >
      <Alert
        severity={data.current?.status ?? "info"}
        sx={{ width: "100%" }}
      >
        {data.current?.message ?? "you haven't set any messages for this action"}
      </Alert>
    </SnackbarMui>
  );
};
