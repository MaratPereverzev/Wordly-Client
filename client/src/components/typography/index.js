import { Typography } from "@mui/material";

const Default = (props) => {
  const { sx, caption, ...other } = props;
  return (
    <Typography sx={{ ...sx }} {...other}>
      {caption}
      {other.children}
    </Typography>
  );
};

export { Default as Typography };
