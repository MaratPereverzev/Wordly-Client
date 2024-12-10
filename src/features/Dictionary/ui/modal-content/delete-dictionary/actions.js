import { Button, Box } from "shared/ui";
import { dispatchEvent } from "@utils";
import { useDelDictionary } from "@fetch/useDictionaries";

export const Actions = ({ id }) => {
  const { mutate } = useDelDictionary();

  const onClick = () => {
    mutate({ id });
  };

  return (
    <Box flex jc="flex-end" gap sx={{ paddingTop: 4 }}>
      <Button
        color="error"
        caption="Delete"
        sxText={{ px: 1 }}
        onClick={() => {
          dispatchEvent("dialogTrigger", { opened: false });
          onClick();
        }}
      />
      <Button
        caption="Cancel"
        variant="text"
        sxText={{ px: 1 }}
        onClick={() => {
          dispatchEvent("dialogTrigger", { opened: false });
        }}
      />
    </Box>
  );
};
