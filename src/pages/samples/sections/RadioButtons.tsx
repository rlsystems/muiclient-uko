import {
    Box,
    Card,
    Radio,
    RadioGroup,
} from "@mui/material";
import FlexBox from "components/FlexBox";
import StyledFormControlLabel from "components/StyledFormControlLabel";
import { H5, Small } from "components/Typography";
import { FC } from "react";
import { NavLink } from "react-router-dom";





const RadioButtons: FC = () => {
    return (
        <Card sx={{ padding: 3}}>
            <FlexBox justifyContent={"space-between"}>
                <H5>Radio Buttons</H5>
                <NavLink to={{ pathname: "https://mui.com/material-ui/react-radio-button/" }} target="_blank">
                    <Small color="primary.main">Docs</Small>
                </NavLink>
            </FlexBox>
            <Small color="text.disabled">
                For selecting a single option
            </Small>
            <Box mt={2}>
                <RadioGroup
                    row
                    name="status"
                    defaultValue={"Pending"}

                >
                    {["Pending", "Processing", "Delivered"].map((item) => (
                        <StyledFormControlLabel
                            key={item}
                            value={item}
                            label={item}
                            control={<Radio />}
                        />
                    ))}
                </RadioGroup>

            </Box>

        </Card>
    );
};



export default RadioButtons;
