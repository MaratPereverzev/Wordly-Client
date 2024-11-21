import { Pagination as PaginationMui } from "@mui/material";
import { memo } from "react";
import { areEqual } from "@utils";

export const Pagination = memo(({ count, ...other }) => {
  return <PaginationMui size="small" count={count} {...other} />;
}, areEqual);
