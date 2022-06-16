import { Card, styled } from "@mui/material";


const StyledModalCard = styled(Card)(({ theme }) => ({
    top: "50%",
    left: "50%",
    maxWidth: 700,
    minWidth: 300,
    position: "absolute",
    padding: "1.5rem",
    boxShadow: theme.shadows[2],
    transform: "translate(-50%, -50%)",
    width: "100%",
    outline: "none",
    [theme.breakpoints.down("md")]: { width: "95%" },
}));


export default StyledModalCard;
