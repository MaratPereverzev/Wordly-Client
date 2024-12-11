import { JSX } from "react";

import { changeQuerySearch } from "@/entities/Dictionary/store";
import { InputQueryFilter } from "@/features/ui/input-query-filter";
import { Box } from "@/shared/ui";
import { ActionsButtons } from "./actions-buttons";

export const TableHeader = (): JSX.Element => {
  return (
    <Box
      flex
      jc="space-between"
      sx={{ p: 1, backgroundColor: ({palette}) => palette.background.default }}
      ai
    >
      <ActionsButtons />
      <InputQueryFilter queryField="caption" storeDispatchFn={changeQuerySearch}/>
    </Box>
  );
};
