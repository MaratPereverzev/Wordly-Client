import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export const BasicTable = ({
  bodyRows = [],
  headRows = [],
  sx = {},
  alignHeadCell = "left",
  alignBodyCell = "left",
}) => {
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
              <TableCell key={row} align={alignHeadCell}>
                {row}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {bodyRows.map((row) => (
            <TableRow
              key={row.name}
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
