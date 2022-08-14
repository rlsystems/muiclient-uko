import { Add } from "@mui/icons-material";
import {
    Button,
    Card,
    Grid,
} from "@mui/material";
import FlexBox from "components/FlexBox";
import { H5, Small } from "components/Typography";
import { FC } from "react";
import { NavLink } from "react-router-dom";

const Buttons: FC = () => {
    return (
        <Card sx={{ padding: 3 }}>
             <FlexBox justifyContent={"space-between"}>
                <H5>Buttons</H5>
                <NavLink to={{ pathname: "https://mui.com/material-ui/react-button/" }} target="_blank">
                    <Small color="primary.main">Docs</Small>
                </NavLink>
            </FlexBox>
            <Small color="text.disabled">
                Several button varieties, icon buttons, loading state, etc.
            </Small>

            <Grid container spacing={3} mt={1}>
                <Grid item xs={12} sm={6} md={4}>
                    <Button
                        variant="contained">
                        Contained Button
                    </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Button>
                        Default Button
                    </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Button
                        endIcon={<Add />}
                        variant="contained">
                        Icon Button
                    </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Button
                        variant="outlined">
                        Outline Button
                    </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Button
                        color="success"
                        variant="contained">
                        Success
                    </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Button
                        disabled
                        variant="contained">
                        Disabled
                    </Button>
                </Grid>
            </Grid>

        </Card>
    );
};

export default Buttons;
