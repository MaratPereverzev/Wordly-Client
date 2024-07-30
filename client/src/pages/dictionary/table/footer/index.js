import { Box, Pagination, Text } from "@components";
import { addEventListener, areEqual, dispatchEvent } from "@utils";
import { memo, useEffect, useState } from "react";

const Default = memo((props) => {
  const { page, setPage, selectMode, selectCount } = props;
  const [pageCount, setPageCount] = useState(0);

  useEffect(
    () =>
      addEventListener("onLoadData/dictionary", ({ detail }) => {
        setPageCount((prev) => (prev = detail.pageCount));
      }),
    []
  );

  useEffect(() => {
    dispatchEvent("onReload");
  }, [page]);

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
          onChange={(_, value) => {
            setPage(value);
          }}
        />
      )}
    </Box>
  );
}, areEqual);

export { Default as TableFooter };
