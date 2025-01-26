import { WordInstance } from "@/shared/api/word/model";
import type { TableProps } from "@mui/material";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { flexRender, Header, Row } from "@tanstack/react-table";

type BasicTableProps = TableProps & {
  //table: Table<WordInstance>,
  alignHeadCell ?: "center" | "left" | "right" | "inherit" | "justify",
  alignBodyCell ?: "center" | "left" | "right" | "inherit" | "justify",
  bodyRows?: Row<WordInstance>[],
  headRows?: Header<WordInstance, unknown>[]
}

export const BasicTable = ({
  //table,
  bodyRows = [],
  headRows = [],
}: BasicTableProps) => {
  return (
    <TableContainer sx={{overflow: "auto"}} component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {headRows.map((headRow) => <TableCell align={headRow.id === "id" ? "left": "center"}key={headRow.id} colSpan={headRow.colSpan} sx={{width: headRow.column.getSize()}}>{flexRender(headRow.column.columnDef.header, headRow.getContext())}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {bodyRows.map(row => (
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
            >
              {row.getVisibleCells().map((cell, index) => (
                <TableCell align={index === 0 ? "left" : "center"} sx={{width: cell.column.getSize()}}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
              ))}
            </TableRow>))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
