import {
    Box,
    Card,

    FormControlLabel,
    Radio,
    RadioGroup,
    styled,
} from "@mui/material";
import { H5, Small } from "components/Typography";
import { FC } from "react";


const StyledFormControl = styled(FormControlLabel)(() => ({
    "& .MuiTypography-root": {
        fontWeight: 600,
    },
}));


const RadioButtons: FC = () => {
    return (
        <Card sx={{ padding: 3}}>
            <H5>Radio Buttons</H5>
            <Small color="text.disabled">
                What is the status of the delivery
            </Small>

            <Box>
                <RadioGroup
                    row
                    name="status"
                    defaultValue={"Pending"}

                >
                    {["Pending", "Processing", "Delivered"].map((item) => (
                        <StyledFormControl
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
