import { Button, Divider } from "@components";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { addEventListener, dispatchEvent } from "@utils";
import { useState, useEffect } from "react";

const Default = (props) => {
  const { button, titleContent, actionsContent, content } = props;
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(
    () =>
      addEventListener("onOpenDialog", () => {
        setOpen(true);
      }),
    []
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    dispatchEvent("snackbarTrigger", {
      message: "Delete",
      status: "success",
    });
    setOpen(false);
  };

  return (
    <>
      {button && <button.type {...button.props} onClick={handleClickOpen} />}
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose}>
        {titleContent ?? <DialogTitle>{"Example dialog title"}</DialogTitle>}
        <Divider />
        {content ?? <DialogContent>{"Example dialog content"}</DialogContent>}
        <Divider />
        {actionsContent ?? (
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Disagree
            </Button>
            <Button onClick={handleClose} autoFocus>
              Agree
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </>
  );
};

export { Default as Dialog };
