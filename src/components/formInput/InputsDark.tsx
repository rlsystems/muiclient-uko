import { InputBase, MenuItem, styled, TextField, TextFieldProps } from "@mui/material";
import { FC } from "react";

// Text Inputs
const StyledDarkTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
  "&:hover, & .MuiOutlinedInput-root:hover": {
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.primary.main,
    },
  },
  "& .MuiOutlinedInput-input": {
    fontSize: 12,
    minHeight: 35,
    fontWeight: 500,
    borderRadius: "8px",
    padding: "0px 1rem",
    color: theme.palette.text.primary,
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderRadius: "8px",
    borderColor: "transparent",
    borderWidth: "1px !important",
  },
  "& .MuiInputBase-root": {
    backgroundColor:
      theme.palette.mode === "light"
        ? theme.palette.text.secondary
        : theme.palette.divider,
  },
}));

export const DarkTextField: FC<TextFieldProps> = (props) => {
  return <StyledDarkTextField {...props} fullWidth />;
};


// Select Input (Dropdown)
export const DarkMenuItem = styled(MenuItem)(({ theme }) => ({
  fontSize: 12,
  fontWeight: 500,
  color: theme.palette.text.disabled,
}));
 
export const DarkStyledSelectInput = styled(InputBase)(({ theme }) => ({
  height: 35,
  fontSize: 12,
  padding: "0 1rem",
  borderRadius: "8px",
  color: theme.palette.text.primary,
  backgroundColor:
      theme.palette.mode === "light"
          ? theme.palette.secondary[300]
          : theme.palette.divider,
  "& .MuiSvgIcon-root": { color: theme.palette.text.disabled },
}));