import { Add } from "@mui/icons-material";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import {
    Box,
    Button,
    Card,

    FormControlLabel,
    Radio,
    RadioGroup,
    styled,
    TextField,
} from "@mui/material";
import FlexBox from "components/FlexBox";
import LightTextField from "components/LightTextField";
import { H5, Small } from "components/Typography";
import { Formik } from "formik";
import React, { useState } from "react";
import { FC } from "react";
import { NavLink } from "react-router-dom";
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';




const DatePickerSample: FC = () => {
    const [value, setValue] = React.useState<Date | null>(
        new Date('2014-08-18T21:11:54'),
      );
      const handleChange = (newValue: Date | null) => {
        setValue(newValue);
      };


    return (
        <Card sx={{ padding: 3, marginBottom: 6 }}>
             <FlexBox justifyContent={"space-between"}>
                <H5>Date Picker</H5>
                <NavLink to={{ pathname: "https://mui.com/x/react-date-pickers/getting-started/" }} target="_blank">
                    <Small color="primary.main">Docs</Small>
                </NavLink>
            </FlexBox>
            <Small color="text.disabled">
                Full feature date picker for desktop and mobile, with time and date range selection
            </Small>

            <Box sx={{ paddingTop: 2 }}>

            {/* <LocalizationProvider dateAdapter={AdapterDateFns}></LocalizationProvider> */}
                {/* <DatePicker
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) => (
                        <LightTextField {...params} fullWidth />
                    )}
                /> */}



            </Box>

        </Card >
    );
};



export default DatePickerSample;
