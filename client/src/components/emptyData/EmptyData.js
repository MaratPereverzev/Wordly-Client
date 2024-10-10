import { Box } from "../Box";
import { Icon } from "../Icon";
import { Text } from "../Text";

export const EmptyData = (props) => {
  const { message, icon } = props;
  return (
    <Box flex grow center column sx={{ color: "grey" }}>
      <Icon icon={icon} sx={{ ".span": { fontSize: "70px" } }} />
      <Text caption={message} sx={{ fontSize: "25px" }} />
    </Box>
  );
};
