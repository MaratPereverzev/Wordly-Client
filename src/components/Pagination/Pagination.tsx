import { Pagination as PaginationMui, PaginationProps } from "@mui/material";
import { memo } from "react";
import { areEqual } from "utils";

export const Pagination = memo(({ count, ...other }: PaginationProps) => {
  return <PaginationMui size="small" {...other} />;
}, areEqual);
