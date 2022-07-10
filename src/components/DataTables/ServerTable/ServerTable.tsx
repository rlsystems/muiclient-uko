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
import { CustomSelectInput } from "components/common";
import { StyledTableHeaderCell, StyledTableRow, StyledTableRowCell, StyledPagination } from "components/DataTables/DataTable.styled";

export interface ColumnShape<T> {
  header: string
  accessor: keyof T | null //similar to an ID
  minWidth: string | number
  maxWidth?: string | number
  width?: string | number
  renderRow?: (row: any) => React.ReactNode //like Cell (function) from react table
}

type ServerTableProps<T> = {
  data: T[];
  columns: ColumnShape<T>[];
  paginationState?: PaginationStateType
  paginationDispatch?: PaginationDispatchType
  hidePagination?: boolean;
  isLoading?: boolean
}

// Record is a generic utility type in TS

const ServerTable = <T extends Record<string, any>>({
  data,
  columns,
  paginationState,
  paginationDispatch,
  hidePagination,
  isLoading }: ServerTableProps<T>) => {
  const handleChangePage = async (_: any, newPage: number) => {
    if (!paginationDispatch) return //if no dispatch return nothing
    paginationDispatch({ type: PAGE_CHANGED, payload: newPage - 1 }); //build in dispatch - this is a hook
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
            input={<CustomSelectInput />}
          >
            {[5, 10, 15, 20, 25, 50].map(option =>
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
