import { useState, useEffect, useRef } from "react";
import { addEventListener } from "@utils";
import { Snackbar, Alert } from "@mui/material";

const Default = (props) => {
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
    <Snackbar
      autoHideDuration={2000}
      anchorOrigin={{ vertical, horizontal }}
      open={state.open}
      onClose={handleClose}
      message={data.current?.message}
      key={vertical + horizontal}
    >
      <Alert severity={data.current?.status ?? "error"} sx={{ width: "100%" }}>
        {data.current?.message}
      </Alert>
    </Snackbar>
  );
};

export { Default as Snackbar };
