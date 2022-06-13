import { KeyboardArrowDown } from "@mui/icons-material";
import {
    Card,
    Grid,
    InputBase,
    MenuItem,
    Select,
} from "@mui/material";
import FlexBox from "components/FlexBox";
import { DarkMenuItem, DarkStyledSelectInput, StyledSelectInput } from "components/StyledComponent";
import { H5, Small } from "components/Typography";
import { FC, useState } from "react";
import { NavLink } from "react-router-dom";


const Selections: FC = () => {
    const [language, setLanguage] = useState("english");
    const [status, setStatus] = useState("available");
    const [region, setRegion] = useState("north");

    return (
        <Card sx={{ padding: 3 }}>
            <FlexBox justifyContent={"space-between"}>
                <H5>Selections</H5>
                <NavLink to={{ pathname: "https://mui.com/material-ui/react-select/" }} target="_blank">
                    <Small color="primary.main">Docs</Small>
                </NavLink>
            </FlexBox>
            <Small color="text.disabled">
                Default, styled, and alternate styled selection inputs
            </Small>

            <Grid container spacing={4} marginTop={.5}>
                <Grid item xs={12} sm={4}>
                    <Select
                        fullWidth
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                        IconComponent={() => <KeyboardArrowDown />}
                        input={<InputBase />}
                    >
                        <MenuItem value="north" sx={{ fontSize: 12, fontWeight: 500 }}>
                            North
                        </MenuItem>
                        <MenuItem value="south" sx={{ fontSize: 12, fontWeight: 500 }}>
                            South
                        </MenuItem>
                        <MenuItem value="east" sx={{ fontSize: 12, fontWeight: 500 }}>
                            East
                        </MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        IconComponent={() => <KeyboardArrowDown />}
                        input={<StyledSelectInput />}
                    >
                        <MenuItem value="english" sx={{ fontSize: 12, fontWeight: 500 }}>
                            English
                        </MenuItem>
                        <MenuItem value="spanish" sx={{ fontSize: 12, fontWeight: 500 }}>
                            Spanish
                        </MenuItem>
                        <MenuItem value="german" sx={{ fontSize: 12, fontWeight: 500 }}>
                            German
                        </MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Select
                        fullWidth
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        input={<DarkStyledSelectInput placeholder="Asia" />}
                        IconComponent={() => <KeyboardArrowDown fontSize="small" />}
                    >
                        <DarkMenuItem value="available">Available</DarkMenuItem>
                        <DarkMenuItem value="closed">Closed</DarkMenuItem>
                        <DarkMenuItem value="disabled">Disabled</DarkMenuItem>
                        <DarkMenuItem value="pending">Pending</DarkMenuItem>
                    </Select>
                </Grid>
            </Grid>
        </Card>
    );
};




export default Selections;
