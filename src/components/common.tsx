import styled from "@emotion/styled";
import { Color, darken, InputBase, styled as muiStyled } from "@mui/material";

export const CustomSelectInput = muiStyled(InputBase)(({ theme }) => ({
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

export const StyledDisabledBox = styled.div`
  pointer-events: none;
  cursor: not-allowed;
  opacity: 0.5;
`

export const StyledLink = styled.a<{color?: string, italic?: boolean}>`
  color: ${p => p.color || "currentColor"};
  text-decoration: none;
  cursor: pointer;
  font-style: ${p => p.italic? "italic": "normal"};
  transition: color 150ms ease-out;

  &:hover {
    color: ${p => p.color? darken(p.color, .2): "currentColor"};
  }
`