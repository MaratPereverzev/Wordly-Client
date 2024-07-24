import { Box, Pagination, Text } from "@components";
import { areEqual, addEventListener, dispatchEvent } from "@utils";
import { memo, useCallback, useEffect, useState } from "react";

const Default = memo((props) => {
  const { page, setPage, selectMode, selectCount, itemsPerPage } = props;
  const [pageCount, setPageCount] = useState(0);

  const handleOnChange = useCallback(
    (_, value) => {
      setPage(value);
      dispatchEvent("onChangeQuery/dictionary", {
        offset: itemsPerPage * (value - 1),
      });
    },
    [setPage, itemsPerPage]
  );

  useEffect(
    () =>
      addEventListener("onLoadData/dictionary", ({ detail }) => {
        setPageCount((prev) => (prev = detail.pageCount));
      }),
    []
  );

  return (
    <Box flex jc={selectMode ? "space-between" : "flex-end"} ai sx={{ p: 1 }}>
      <Box>
        {selectMode && selectCount > 0 && (
          <Text caption={`${selectCount} items selected`} />
        )}
      </Box>
      {pageCount > 0 && (
        <Pagination
          count={isNaN(pageCount) ? 1 : pageCount}
          page={page}
          onChange={handleOnChange}
        />
      )}
    </Box>
  );
}, areEqual);

export { Default as TableFooter };
