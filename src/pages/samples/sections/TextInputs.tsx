import {
    Card,
    Grid,
} from "@mui/material"; 
import FlexBox from "components/FlexBox";
import {LightTextField} from "components/formInput/InputsLight";
import { H5, Small } from "components/Typography";
import { FC } from "react";
import { NavLink } from "react-router-dom";

const TextInputs: FC = () => {
    return (
        <Card sx={{ padding: 3}}>
             <FlexBox justifyContent={"space-between"}>
                <H5>Text Inputs</H5>
                <NavLink to={{ pathname: "https://mui.com/material-ui/react-text-field/" }} target="_blank">
                    <Small color="primary.main">Docs</Small>
                </NavLink>
            </FlexBox>
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
