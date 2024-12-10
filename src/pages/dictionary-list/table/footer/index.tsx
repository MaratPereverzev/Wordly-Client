import { changePage } from "entities/Dictionary/store";
import { useDispatch } from "react-redux";
import { useAppSelector } from "shared/hooks/useSelector";
import { Box, Pagination, Text } from "shared/ui";

export const TableFooter = () => {
  const {pagination, mode} = useAppSelector(
    (state) => state.dicitonaryReducer
  );

  const dispatch = useDispatch();

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
      {pagination?.totalPages! > 1 && (
        <Pagination
          count={pagination?.totalPages}
          page={pagination?.totalPages}
          onChange={(_: any, value: number) => {
            dispatch(changePage({pageToShow: value}));
          }}
        />
      )}
    </Box>
  );
};
