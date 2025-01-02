import { CreateDictionaryDialogContent } from "features/Dictionary/ui/modal-content";
import { Button, ButtonGroup, Popover, Text } from "shared/ui";
import { dispatchEvent } from "shared/utils";

export const ActionGroup = () => {
  return (
    <ButtonGroup>
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
        <Text caption="coming soon" />
      </Popover>
    </ButtonGroup>
  );
};
