import {
    Card,
    Grid,
} from "@mui/material";
import { DatePicker, LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import FlexBox from "components/FlexBox";
import LightTextField from "components/LightTextField";
import { H5, Small } from "components/Typography";
import React from "react";
import { FC } from "react";
import { NavLink } from "react-router-dom";

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import DarkTextField from "components/DarkTextField";




const DatePickerSample: FC = () => {
    const [value, setValue] = React.useState<Date | null>(
        new Date(),
    );

    const handleChange = (newValue: Date | null) => {
        setValue(newValue);
    };


    return (
        <Card sx={{ padding: 3, marginBottom: 6 }}>
            <FlexBox justifyContent={"space-between"}>
                <H5>Date & Time Picker</H5>
                <NavLink to={{ pathname: "https://mui.com/x/react-date-pickers/getting-started/" }} target="_blank">
                    <Small color="primary.main">Docs</Small>
                </NavLink>
            </FlexBox>
            <Small color="text.disabled">
                Full feature date picker for desktop and mobile, with time and date range selection
            </Small>



            <Grid container spacing={4} marginTop={.5}>
                <Grid item xs={12} sm={4}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            value={value}
                            onChange={handleChange}
                            renderInput={(params) => (
                                <LightTextField {...params} fullWidth />
                            )}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <TimePicker
                            value={value}
                            onChange={handleChange}
                            renderInput={(params) => (
                                <LightTextField {...params} fullWidth />
                            )}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            value={value}
                            onChange={handleChange}
                            renderInput={(params) => (
                                <DarkTextField
                                    fullWidth
                                    {...params}
                                />
                            )}
                        />
                    </LocalizationProvider>

                </Grid>
            </Grid>





        </Card >
    );
};



export default DatePickerSample;
