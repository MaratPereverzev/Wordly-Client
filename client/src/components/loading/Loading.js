import "./style.css";
import { Box } from "../Box";

export const Loading = (props) => {
  return (
    <Box flex center sx={{ width: "100%", height: "100%" }}>
      <Box className="spinner" />
    </Box>
  );
};
