import { FC } from "react";
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

import {  StyledServerTableHeaderCell, StyledServerTableRow, StyledServerTableRowCell } from "./ServerTable.styled";
import { PAGE_CHANGED, PAGE_SIZE_CHANGED, PaginationDispatchType, PaginationStateType } from "app/hooks/usePaginationMetaData";
import { CustomSelectInput } from "components/common";
import { StyledPagination } from "components/dataTable/DataTable.styled";

export interface ColumnShape<T> {
  header: string
  accessor: keyof T | null
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
    paginationDispatch({ type: PAGE_CHANGED, payload: newPage - 1 }); //QUESTION! - this is a hook right? why wouldnt we just use a variable in the store for this
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
            {columns.map(col =>
                <StyledServerTableHeaderCell column={col}>
                  {col.header}
                </StyledServerTableHeaderCell>
            )}
          </TableHead>

          {!isLoading &&
            <TableBody>
            {data.map((row: T) => {
              return (
                <StyledServerTableRow>
                  {columns.map((cell) => (
                    <StyledServerTableRowCell>
                      {cell.renderRow ? cell?.renderRow(row) : cell.accessor ? row[cell.accessor]: null}
                    </StyledServerTableRowCell>
                  ))}
                </StyledServerTableRow>
              );
            })}
          </TableBody>}
        </Table>
        {isLoading && (<Box my={6} width="100%" display="flex" justifyContent="center">
              <CircularProgress />
        </Box>)}
      </ScrollBar>

      {!hidePagination && (
        <Stack alignItems="center" justifyContent="flex-end" marginY={1} direction="row">
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
