import { Dialog as DialogMui, useMediaQuery, useTheme } from "@mui/material";
import { JSX, useEffect, useRef, useState } from "react";

import { addEventListener } from"@/shared/utils";

export const Dialog = () => {
  const [open, setOpen] = useState(false);
  const dialogContent = useRef<JSX.Element>(<></>);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(
    () =>
      addEventListener<{dialogContent: JSX.Element}>("onOpenDialog", (detail) => {
        dialogContent.current = detail.dialogContent;
        setOpen(true);
      }),
    []
  );

  useEffect(
    () =>
      addEventListener<{opened: boolean}>("dialog/trigger", (detail) => {
        if (detail?.opened !== null) setOpen((prev) => (prev = detail.opened));
      }),
    []
  );

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <DialogMui fullScreen={fullScreen} open={open} onClose={handleClose}>
        {dialogContent.current}
      </DialogMui>
    </>
  );
};
