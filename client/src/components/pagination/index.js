import { Pagination } from "@mui/material";
import { memo } from "react";
import { areEqual } from "@utils";

const Default = memo((props) => {
  const { count, ...other } = props;

  return <Pagination size="small" count={count} {...other} />;
}, areEqual);

export { Default as Pagination };
