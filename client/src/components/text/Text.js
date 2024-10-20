import { Typography } from "@mui/material";
import { areEqual } from "@utils";
import { memo } from "react";

export const Text = memo(({ caption, ...other }) => {
  return <Typography {...other}>{caption}</Typography>;
}, areEqual);
