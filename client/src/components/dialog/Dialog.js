import { Dialog as DialogMui, useMediaQuery, useTheme } from "@mui/material";
import { addEventListener } from "@utils";
import { useEffect, useRef, useState } from "react";

export const Dialog = (props) => {
  const [open, setOpen] = useState(false);
  const dialogContent = useRef(null);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(
    () =>
      addEventListener("onOpenDialog", ({ detail }) => {
        dialogContent.current = detail?.dialogContent;
        setOpen(true);
      }),
    []
  );

  useEffect(
    () =>
      addEventListener("dialogTrigger", ({ detail }) => {
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
