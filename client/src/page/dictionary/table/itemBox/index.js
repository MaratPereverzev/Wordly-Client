import { memo } from "react";
import { areEqual, dispatchEvent } from "@utils";
import { Checkbox, Box } from "@components";

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

  return (
    <Box
      flex
      jc
      sx={{
        height: "8.5rem",
        border: ({ palette }) => `1px solid ${palette.divider}`,
        borderRadius: 1,
        cursor: "pointer",
        transition: "background-color 200ms ease-in-out",
        "&:hover": {
          backgroundColor: ({ palette }) => palette.divider,
        },
        ...sx,
      }}
      {...other}
    >
      <Box center flex grow>
        {caption}
      </Box>
      <Box>
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
      </Box>
    </Box>
  );
}, areEqual);

export { Default as ItemBox };
