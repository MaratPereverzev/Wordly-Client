import { useDictionaryStore } from "entities/Dictionary/store";
import { Pagination } from "features/Dictionary/ui/pagination";
import { Box, Text } from "shared/ui";

export const Footer = () => {
  const {selectedItems, isSelectMode} = useDictionaryStore(state => state.mode)

  return (
    <Box
      flex
      jc={isSelectMode ? "space-between" : "flex-end"}
      ai
      sx={{ p: 1 }}
    >
      <Box>
        {isSelectMode && selectedItems.length > 0 && (
          <Text caption={`${selectedItems.length} items selected`} />
        )}
      </Box>
      <Pagination />
    </Box>
  );
};
