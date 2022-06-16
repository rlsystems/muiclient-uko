import { FC } from "react";
import {
  Box,
  ButtonBase,
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
import { ArrowRightAlt } from "@mui/icons-material";
import {
  TableBodyProps,
  TableProps,
} from "react-table";
import ScrollBar from "simplebar-react";

import { CustomSelectInput } from "components/common";
import { StyledPagination } from "components/dataTable/DataTable.styled";
import FlexBox from "components/FlexBox";
import { H6, H5 } from "components/Typography";
import { StyledReactTableHeaderCell, StyledReactTableRow, StyledReactTableRowCell } from "./ReactTable.styled";

interface ReactTableProps {
  getTableProps: () => TableProps,
  getTableBodyProps: () => TableBodyProps,
  headerGroups: any[],
  prepareRow: any,
  page: any[],
  pageOptions: any,
  pageIndex: number,
  pageSize: number,
  setPageSize: (pageSize: number) => void,
  gotoPage: any,
  rowClick?: (rowData: object) => void;
  hidePagination?: boolean;
  showFooter?: boolean;
  isLoading?: boolean;
}

const ReactTable: FC<ReactTableProps> = (props) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    pageOptions,
    pageIndex,
    pageSize,
    setPageSize,
    gotoPage,
    rowClick,
    showFooter,
    hidePagination,
    isLoading
  } = props;

  const handleChangePage = (_: any, newPage: number) => {
    gotoPage(newPage - 1)
  }

  const handleChangeRowsPerPage = (event: SelectChangeEvent<number>) => {
    setPageSize(Number(event.target.value))
  }

  return (
    <Box>
      <ScrollBar>
        <Table
          {...getTableProps()}
          sx={{
            borderSpacing: "0 1rem",
            borderCollapse: "separate",
          }}
        >
          <TableHead>
            {headerGroups.map((headerGroup: any) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column: any) => (
                  <StyledReactTableHeaderCell
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    column={column}
                    sx={{minWidth: column.minWidth}}
                  >
                    <H6 color="text.primary" sx={{opacity: .7}} >{column.render("Header")}</H6>
                  </StyledReactTableHeaderCell>
                ))}
              </TableRow>
            ))}
          </TableHead>

          {!isLoading &&
            <TableBody {...getTableBodyProps()}>
            {page.map((row: any) => {
              prepareRow(row);
              return (
                <StyledReactTableRow
                  {...row.getRowProps()}
                  onClick={rowClick && rowClick(row.original)}
                  rowClick={Boolean(rowClick)}
                >
                  {row.cells.map((cell: any) => (
                    <StyledReactTableRowCell {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </StyledReactTableRowCell>
                  ))}
                </StyledReactTableRow>
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
          {/* make this select the same blue color, same size if possible, and position it to the left of the pagination*/}
          <Select
            value={pageSize}
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
            count={pageOptions.length}
            shape="rounded"
            onChange={handleChangePage}
            page={pageIndex + 1}
          />
        </Stack>
      )}

      {showFooter && (
        <FlexBox alignItems="center" justifyContent="space-between">
          <H5 color="text.disabled">Showing 1-12 of 24 result</H5>
          <ButtonBase
            disableRipple
            sx={{
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            See All
            <ArrowRightAlt sx={{ marginLeft: 0.5 }} />
          </ButtonBase>
        </FlexBox>
      )}
    </Box>
  );
};

export default ReactTable;
