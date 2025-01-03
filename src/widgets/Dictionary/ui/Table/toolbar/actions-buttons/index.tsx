import { useCallback } from "react";

import { useDictionaryStore } from "entities/Dictionary/store";
import { ActionGroup } from "features/Dictionary/ui";
import { Box, Button } from "shared/ui";

export const ActionsButtons = () => {
  const {isSelectMode, changeSelectMode} = useDictionaryStore(state => state.mode);

  const handleOnClick = useCallback(() => {
    changeSelectMode();
  }, []);

  return <Box flex gap="5px">
    <ActionGroup />
    <Button icon="filter" variant="text" />
    <Button icon="sort" variant="text" />
    <Button
      placement="bottom"
      icon={isSelectMode ? "checkboxFilled" : "checkboxEmpty"}
      title={isSelectMode ? "select" : "undo"}
      variant="text"
      onClick={handleOnClick}
    />
  </Box>
}
