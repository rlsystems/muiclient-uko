import {
    Card,
    FormControlLabel,
    Grid,
    Switch,
} from "@mui/material";
import { H5, Small } from "components/Typography";
import { FC } from "react";


const Switches: FC = () => {
    return (
        <Card sx={{ padding: 3 }}>
            <H5>Switches</H5>
            <Small color="text.disabled">
                Switch toggles
            </Small>

            <Grid container spacing={3} mt={1}>
                <Grid item xs={12} sm={4}>
                    <FormControlLabel
                        label="Early release"
                        control={<Switch defaultChecked />}
                    />
                </Grid>    
                <Grid item xs={12} sm={4}>
                    <FormControlLabel
                        label="Bypass cache"
                        control={<Switch  defaultChecked={false} />}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControlLabel
                        label="Notifications"
                        control={<Switch defaultChecked={true} />}
                        sx={{
                            flexDirection: "row-reverse",
                            "& .MuiTypography-root": {
                                fontWeight: 600,
                                fontSize: 12,
                                color: "text.disabled",
                            },
                        }}
                    />

                </Grid>

            </Grid>

        </Card>
    );
};



export default Switches;
