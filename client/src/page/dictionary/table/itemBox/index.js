import { memo } from "react";
import { areEqual, dispatchEvent } from "@utils";
import { Checkbox, Box, Popover, ButtonIcon, Button, Text } from "@components";

const Default = memo((props) => {
  const {
    sx,
    caption,
    selectMode,
    setSelectCount,
    selectedItems,
    itemId,
    checked,
    ...other
  } = props;

  const handleOnClick = () => {
    dispatchEvent("onOpenDialog");
  };

  return (
    <Box
      flex
      jc
      sx={{
        height: "200px",
        border: ({ palette }) => `1px solid ${palette.divider}`,
        borderRadius: 1,
        transition: "background-color 200ms ease-in-out",
        ...sx,
      }}
      {...other}
    >
      <Box flex grow sx={{ p: 3 }}>
        <Box
          sx={{
            width: "80px",
            height: "80px",
            backgroundColor: "black",
            borderRadius: 1,
          }}
        />
        <Box flex sx={{ p: 1 }}>
          <Text caption={caption} />
        </Box>
      </Box>
      <Box flex column sx={{ p: 1 }} jc="space-between">
        <Box flex jc="flex-end">
          {selectMode && (
            <Checkbox
              checked={checked}
              onChange={(e) => {
                dispatchEvent(`onCheck/dictionary`, {
                  id: itemId,
                  checked: e?.target?.checked,
                });
                e.target.checked
                  ? setSelectCount((prev) => prev + 1)
                  : setSelectCount((prev) => prev - 1);
              }}
            />
          )}
          <Popover
            className="popover"
            boxProps={{ gap: true }}
            closeOnClick
            button={<ButtonIcon icon="moreOptions" />}
            sxPopover={{ p: 0.5 }}
          >
            <Button
              icon="delete"
              variant="text"
              caption="delete"
              onClick={handleOnClick}
            />
            <Button
              icon="delete"
              variant="text"
              caption="delete"
              onClick={handleOnClick}
            />
          </Popover>
        </Box>

        <Button
          color="inherit"
          caption="explore"
          icon="explore"
          variant="text"
          iconAtTheEnd
          sx={{
            gap: 1,
            borderRadius: 2,
          }}
        />
      </Box>
    </Box>
  );
}, areEqual);

export { Default as ItemBox };
