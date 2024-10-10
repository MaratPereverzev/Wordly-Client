import { Divider as DividerMui } from "@mui/material";
import { memo } from "react";
import { areAlwaysEqual } from "@utils";

export const Divider = memo((props) => {
  const { sx, orientation, ...other } = props;
  return <DividerMui orientation={orientation} sx={{ ...sx }} {...other} />;
}, areAlwaysEqual);
