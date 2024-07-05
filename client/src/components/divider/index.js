import { Divider } from "@mui/material";
import { memo } from "react";
import { areAlwaysEqual } from "@utils";

const Default = memo((props) => {
  const { sx, orientation, ...other } = props;
  return <Divider orientation={orientation} sx={{ ...sx }} {...other} />;
}, areAlwaysEqual);

export { Default as Divider };
