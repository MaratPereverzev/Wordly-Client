import { Box, Button } from "@components";
import { areEqual } from "@utils";
import { memo } from "react";
import { InputCaption } from "./inputCaption";
import { ActionGroup } from "./buttonGroup";

const Default = memo((props) => {
  const { selectMode, selectedItemsCount, query } = props;

  return (
    <Box flex jc="space-between" sx={{ p: 1 }} ai>
      <Box flex gap="5px">
        <ActionGroup
          selectMode={selectMode}
          selectedItemsCount={selectedItemsCount}
        />
        <Button icon="filter" variant="text" />
        <Button icon="sort" variant="text" />
      </Box>
      <InputCaption query={query} />
    </Box>
  );
}, areEqual);

export { Default as TableHeader };
