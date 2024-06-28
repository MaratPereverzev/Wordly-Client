import { Input, Box, Button } from "@components";

const Default = () => {
  return (
    <Box flex jc="space-between" sx={{ p: 1 }} ai>
      <Input
        sx={{
          ".css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input": {
            p: 0.5,
          },
        }}
      />
      <Box flex gap="5px">
        <Button icon="filter" variant="text" />
        <Button icon="search" variant="text" />
        <Button caption="new" sx={{ px: 1 }} />
      </Box>
    </Box>
  );
};

export { Default as TableHeader };
