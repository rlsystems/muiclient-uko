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
import DarkTextField from "components/DarkTextField";
import { StyledFormControlLabel } from "components/StyledComponent";
import { H5, Small } from "components/Typography";
import { values } from "lodash";
import { FC } from "react";
import { Label } from "recharts";




const TextInputsDark: FC = () => {
    return (
        <Card sx={{ padding: 3}}>
            <H5>Text Inputs</H5>
            <Small color="text.disabled">
                Alternate style dark text inputs
            </Small>

            <Grid container spacing={4} marginTop={.5}>
                <Grid item xs={12} sm={6}>
                    <DarkTextField
                        fullWidth
                        name="firstName"
                        placeholder="First Name"

                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <DarkTextField
                        fullWidth
                        name="lastName"
                        placeholder="Last Name"

                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <DarkTextField
                        fullWidth
                        name="email"
                        placeholder="Email"

                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <DarkTextField
                        fullWidth
                        name="phoneNumber"
                        placeholder="Phone Number"

                    />
                </Grid>
                <Grid item xs={12} >
                    <DarkTextField
                        multiline
                        fullWidth
                        minRows={4}
                        id="description"
                        name="description"
                        placeholder="Description"
                    />
                </Grid>

            </Grid>

        </Card>
    );
};



export default TextInputsDark;
