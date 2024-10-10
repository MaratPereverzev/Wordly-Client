import { Typography } from "@mui/material";
import { areEqual } from "@utils";
import { memo } from "react";

export const Text = memo((props) => {
  const { sx, caption, ...other } = props;

  return (
    <Typography sx={{ ...sx }} {...other}>
      {caption}
    </Typography>
  );
}, areEqual);
