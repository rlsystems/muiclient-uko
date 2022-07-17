import styled from "@emotion/styled";
import { darken } from "@mui/material";


//text that appears after server table search with Clear option
const ResultText = styled.a<{color?: string, italic?: boolean}>`
  color: ${p => p.color || "currentColor"};
  text-decoration: none;
  cursor: pointer;
  font-style: ${p => p.italic? "italic": "normal"};
  transition: color 150ms ease-out;

  &:hover {
    color: ${p => p.color? darken(p.color, .2): "currentColor"};
  }
`

export default ResultText;