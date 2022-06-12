import {
    Box,
    Card,
    Checkbox,
    Divider,
    FormControlLabel,
    Grid,
    styled,
    Switch,
} from "@mui/material";
import LightTextField from "components/LightTextField";
import { StyledFormControlLabel } from "components/StyledComponent";
import { H5, Small } from "components/Typography";
import { values } from "lodash";
import { FC } from "react";
import { Label } from "recharts";




const TextInputs: FC = () => {
    return (
        <Card sx={{ padding: 3}}>
            <H5>Text Inputs</H5>
            <Small color="text.disabled">
                Default style text inputs
            </Small>

            <Grid container spacing={4} marginTop={.5}>
                <Grid item xs={12} sm={6}>
                    <LightTextField
                        fullWidth
                        name="firstName"
                        label="First Name"

                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <LightTextField
                        fullWidth
                        name="lastName"
                        label="Last Name"

                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <LightTextField
                        fullWidth
                        name="email"
                        label="Email"

                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <LightTextField
                        fullWidth
                        name="phoneNumber"
                        label="Phone Number"

                    />
                </Grid>
                <Grid item xs={12} >
                    <LightTextField
                        multiline
                        fullWidth
                        minRows={6}
                        id="description"
                        name="description"
                        label="Description"
                    />
                </Grid>

            </Grid>

        </Card>
    );
};



export default TextInputs;
