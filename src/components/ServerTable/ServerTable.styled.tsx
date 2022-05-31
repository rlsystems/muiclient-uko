import { alpha, InputBase, Pagination, styled as muiStyled, TableRow, TableCell } from "@mui/material";
import SearchIcon from "icons/SearchIcon";
import styled from "@emotion/styled";
import { ColumnShape } from "./ServerTable";

//EMOTION ENGINE  -- https://mui.com/material-ui/guides/interoperability/#styled-components  -- https://mui.com/material-ui/guides/interoperability/#emotion
export const StyledServerTableHeaderCell = styled(TableCell, {shouldForwardProp: prop => prop !== 'column'})<{column: ColumnShape<any>}>`
  padding-top: 0;
  padding-bottom: 0;
  font-size: ${({theme}) => theme.typography.pxToRem(13)};
  font-weight: 600;
  border-bottom: 0;
  color: ${({theme}) => theme.palette.text.disabled};
  width: ${p => p.column.width};
  min-width: ${p => p.column.minWidth};
  max-width: ${p => p.column.maxWidth};

  &:last-child {
    text-align: center;
  }
`

export const StyledServerTableRow = styled(TableRow, { shouldForwardProp: p => p !== 'rowClick' })<{rowClick?: boolean}>`
  background-color: ${({theme}) => theme.palette.background.paper};
  cursor: ${p => p.rowClick ? "pointer" : "unset"};

  & td:first-of-type {
    border-left: 1px solid;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    border-color: ${({theme}) =>
      theme.palette.mode === 'light' ?
      theme.palette.text.secondary :
      theme.palette.divider};
  }

  & td:last-of-type {
    text-align: center;
    border-right: 1px solid;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    border-color: ${({theme}) =>
      theme.palette.mode === 'light' ?
      theme.palette.text.secondary :
      theme.palette.divider};
  }

  &:last-of-type .MuiTableCell-root {
    border-bottom:
      ${({theme}) => theme.palette.mode === "dark"
        ? `1px solid ${theme.palette.divider} !important`
        : `1px solid ${theme.palette.text.secondary} !important`};
  }
`

export const StyledServerTableRowCell = styled(TableCell)`
  font-size: ${({theme}) => theme.typography.pxToRem(13)};
  font-weight: 500;
  color: ${({theme}) => theme.palette.text.disabled};
  border-top: 1px solid;
  border-bottom: 1px solid;
  border-color: ${({theme}) =>
      theme.palette.mode === 'light' ?
      theme.palette.text.secondary :
      theme.palette.divider};
`

export const StyledTableBodyRow = muiStyled(TableRow)<{
  selected_row: string;
}>(({ theme, selected_row }) =>
  selected_row === "select"
    ? {
        backgroundColor: alpha(theme.palette.primary.light, 0.5),
        position: "relative",
        "&::after": {
          top: 0,
          left: 0,
          width: "3px",
          content: '""',
          height: "100%",
          position: "absolute",
          backgroundColor: theme.palette.primary.main,
        },
      }
    : {}
);

export const StyledPagination = muiStyled(Pagination)(({ theme }) => ({
  "& .MuiPaginationItem-root": {
    fontSize: 12,
    fontWeight: 500,
    color: theme.palette.text.disabled,
  },
  "& .MuiPaginationItem-page:hover": {
    borderRadius: 20,
    backgroundColor: "transparent",
    color: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.main}`,
  },
  "& .MuiPaginationItem-page.Mui-selected": {
    borderRadius: 20,
    backgroundColor: "transparent",
    color: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.main}`,
  },
  "& .MuiPaginationItem-previousNext": {
    margin: 10,
    borderRadius: 20,
    color: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.main}`,
    "&:hover": { backgroundColor: "transparent" },
  },
}));

export const StyledSearchInput = muiStyled(InputBase)(({ theme }) => ({
  height: 40,
  fontSize: 12,
  maxWidth: 450,
  width: "100%",
  fontWeight: 500,
  padding: "0.5rem",
  borderRadius: "4px",
  backgroundColor: "white",
  color: theme.palette.text.primary,
}));

export const StyledSearchIcon = muiStyled(SearchIcon)(({ theme }) => ({
  fontSize: 16,
  marginLeft: "0.5rem",
  marginRight: "0.5rem",
  color: theme.palette.primary.main,
}));
