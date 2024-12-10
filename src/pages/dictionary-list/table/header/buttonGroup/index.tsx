import { styled } from "@mui/material";
import { CreateDictionaryDialogContent } from "features/Dictionary/ui/createDictionary";
import { JSX } from "react";
import { useAppSelector } from "shared/hooks/useSelector";
import { Button, ButtonGroup, Popover } from "shared/ui";
import { dispatchEvent } from "shared/utils";

export const ActionGroup = (): JSX.Element => {
  const mode = useAppSelector((state) => state.dicitonaryReducer.mode);


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
        {mode?.isSelectMode ? (
          <StyledActionButton
            caption="delete"
            disabled={mode?.selectedItems.length === 0}
            icon="delete"
            variant="text"
            onClick={() => {
              dispatchEvent("onOpenDialog");
            }}
          />
        ): undefined}
      </Popover>
    </ButtonGroup>
  );
};

const StyledActionButton = styled(Button)(() => ({
  px: "4px",
  gap: "4px",
  justifyContent: "flex-start",
}));
