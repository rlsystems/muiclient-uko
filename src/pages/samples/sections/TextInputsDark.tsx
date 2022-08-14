import {
    Card,
    Grid,
} from "@mui/material";
import {DarkTextField} from "components/formInput/InputsDark";
import FlexBox from "components/FlexBox";
import { H5, Small } from "components/Typography";
import { FC } from "react";
import { NavLink } from "react-router-dom";

const TextInputsDark: FC = () => {
    return (
        <Card sx={{ padding: 3 }}>
            <FlexBox justifyContent={"space-between"}>
                <H5>Styled Text Inputs</H5>
                <NavLink to={{ pathname: "https://mui.com/material-ui/react-text-field/" }} target="_blank">
                    <Small color="primary.main">Docs</Small>
                </NavLink>
            </FlexBox>
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
