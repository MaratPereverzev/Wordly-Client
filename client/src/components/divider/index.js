import { Divider } from "@mui/material";

const Default = (props) => {
  const { sx, orientation, ...other } = props;
  return <Divider orientation={orientation} sx={{ ...sx }} {...other} />;
};

export { Default as Divider };
