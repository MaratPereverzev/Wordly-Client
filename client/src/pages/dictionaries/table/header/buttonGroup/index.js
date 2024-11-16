import { Button, ButtonGroup, Popover } from "@components";
import { CreateDictionaryDialogContent } from "@dialog";
import { styled } from "@mui/material";
import { dispatchEvent } from "@utils";
import { useSelector } from "react-redux";

export const ActionGroup = () => {
  const mode = useSelector((store) => store.dictionaries.mode);

  return (
    <ButtonGroup caption="new">
      <Button
        caption="new"
        sx={{
          px: 1,
          backgroundColor: ({ palette }) => palette.primary.main,
        }}
        sxText={{
          color: ({ palette }) => palette.primary.contrastText,
        }}
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
            sxIcon={{
              color: ({ palette }) => palette.primary.contrastText,
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
