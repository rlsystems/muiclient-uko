import styled from "@emotion/styled";
import { TableCell, TableRow } from "@mui/material";
import { nanoTheme } from "theme";

const theme = nanoTheme({});
const borderColor = theme.palette.mode === 'light' ?
      theme.palette.text.secondary :
      theme.palette.divider;


export const StyledReactTableHeaderCell = styled(TableCell, {shouldForwardProp: prop => prop !== 'column'})<{column: any}>`
  padding-top: 0;
  padding-bottom: 0;
  font-size: ${theme.typography.pxToRem(13)};
  font-weight: 600;
  border-bottom: 0;
  color: ${theme.palette.text.disabled};
  width: ${p => p.column.width};
  min-width: ${p => p.column.minWidth};
  max-width: ${p => p.column.maxWidth};

  &:last-child {
    text-align: center;
  }
`

export const StyledReactTableRow = styled(TableRow, { shouldForwardProp: p => p !== 'rowClick' })<{rowClick?: boolean}>`
  background-color: ${theme.palette.background.paper};
  cursor: ${p => p.rowClick ? "pointer" : "unset"};

  & td:first-of-type {
    border-left: 1px solid;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    border-color: ${borderColor};
  }

  & td:last-of-type {
    text-align: center;
    border-right: 1px solid;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    border-color: ${borderColor};
  }

  &:last-of-type .MuiTableCell-root {
    border-bottom:
      ${theme.palette.mode === "dark"
        ? `1px solid ${theme.palette.divider} !important`
        : `1px solid ${theme.palette.text.secondary} !important`};
  }
`

export const StyledReactTableRowCell = styled(TableCell)`
  font-size: ${theme.typography.pxToRem(13)};
  font-weight: 500;
  color: ${theme.palette.text.disabled};
  border-top: 1px solid;
  border-bottom: 1px solid;
  border-color: ${borderColor};
`