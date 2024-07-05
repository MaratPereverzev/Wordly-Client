import { Box, Pagination, Text } from "@components";
import { dispatchEvent, areEqual } from "@utils";
import { memo } from "react";

const Default = memo((props) => {
  const { page, setPage, selectMode, selectCount, pageCount = 1 } = props;

  return (
    <Box flex jc={selectMode ? "space-between" : "flex-end"} ai sx={{ p: 1 }}>
      {selectMode && <Text caption={`${selectCount} items selected`} />}
      <Pagination
        count={isNaN(pageCount) ? 1 : pageCount}
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
