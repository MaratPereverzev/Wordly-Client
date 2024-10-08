import { Box, Pagination, Text } from "@components";
import { changePage } from "@store/dictionaries";
import { areEqual } from "@utils";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";

export const TableFooter = memo(() => {
  const dictionaries = useSelector((store) => store.dictionaries);
  const dispatch = useDispatch();

  return (
    <Box
      flex
      jc={dictionaries.isSelectMode ? "space-between" : "flex-end"}
      ai
      sx={{ p: 1 }}
    >
      <Box>
        {dictionaries.isSelectMode && dictionaries.selectedItemsCount > 0 && (
          <Text caption={`${dictionaries.selectedItemsCount} items selected`} />
        )}
      </Box>
      {dictionaries.pageCount > 1 && (
        <Pagination
          count={isNaN(dictionaries.pageCount) ? 1 : dictionaries.pageCount}
          page={dictionaries.page}
          onChange={(_, value) => {
            dispatch(changePage({ page: value }));
          }}
        />
      )}
    </Box>
  );
}, areEqual);
