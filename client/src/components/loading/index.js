import "./style.css";
import { Box } from "../box";

const Default = (props) => {
  return (
    <Box flex center sx={{ width: "100%", height: "100%" }}>
      <Box className="spinner" />
    </Box>
  );
};

export { Default as Loading };
