import { changeSelectMode } from "entities/Dictionary/store";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "shared/hooks";
import { Box, Button } from "shared/ui";
import { ActionGroup } from "features/Dictionary/ui";

export const ActionsButtons = () => {
  const mode = useAppSelector((state) => state.dicitonaryReducer.mode);

  const dispatch = useDispatch();

  const handleOnClick = useCallback(() => {
    dispatch(changeSelectMode());
  }, [dispatch]);

  return <Box flex gap="5px">
    <ActionGroup />
    <Button icon="filter" variant="text" />
    <Button icon="sort" variant="text" />
    <Button
      placement="bottom"
      icon={mode?.isSelectMode ? "checkboxFilled" : "checkboxEmpty"}
      title={!mode?.isSelectMode ? "select" : "undo"}
      variant="text"
      onClick={handleOnClick}
    />
  </Box>
}
