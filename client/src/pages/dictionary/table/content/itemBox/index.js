import { Box, Text, ButtonIcon } from "@components";
import { DeleteDictionaryDialog } from "@dialog";
import { areEqual, dispatchEvent } from "@utils";
import { memo } from "react";
/*
{
  selectMode && (
    <Checkbox
      checked={checked}
      onChange={(e) => {
        dispatchEvent("onCheck/dictionary", {
          id: itemId,
          checked: e?.target?.checked,
        });
        e.target.checked
          ? setSelectCount((prev) => prev + 1)
          : setSelectCount((prev) => prev - 1);
      }}
    />
  );
}
*/

const Default = memo((props) => {
  const {
    sx,
    data,
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
        aspectRatio: "16/10",
        border: ({ palette }) => `1px solid ${palette.divider}`,
        borderRadius: 3,
        ...sx,
      }}
      {...other}
    >
      <Box flex grow sx={{ p: 1 }}>
        <Box flex column grow>
          <Box
            flex
            column
            grow
            sx={{
              p: 1,
              background: "#f9f6fe",
              backgroundSize: "cover",
              borderTopRightRadius: "8px",
              borderTopLeftRadius: "8px",
            }}
          >
            <Box flex gap="5px" jc="flex-end">
              <ButtonIcon icon="saved" />
              <ButtonIcon
                icon="delete"
                sx={{
                  "&:hover": { color: "#E41F1F" },
                  transition: "color 200ms ease-in-out",
                }}
                onClick={() => {
                  dispatchEvent("onOpenDialog", {
                    dialogContent: <DeleteDictionaryDialog id={data.id} />,
                  });
                }}
              />
            </Box>
          </Box>
          <Box sx={{ p: 1 }}>
            <Text caption={data?.caption} sx={{ fontSize: "20px" }} />
            <Text
              caption={data?.description}
              sx={{ fontSize: "12px", color: "grey", grow: 1 }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}, areEqual);

export { Default as ItemBox };
