import { Typography } from "@mui/material";
import { areEqual } from "@utils";
import { memo } from "react";

export const Text = memo((props) => {
  const { caption, ...other } = props;

  return <Typography {...other}>{caption}</Typography>;
}, areEqual);
