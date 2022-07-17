import { FormControlLabel, styled } from "@mui/material";


const StyledFormControlLabel = styled(FormControlLabel)(() => ({
    "& .MuiTypography-root": {
        fontWeight: 600,
    },
}));

export default StyledFormControlLabel;