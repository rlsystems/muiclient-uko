import {
    Box,
    Card,
    Checkbox,
    FormControlLabel,
    styled,
} from "@mui/material";
import FlexBox from "components/FlexBox";
import { H5, Small } from "components/Typography";
import { FC } from "react";
import { NavLink } from "react-router-dom";



const StyledFormControl = styled(FormControlLabel)(() => ({
    "& .MuiTypography-root": {
        fontWeight: 600,
    },
}));

const CheckBoxes: FC = () => {
    return (
        <Card sx={{ padding: 3 }}>
            <FlexBox justifyContent={"space-between"}>
                <H5>Checkboxes</H5>
                <NavLink to={{ pathname: "https://mui.com/material-ui/react-checkbox/" }} target="_blank">
                    <Small color="primary.main">Docs</Small>
                </NavLink>
            </FlexBox>

            <Small color="text.disabled">
                For selecting multiple options
            </Small>

            <Box marginTop={2}>

                {["One", "Two", "Three", "Four"].map((item) => (
                    <StyledFormControl
                        key={item}
                        value={item}
                        label={item}
                        control={<Checkbox />}
                    />
                ))}



            </Box>

        </Card>
    );
};



export default CheckBoxes;
