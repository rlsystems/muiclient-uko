import {
  Box,
  CircularProgress,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Table,
  TableBody,
  TableHead,
  TableRow,
} from "@mui/material";
import ScrollBar from "simplebar-react";
import { PAGE_CHANGED, PAGE_SIZE_CHANGED, PaginationDispatchType, PaginationStateType } from "app/hooks/usePaginationMetaData";
import { PaginationSelectInput } from "components/formInput/InputsLight";
import { StyledTableHeaderCell, StyledTableRow, StyledTableRowCell, StyledPagination } from "components/dataTables/DataTable.styled";

// this is a custom component which receives pagination state, used with pagination api endpoints
// server table does not use react-table however it is styled the same

export interface ColumnShape<T> {
  header: string
  accessor: keyof T | null // similar to an id
  minWidth: string | number
  maxWidth?: string | number
  width?: string | number
  renderRow?: (row: any) => React.ReactNode 
}

type ServerTableProps<T> = {
  data: T[];
  columns: ColumnShape<T>[];
  paginationState?: PaginationStateType
  paginationDispatch?: PaginationDispatchType
  hidePagination?: boolean;
  isLoading?: boolean
}

const ServerTable = <T extends Record<string, any>>({
  data,
  columns,
  paginationState,
  paginationDispatch,
  hidePagination,
  isLoading }: ServerTableProps<T>) => {
  const handleChangePage = async (_: any, newPage: number) => {
    if (!paginationDispatch) return
    paginationDispatch({ type: PAGE_CHANGED, payload: newPage - 1 }); 
  }

  const handleChangeRowsPerPage = async (event: SelectChangeEvent<number>) => {
    if (!paginationDispatch) return
    const newPageSize = Number(event.target.value)
    paginationDispatch({ type: PAGE_SIZE_CHANGED, payload: newPageSize });
    paginationDispatch({ type: PAGE_CHANGED, payload: 0 });
  }

  return (
    <Box>
      <ScrollBar>
        <Table
          sx={{
            borderSpacing: "0 1rem",
            borderCollapse: "separate",
          }}
        >
          <TableHead>
            <TableRow>
              {columns.map((col, index) =>
                <StyledTableHeaderCell sx={{minWidth: col.minWidth}}  column={col} key={index}>
                  {col.header}
                </StyledTableHeaderCell>
              )}
            </TableRow>
          </TableHead>

          {!isLoading &&
            <TableBody>
              {data.map((row: T, index) => {
                return (
                  <StyledTableRow key={index}>
                    {columns.map((cell, index) => (
                      <StyledTableRowCell key={index}>
                        {cell.renderRow ? cell?.renderRow(row) : cell.accessor ? row[cell.accessor] : null}
                      </StyledTableRowCell>
                    ))}
                  </StyledTableRow>
                );
              })}
            </TableBody>}
        </Table>
        {isLoading && (<Box my={6} width="100%" display="flex" justifyContent="center">
          <CircularProgress />
        </Box>)}
      </ScrollBar>

      {!hidePagination && (
        <Stack alignItems={{xs: "flex-end", sm: "center"}} spacing={{xs: 1, sm: 0}} justifyContent={{xs: "flex-start", sm: "flex-end"}} marginY={1} direction={{xs: "column-reverse", sm: "row"}}>
        <Select
            value={paginationState?.queryPageSize || 0}
            onChange={handleChangeRowsPerPage}
            input={<PaginationSelectInput />}
          >
            {[5, 10, 25, 50, 100].map(option =>
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            )}
          </Select>
          <StyledPagination
            count={paginationState?.totalPageCount || 0}
            shape="rounded"
            onChange={handleChangePage}
            page={(paginationState?.queryPageIndex || 0) + 1}
          />
        </Stack>
      )}
    </Box>
  );
};

export default ServerTable;
