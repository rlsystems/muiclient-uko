import { Add } from "@mui/icons-material";
import {
    Box,
    Button,
    Card,

    FormControlLabel,
    Grid,
    Radio,
    RadioGroup,
    styled,
} from "@mui/material";
import { H5, Small } from "components/Typography";
import { FC } from "react";




const Buttons: FC = () => {
    return (
        <Card sx={{ padding: 3 }}>
            <H5>Buttons</H5>
            <Small color="text.disabled">
                Several button varieties, icon buttons, etc.
            </Small>

            <Grid container spacing={3} mt={1}>
                <Grid item xs={6} md={4}>
                    <Button
                        variant="contained">
                        Contained Button
                    </Button>
                </Grid>
                <Grid item xs={6} md={4}>
                    <Button>
                        Default Button
                    </Button>
                </Grid>
                <Grid item xs={6} md={4}>
                    <Button
                        endIcon={<Add />}
                        variant="contained">
                        Icon Button
                    </Button>
                </Grid>
                <Grid item xs={6} md={4}>
                    <Button
                        variant="outlined">
                        Outline Button
                    </Button>
                </Grid>
                <Grid item xs={6} md={4}>
                    <Button
                        color="success"
                        variant="contained">
                        Success
                    </Button>
                </Grid>
                <Grid item xs={6} md={4}>
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
