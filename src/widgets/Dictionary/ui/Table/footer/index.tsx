import { Pagination } from "features/Dictionary/ui/pagination";
import { useAppSelector } from "shared/hooks/useSelector";
import { Box, Text } from "shared/ui";

export const Footer = () => {
  const {mode} = useAppSelector(
    (state) => state.dicitonaryReducer
  );

  return (
    <Box
      flex
      jc={mode?.isSelectMode ? "space-between" : "flex-end"}
      ai
      sx={{ p: 1 }}
    >
      <Box>
        {mode?.isSelectMode && mode?.selectedItems.length > 0 && (
          <Text caption={`${mode?.selectedItems.length} items selected`} />
        )}
      </Box>
      <Pagination />
    </Box>
  );
};
