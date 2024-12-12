import { Typography, TypographyProps } from "@mui/material";
import { areEqual } from "utils";
import { memo } from "react";

type TextProps = TypographyProps & {
  caption: string
}

export const Text = memo(({ sx, caption, ...other }: TextProps) => {
  return (
    <Typography
      sx={{ color: (theme) => theme.palette.text.primary, ...sx }}
      {...other}
    >
      {caption}
    </Typography>
  );
}, areEqual);
