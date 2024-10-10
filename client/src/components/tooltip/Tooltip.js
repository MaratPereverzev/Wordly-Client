import { Tooltip as TooltipMui } from "@mui/material";

export const Tooltip = (props) => {
  const { title, ...other } = props;
  return <TooltipMui title={title} {...other} />;
};
