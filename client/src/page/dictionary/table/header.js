import { Input, Box, Button, ButtonGroup, Popover } from "@components";
import { dispatchEvent, areEqual } from "@utils";
import { memo } from "react";

const Default = memo((props) => {
  const { selectMode } = props;

  return (
    <Box flex jc="space-between" sx={{ p: 1 }} ai>
      <Box flex gap="5px">
        <ButtonGroup caption="new">
          <Button caption="new" sx={{ px: 1 }} />
          <Popover
            closeOnClick
            button={
              <Button
                icon="more"
                sx={{
                  p: 0,
                }}
              />
            }
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <Box flex column gap sx={{ p: 1 }}>
              <Button
                icon={!selectMode ? "select" : "selectOff"}
                caption={!selectMode ? "select" : "undo"}
                sx={{ px: 1, gap: 1, justifyContent: "flex-start" }}
                variant="text"
                onClick={() => {
                  dispatchEvent("onSelectMode");
                }}
              />
              <Button caption="ok" />
            </Box>
          </Popover>
        </ButtonGroup>
        <Button icon="filter" variant="text" />
        <Button icon="sort" variant="text" />
      </Box>
      <Input
        placeholder="search"
        sx={{
          ".css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input": {
            p: 0.5,
          },
        }}
      />
    </Box>
  );
}, areEqual);

export { Default as TableHeader };
