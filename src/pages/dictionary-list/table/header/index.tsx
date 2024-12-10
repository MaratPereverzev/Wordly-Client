import { changeSelectMode } from "store/dictionaries";
import { Box, Button } from "components";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionGroup } from "./buttonGroup";
import { InputCaption } from "./inputCaption";
import { useAppSelector } from "hooks/useSelector";

export const TableHeader = () => {
  const mode = useAppSelector((state) => state.dicitonariesReducer.mode);

  const dispatch = useDispatch();

  const handleOnClick = useCallback(() => {
    dispatch(changeSelectMode());
  }, [dispatch]);

  return (
    <Box
      flex
      jc="space-between"
      sx={{ p: 1, backgroundColor: ({palette}) => palette.background.default }}
      ai
    >
      <Box flex gap="5px">
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
      <InputCaption />
    </Box>
  );
};