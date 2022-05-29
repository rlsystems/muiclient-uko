import { FC, useEffect, useMemo } from "react";
import {
  Box,
  ButtonBase,
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
  useExpanded,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import ScrollBar from "simplebar-react";

import { CustomSelectInput } from "components/common";
import { StyledPagination, StyledDataTableHeaderCell, StyledDataTableRow, StyledDataTableRowCell } from "components/dataTable/DataTable.styled";
import FlexBox from "components/FlexBox";
import { H5 } from "components/Typography";
import { PAGE_CHANGED, PAGE_SIZE_CHANGED, ReducerType, TOTAL_PAGE_COUNT_CHANGED } from "app/hooks/usePaginationMetaData";
import { CustomTableOptions } from "app/models/reactTable";
import { Venue } from "app/models/venue";
import { useStore } from "app/stores/store";

interface DataTableProps {
  data: any[];
  columns: any;
  queryPageIndex: number;
  queryPageSize: number;
  totalPageCount: number;
  dispatch: React.Dispatch<{
    type: ReducerType,
    payload: any;
  }>
  rowClick?: (rowData: object) => void; //QUESTION! - these are extra option props
  hidePagination?: boolean;
  showFooter?: boolean;
}

const DataTable: FC<DataTableProps> = ({
  data,
  columns,
  queryPageIndex,
  queryPageSize,
  totalPageCount,
  dispatch,
  rowClick,
  showFooter,
  hidePagination }) => {

  const { venueStore: { venueMetaData, loadVenues } } = useStore();
  const initialState = useMemo(() => ({
    //QUESTION! -why use memo -what would the syntax look like if not using memo - a regular js function like line 87?
    // ANSWER => Mot an function, but an object instead, we just creating an object for initial state of the pagination
      pageIndex: queryPageIndex,
      pageSize: queryPageSize
    }), [queryPageIndex, queryPageSize])

  const { //QUESTION! - so we are using react table for server side pagination also?
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    pageOptions,
    setPageSize,
    gotoPage,
    state, //QUESTION! - state is a variable given by React Table?
  }: any  = useTable(
    {
      columns,
      data,
      initialState,
      manualPagination: true,
      pageCount: totalPageCount
    } as CustomTableOptions<Venue>,
    useSortBy,
    useExpanded,
    usePagination
  );

  const handleChangePage = async (_: any, newPage: number) => {
    gotoPage(newPage - 1)
    dispatch({ type: PAGE_CHANGED, payload: newPage - 1 }); //QUESTION! - this is a hook right? why wouldnt we just use a variable in the store for this
  }

  const handleChangeRowsPerPage = async (event: SelectChangeEvent<number>) => {
    const newPageSize = Number(event.target.value)
    setPageSize(newPageSize);
    dispatch({ type: PAGE_SIZE_CHANGED, payload: newPageSize });
    dispatch({ type: PAGE_CHANGED, payload: 0 });
    gotoPage(0);
  }

  useEffect(() => {
    dispatch({
      type: TOTAL_PAGE_COUNT_CHANGED,
      payload: venueMetaData?.totalPages,
    });
  }, [venueMetaData?.totalPages]);

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
                  <StyledDataTableHeaderCell
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    column={column}
                  >
                    {column.render("Header")}
                  </StyledDataTableHeaderCell>
                ))}
              </TableRow>
            ))}
          </TableHead>

          <TableBody {...getTableBodyProps()}>
            {page.map((row: any) => {
              prepareRow(row);
              return (
                <StyledDataTableRow
                  {...row.getRowProps()}
                  onClick={rowClick && rowClick(row.original)}
                  rowClick={Boolean(rowClick)}
                >
                  {row.cells.map((cell: any) => (
                    <StyledDataTableRowCell {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </StyledDataTableRowCell>
                  ))}
                </StyledDataTableRow>
              );
            })}
          </TableBody>
        </Table>
      </ScrollBar>

      {!hidePagination && (
        <Stack alignItems="center" justifyContent="flex-end" marginY={1} direction="row">
          <Select
            value={state.pageSize}
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
            page={queryPageIndex + 1}
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

export default DataTable;
