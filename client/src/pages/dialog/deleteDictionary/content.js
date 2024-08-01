import { Box, Text } from "@components";

const Default = () => {
  return (
    <Box flex center column sx={{ p: 2, color: "#696969" }}>
      <Text
        caption="Delete dictionary"
        sx={{ fontSize: "30px", paddingBottom: 1, color: "black" }}
      />
      <Text caption="Are you sure you want to delete this dictionary?" />
      <Text caption="This action cannot be undone." />
    </Box>
  );
};

export { Default as Content };
