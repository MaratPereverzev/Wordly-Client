import { Divider } from "@mui/material";
import { memo } from "react";

const areEqual = () => true;

const Default = memo((props) => {
  const { sx, orientation, ...other } = props;
  return <Divider orientation={orientation} sx={{ ...sx }} {...other} />;
}, areEqual);

export { Default as Divider };
