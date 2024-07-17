import "./style.css";
import { Box } from "../box";
import { Text } from "../text";

const Default = () => {
  return (
    <Box flex center gap={2} grow>
      <Text caption="Something went wrong..." />
      <Box className="progress"></Box>
    </Box>
  );
};

export { Default as Error };
