import { styled, TableCell } from "@mui/material";

const commonCSS = {
    minWidth: 120, //default col width
    "&:nth-of-type(2)": { minWidth: 170 }, //makes product name column wider
    "&:nth-of-type(3)": { minWidth: 80 }, //price column shorter
};


export const HeadTableCell = styled(TableCell)(() => ({
    fontSize: 12,
    fontWeight: 600,
    "&:first-of-type": { paddingLeft: 0 },
    "&:last-of-type": { paddingRight: 0 },
}));

export const BodyTableCell = styled(TableCell)(({ theme }) => ({
    fontSize: 12,
    fontWeight: 500,
    padding: 0,
    paddingLeft: "1rem",
    paddingTop: "0.7rem",
    "&:first-of-type": { paddingLeft: 0 },
    "&:last-of-type": { paddingRight: 0 },
    [theme.breakpoints.down("sm")]: { ...commonCSS },
    [theme.breakpoints.between(960, 1270)]: { ...commonCSS },
}));