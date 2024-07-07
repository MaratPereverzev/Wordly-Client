import { Box, Pagination, Text } from "@components";
import { dispatchEvent, areEqual } from "@utils";
import { memo, useCallback } from "react";

const Default = memo((props) => {
  const { page, setPage, selectMode, selectCount, pageCount } = props;

  const handleOnChange = useCallback(
    (_, value) => {
      setPage(value);
      dispatchEvent("onChangePage/dictionary");
    },
    [setPage]
  );

  return (
    <Box flex jc={selectMode ? "space-between" : "flex-end"} ai sx={{ p: 1 }}>
      <Box>
        {selectMode && selectCount > 0 && (
          <Text caption={`${selectCount} items selected`} />
        )}
      </Box>
      <Pagination
        count={isNaN(pageCount) ? 1 : pageCount}
        page={page}
        onChange={handleOnChange}
      />
    </Box>
  );
}, areEqual);

export { Default as TableFooter };
