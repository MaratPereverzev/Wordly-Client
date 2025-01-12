import { WordInstance } from "@/shared/api/word/model";
import type { TableProps } from "@mui/material";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

type BasicTableProps = TableProps & {
  alignHeadCell ?: "center" | "left" | "right" | "inherit" | "justify",
  alignBodyCell ?: "center" | "left" | "right" | "inherit" | "justify",
  bodyRows?: WordInstance[],
  headRows?: JSX.Element[]
}

export const BasicTable = ({
  bodyRows = [],
  headRows = [],
  alignHeadCell = "left",
  alignBodyCell = "left",
}: BasicTableProps) => {
  return (
    <TableContainer
      sx={{
        borderRadius: 1,
        boxShadow: "none",
      }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {headRows.map((row) => (
              <TableCell key={row.key} align={alignHeadCell}>
                {row}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {bodyRows.map((row: any) => (
            <TableRow
              key={row.key}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {Object.keys(row).map((key) => (
                <TableCell
                  component="th"
                  scope="row"
                  key={`${row.name}/${row[key]}`}
                  align={alignBodyCell}
                >
                  {row[key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
