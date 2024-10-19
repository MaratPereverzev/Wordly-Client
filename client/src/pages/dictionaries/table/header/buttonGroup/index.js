import { Button, ButtonGroup, Popover } from "@components";
import { CreateDictionaryDialogContent } from "@pages/dialog";
import { changeSelectMode } from "@store/dictionaries";
import { dispatchEvent } from "@utils";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

const Default = () => {
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
        <Button
          icon={mode?.isSelectMode ? "checkboxFilled" : "checkboxEmpty"}
          caption={mode?.isSelectMode ? "select" : "undo"}
          sx={{ px: 1, gap: 1, justifyContent: "flex-start" }}
          variant="text"
          onClick={handleOnClick}
        />
        {mode?.isSelectMode && (
          <Button
            caption="delete"
            disabled={mode?.selectedItems === 0}
            icon="delete"
            variant="text"
            sx={{ px: 1, gap: 1, justifyContent: "flex-start" }}
            onClick={() => {
              dispatchEvent("onOpenDialog");
            }}
          />
        )}
      </Popover>
    </ButtonGroup>
  );
};

export { Default as ActionGroup };
