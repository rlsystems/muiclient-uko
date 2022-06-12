import { Add } from "@mui/icons-material";
import { DatePicker } from "@mui/lab";
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
import LightTextField from "components/LightTextField";
import { H5, Small } from "components/Typography";
import { Formik } from "formik";
import React from "react";
import { FC } from "react";




const DatePickerSample: FC = () => {
    const initialValues = {

        orderDate: new Date(),

    };

    return (
        <Card sx={{ padding: 3, marginBottom: 6 }}>
            <H5>Date Picker</H5>
            <Small color="text.disabled">
                Select your date of birth
            </Small>

            <Box sx={{ paddingTop: 2 }}>



                <Formik
                    initialValues={initialValues}

                    onSubmit={(values) => {
                        console.log(values);
                    }}
                    children={({
                        values,
                        errors,
                        touched,
                        setFieldValue,
                        handleChange,
                        handleSubmit,
                    }) => {
                        return (
                            <form onSubmit={handleSubmit}>
                                <Small display="block" mb={1}>
                                    Order Date
                                </Small>
                                <DatePicker
                                    value={values.orderDate}
                                    onChange={(newValue) =>
                                        setFieldValue("orderDate", newValue)
                                    }
                                    renderInput={(params) => (
                                        <LightTextField {...params} fullWidth />
                                    )}
                                />
                            </form>
                        );
                    }}
                />




















            </Box>

        </Card >
    );
};



export default DatePickerSample;
