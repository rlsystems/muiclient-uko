import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
    Box,
    Card,
    Divider,
    Tab,
} from "@mui/material";
import FlexBox from "components/FlexBox";
import { H5, Small } from "components/Typography";
import { FC, SyntheticEvent, useState } from "react";
import { NavLink } from "react-router-dom";

const Tabs: FC = () => {
    const [tabValue, setTabValue] = useState("1");

    const handleChange = (e: SyntheticEvent, value: string) => {
        setTabValue(value);
    };


    return (
        <Card sx={{ padding: 3 }}>
            <FlexBox justifyContent={"space-between"}>
                <H5>Tabs</H5>
                <NavLink to={{ pathname: "https://mui.com/material-ui/react-tabs/" }} target="_blank">
                    <Small color="primary.main">Docs</Small>
                </NavLink>
            </FlexBox>
            <Small color="text.disabled">
                Tabs for switching between content
            </Small>

            <Box mt={1}>

                <TabContext value={tabValue}>
                    <TabList
                        onChange={handleChange}
                        sx={{ minHeight: 25, margin: "1.5rem 1rem" }}
                    >
                        <Tab label="Order Details" value="1" disableRipple />
                        <Tab label="Price" value="2" disableRipple />
                        <Tab label="Invoice" value="3" disableRipple />
                    </TabList>

                    <Divider />

                    <TabPanel value="1">
                        <Box padding="1.5rem" sx={{ minWidth: 700, overflow: "auto" }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </Box>
                    </TabPanel>
                    <TabPanel value="2">
                        <Box padding="1.5rem" sx={{ minWidth: 700, overflow: "auto" }}>
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </Box>
                    </TabPanel>
                    <TabPanel value="3">
                        <Box padding="1.5rem" sx={{ minWidth: 700, overflow: "auto" }}>
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        </Box>
                    </TabPanel>
                </TabContext>

            </Box>

        </Card>
    );
};



export default Tabs;
