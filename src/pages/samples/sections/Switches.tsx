import {
    Card,
    Grid,
    Switch,
} from "@mui/material";
import FlexBox from "components/FlexBox";
import StyledFormControlLabel from "components/StyledFormControlLabel";
import { H5, Small } from "components/Typography";
import { FC } from "react";
import { NavLink } from "react-router-dom";


const Switches: FC = () => {
    return (
        <Card sx={{ padding: 3 }}>
            <FlexBox justifyContent={"space-between"}>
                <H5>Switches</H5>
                <NavLink to={{ pathname: "https://mui.com/material-ui/react-switch/" }} target="_blank">
                    <Small color="primary.main">Docs</Small>
                </NavLink>
            </FlexBox>
            <Small color="text.disabled">
                Switch toggles
            </Small>

            <Grid container spacing={3} mt={1}>
                <Grid item xs={12} sm={4}>
                    <StyledFormControlLabel
                        label="Early release"
                        control={<Switch defaultChecked />}
                    />
                </Grid>    
                <Grid item xs={12} sm={4}>
                    <StyledFormControlLabel
                        label="Bypass cache"
                        control={<Switch  defaultChecked={false} />}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <StyledFormControlLabel
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
