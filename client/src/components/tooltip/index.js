import { Tooltip } from "@mui/material";

const Default = (props) => {
  const { title, ...other } = props;
  return <Tooltip title={title} {...other} />;
};

export { Default as Tooltip };
