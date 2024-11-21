import { Tooltip as TooltipMui } from "@mui/material";

export const Tooltip = ({ title, ...other }) => {
  return <TooltipMui title={title} {...other} />;
};
