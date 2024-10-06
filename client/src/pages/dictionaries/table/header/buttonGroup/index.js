import { ButtonGroup, Button, Popover } from "@components";
import { useCallback } from "react";
import { dispatchEvent } from "@utils";
import { CreateDictionaryDialogContent } from "@pages/dialog";

const Default = (props) => {
  const { selectMode, selectedItemsCount } = props;

  const handleOnClick = useCallback(() => {
    dispatchEvent("onSelectMode");
  }, []);

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
            icon="more"
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
          icon={!selectMode ? "select" : "selectOff"}
          caption={!selectMode ? "select" : "undo"}
          sx={{ px: 1, gap: 1, justifyContent: "flex-start" }}
          variant="text"
          onClick={handleOnClick}
        />
        {selectMode && (
          <Button
            caption="delete"
            disabled={selectedItemsCount === 0}
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
