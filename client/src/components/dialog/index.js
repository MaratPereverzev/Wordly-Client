import { Dialog, useMediaQuery, useTheme } from "@mui/material";
import { addEventListener } from "@utils";
import { useEffect, useRef, useState } from "react";

const Default = (props) => {
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

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose}>
        {dialogContent.current}
      </Dialog>
    </>
  );
};

export { Default as Dialog };
