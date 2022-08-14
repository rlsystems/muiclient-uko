import React from "react";
import { FC } from "react";
import { NavLink } from "react-router-dom";
import {
    Card,
    Grid,
} from "@mui/material";
import { DatePicker, LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import FlexBox from "components/FlexBox";
import { H5, Small } from "components/Typography";
import { DarkTextField } from "components/formInput/InputsDark";
import { LightTextField } from "components/formInput/InputsLight";

const DatePickerSample: FC = () => {
    const [value, setValue] = React.useState<Date | null>(
        new Date(),
    );

    const handleChange = (newValue: Date | null) => {
        setValue(newValue);
    };

    return (
        <Card sx={{ padding: 3 }}>
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
