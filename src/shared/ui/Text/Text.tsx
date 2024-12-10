import { Typography, TypographyProps } from "@mui/material";

type TextProps = TypographyProps & {
  caption: string
}

export const Text = ({ sx, caption, ...other }: TextProps) => {
  return (
    <Typography
      sx={{ color: (theme) => theme.palette.text.primary, ...sx }}
      {...other}
    >
      {caption}
    </Typography>
  );
}