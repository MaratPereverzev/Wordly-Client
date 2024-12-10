import { Pagination as PaginationMui, PaginationProps } from "@mui/material";

export const Pagination = ({ count, ...other }: PaginationProps) => {
  return <PaginationMui size="small" {...other} />;
}
