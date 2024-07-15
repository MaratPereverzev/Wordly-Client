import { Box, Button, ButtonGroup, Input, Popover } from "@components";
import { areEqual, dispatchEvent } from "@utils";
import { memo, useCallback, useState, useEffect } from "react";

const InputBox = (props) => {
  const [data, setData] = useState({});

  const handleOnChange = useCallback(
    (name) => (e) => {
      setData((prev) => {
        prev[name] = e?.target?.value;
        return { ...prev };
      }, []);
    },
    []
  );

  useEffect(() => {
    dispatchEvent("onChangeQuery", { query: data["search"] });
  }, [data]);

  return <Input name="search" onChange={handleOnChange} />;
};

const Default = memo((props) => {
  const { selectMode, selectedItemsCount } = props;

  const handleOnClick = useCallback(() => {
    dispatchEvent("onSelectMode");
  }, []);

  return (
    <Box flex jc="space-between" sx={{ p: 1 }} ai>
      <Box flex gap="5px">
        <ButtonGroup caption="new">
          <Button caption="new" sx={{ px: 1 }} />
          <Popover
            boxProps={{ gap: true }}
            sxPopover={{ p: 0.5 }}
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
            <Button
              icon={!selectMode ? "select" : "selectOff"}
              caption={!selectMode ? "select" : "undo"}
              sx={{ px: 1, gap: 1, justifyContent: "flex-start" }}
              variant="text"
              onClick={handleOnClick}
            />
            {selectMode && (
              <Button
                caption="delete"
                disabled={selectedItemsCount === 0}
                icon="delete"
                variant="text"
                sx={{ px: 1, gap: 1, justifyContent: "flex-start" }}
                onClick={() => {
                  dispatchEvent("onOpenDialog");
                }}
              />
            )}
          </Popover>
        </ButtonGroup>
        <Button icon="filter" variant="text" />
        <Button icon="sort" variant="text" />
      </Box>
      <InputBox />
    </Box>
  );
}, areEqual);

export { Default as TableHeader };
