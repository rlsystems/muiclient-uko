import {
    Box,
    Card,
    Checkbox,
    FormControlLabel,
    styled,
} from "@mui/material";
import { H5, Small } from "components/Typography";
import { FC } from "react";



const StyledFormControl = styled(FormControlLabel)(() => ({
    "& .MuiTypography-root": {
        fontWeight: 600,
    },
}));

const CheckBoxes: FC = () => {
    return (
        <Card sx={{ padding: 3}}>
            <H5>Checkboxes</H5>
            <Small color="text.disabled">
                Which animals do you like? Select any that apply
            </Small>

            <Box marginTop={1}>

                {["Cats", "Dogs", "Turtles"].map((item) => (
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
