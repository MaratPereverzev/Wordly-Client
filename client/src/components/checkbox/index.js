import { Checkbox } from "@mui/material";

const Default = (props) => {
  const { sx, ...other } = props;
  return <Checkbox sx={{ ...sx }} {...other} />;
};

export { Default as Checkbox };
