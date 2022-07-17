import { InputBase, styled, TextField, TextFieldProps } from "@mui/material";
import React from "react";


//Text Input
const StyledTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
  "& .MuiOutlinedInput-input": {
    fontWeight: 500,
    color: theme.palette.text.primary,
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderRadius: "8px",
    border: "2px solid",
    borderColor:
      theme.palette.mode === "light"
        ? theme.palette.secondary[300]
        : theme.palette.divider,
  },
  "& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.secondary[300],
  },
}));

export const LightTextField = (props: TextFieldProps) => {
  return <StyledTextField {...props} />;
};


// Select Input (dropdown)
export const StyledSelectInput = styled(InputBase)(({ theme }) => ({
  height: 50,
  fontSize: 12,
  width: "100%",
  fontWeight: 600,
  padding: "0 8px",
  border: "2px solid",
  borderRadius: "8px",
  color: theme.palette.text.primary,
  borderColor:
    theme.palette.mode === "light"
      ? theme.palette.secondary[300]
      : theme.palette.divider,
  "& .MuiPopover-paper": { boxShadow: "none" },
  "& > .MuiSelect-select": { paddingRight: "0 !important" },
}));


//pagination select dropdown
export const PaginationSelectInput = styled(InputBase)(({ theme }) => ({
  marginRight: theme.spacing(2),
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid rgba(36, 153, 239, 0.5)',
    fontSize: 12,
    fontWeight: 500,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: theme.palette.primary.main,
      boxShadow: '0 0 0 0.2rem rgba(36, 153, 239, 0.25)',
    },
  },
}));