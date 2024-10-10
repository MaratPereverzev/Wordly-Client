import { Pagination as PaginationMui } from "@mui/material";
import { memo } from "react";
import { areEqual } from "@utils";

export const Pagination = memo((props) => {
  const { count, ...other } = props;

  return <PaginationMui size="small" count={count} {...other} />;
}, areEqual);
