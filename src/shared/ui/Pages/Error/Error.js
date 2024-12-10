import "./style.css";
import { Box } from "@components/Box";
import { Text } from "@components/Text";

export const Error = () => {
  return (
    <Box flex center gap={2} grow>
      <Text caption="Something went wrong..." />
      <Box className="progress" />
    </Box>
  );
};
