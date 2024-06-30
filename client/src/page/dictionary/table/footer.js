import { Box, Pagination, Text } from "@components";
import { dispatchEvent } from "@utils";
import { memo } from "react";

function areEqual(prev, next) {
  return (
    prev.page === next.page &&
    prev.setPage === next.setPage &&
    prev.pageCount === next.pageCount &&
    prev.selectMode === next.selectMode &&
    prev.selectCount === next.selectCount
  );
}
const Default = memo((props) => {
  const { page, setPage, selectMode, selectCount, pageCount = 1 } = props;

  return (
    <Box flex jc={selectMode ? "space-between" : "flex-end"} ai sx={{ p: 1 }}>
      {selectMode && <Text caption={`${selectCount} items selected`} />}
      <Pagination
        count={pageCount}
        page={page}
        onChange={(_, value) => {
          setPage(value);
          dispatchEvent("onChangePage/dictionary");
        }}
      />
    </Box>
  );
}, areEqual);

export { Default as TableFooter };
