import "./style.css";
import { Box } from "../Box";
import { Text } from "../Text";

export const Error = () => {
  return (
    <Box flex center gap={2} grow>
      <Text caption="Something went wrong..." />
      <Box className="progress"></Box>
    </Box>
  );
};
