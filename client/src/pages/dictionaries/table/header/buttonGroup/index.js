import { Button, ButtonGroup, Popover } from "@components";
import { styled } from "@mui/material";
import { CreateDictionaryDialogContent } from "@dialog";
import { changeSelectMode } from "@store/dictionaries";
import { dispatchEvent } from "@utils";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

export const ActionGroup = () => {
  const mode = useSelector((store) => store.dictionaries.mode);

  const dispatch = useDispatch();

  const handleOnClick = useCallback(() => {
    dispatch(changeSelectMode());
  }, [dispatch]);

  return (
    <ButtonGroup caption="new">
      <Button
        caption="new"
        sx={{ px: 1 }}
        onClick={() => {
          dispatchEvent("onOpenDialog", {
            dialogContent: <CreateDictionaryDialogContent />,
          });
        }}
      />
      <Popover
        boxProps={{ gap: true }}
        sxPopover={{ p: 0.5 }}
        closeOnClick
        button={
          <Button
            icon="dropdown"
            sx={{
              p: 0,
            }}
          />
        }
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <StyledActionButton
          icon={mode?.isSelectMode ? "checkboxFilled" : "checkboxEmpty"}
          caption={mode?.isSelectMode ? "select" : "undo"}
          variant="text"
          onClick={handleOnClick}
        />
        {mode?.isSelectMode && (
          <StyledActionButton
            caption="delete"
            disabled={mode?.selectedItems === 0}
            icon="delete"
            variant="text"
            onClick={() => {
              dispatchEvent("onOpenDialog");
            }}
          />
        )}
      </Popover>
    </ButtonGroup>
  );
};

const StyledActionButton = styled(Button)(() => ({
  px: "4px",
  gap: "4px",
  justifyContent: "flex-start",
}));
