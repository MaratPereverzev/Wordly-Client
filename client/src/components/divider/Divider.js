import { Divider as DividerMui } from "@mui/material";
import { memo } from "react";
import { areAlwaysEqual } from "@utils";

export const Divider = memo((props) => {
  return <DividerMui {...props} />;
}, areAlwaysEqual);
