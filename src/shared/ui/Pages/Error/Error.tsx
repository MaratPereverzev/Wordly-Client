import "./style.css";

import { Box } from"@/shared/ui/Box";
import { Text } from"@/shared/ui/Text";

export const Error = () => {
  return (
    <Box flex center gap={2} grow>
      <Text caption="Something went wrong..." />
      <Box className="progress" />
    </Box>
  );
};
