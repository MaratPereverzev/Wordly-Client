import { InputQueryFilter } from"@/features/ui/input-query-filter";
import { Box } from"@/shared/ui";
import { ActionsButtons } from "./actions-buttons";

export const Toolbar = () => {
  return (
    <Box
      flex
      jc="space-between"
      sx={{ p: 1, backgroundColor: ({palette}) => palette.background.paper, borderRadius: 2 }}
      ai
    >
      <ActionsButtons />
      <InputQueryFilter queryField="caption"/>
    </Box>
  );
};
