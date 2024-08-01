import { Button, Box } from "@components";
import { dispatchEvent } from "@utils";

const Default = () => {
  return (
    <Box flex jc="flex-end" gap sx={{ paddingTop: 4 }}>
      <Button
        color="error"
        caption="Delete"
        sxText={{ px: 1 }}
        onClick={() => {
          dispatchEvent("dialogTrigger", { opened: false });
          dispatchEvent("onDeleteDicitonary");
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

export { Default as Actions };
