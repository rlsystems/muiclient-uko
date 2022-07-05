import {
  Badge,
  Box,
  Chip,
  FormControlLabel,
  InputBase,
  MenuItem,
  styled,
} from "@mui/material";


//--- Organize this ---

export const StyledInput = styled(InputBase)(({ theme }) => ({
  height: 52,
  fontWeight: 500,
  borderRadius: "8px",
  border: "2px solid",
  paddingLeft: 8,
  paddingright: 8,
  color: theme.palette.text.primary,
  borderColor:
    theme.palette.mode === "light"
      ? theme.palette.secondary[300]
      : theme.palette.divider,
}));


export const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    width: 25,
    height: 25,
    borderRadius: "50%",
    backgroundColor: theme.palette.primary.main,
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
  },
}));

export const StyledFormControlLabel = styled(FormControlLabel)(() => ({
  "& .MuiTypography-root": {
    fontSize: 13,
    fontWeight: 600,
  },
}));

export const StyledChip = styled(Chip)(({ theme }) => ({
  fontSize: 12,
  fontWeight: 500,
  color: theme.palette.text.disabled,
  backgroundColor:
    theme.palette.mode === "light"
      ? theme.palette.text.secondary
      : theme.palette.divider,
  "& .MuiSvgIcon-root": { fontSize: 18 },
}));


// Select Input 
// --Light
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

// Select Input 
// --Dark
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


//Login page
export const TextFieldWrapper = styled(Box)(({ theme }) => ({
  width: "48%",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    marginTop: "0.5rem",
  },
}));