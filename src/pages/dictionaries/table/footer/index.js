import { Box, Pagination, Text } from "@components";
import { changePage } from "@store/dictionaries";
import { useDispatch, useSelector } from "react-redux";

export const TableFooter = () => {
  const pagination = useSelector((store) => store.dictionaries.pagination);
  const mode = useSelector((store) => store.dictionaries.mode);

  const dispatch = useDispatch();

  return (
    <Box
      flex
      jc={mode.isSelectMode ? "space-between" : "flex-end"}
      ai
      sx={{ p: 1 }}
    >
      <Box>
        {mode.isSelectMode && mode.selectedItems.length > 0 && (
          <Text caption={`${mode.selectedItems.length} items selected`} />
        )}
      </Box>
      {pagination.pageCount > 1 && (
        <Pagination
          count={pagination.pageCount}
          page={pagination.page}
          onChange={(_, value) => {
            dispatch(changePage({ page: value }));
          }}
        />
      )}
    </Box>
  );
};
