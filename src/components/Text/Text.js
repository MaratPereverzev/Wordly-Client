import { Typography } from "@mui/material";
import { areEqual } from "@utils";
import { memo } from "react";

export const Text = memo(({ sx, caption, ...other }) => {
  return (
    <Typography
      sx={{ color: (theme) => theme.palette.text.primary, ...sx }}
      {...other}
    >
      {caption}
    </Typography>
  );
}, areEqual);
