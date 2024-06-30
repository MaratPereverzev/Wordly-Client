import { Pagination } from "@mui/material";

const Default = (props) => {
  const { count, ...other } = props;

  return <Pagination size="small" count={count} {...other} />;
};

export { Default as Pagination };
