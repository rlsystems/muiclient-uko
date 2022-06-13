import { FC, useEffect } from "react";
import { Grid } from "@mui/material";
import { observer } from "mobx-react-lite";

import { useStore } from 'app/stores/store';
import CheckBoxes from "./sections/CheckBoxes";
import RadioButtons from "./sections/RadioButtons";
import Buttons from "./sections/Buttons";
import DatePickerSample from "./sections/DatePickerSample";
import TextInputs from "./sections/TextInputs";
import TextInputsDark from "./sections/TextInputsDark";
import Selections from "./sections/Selections";
import Switches from "./sections/Switches";
import Tabs from "./sections/Tabs";
import RangeSlider from "./sections/RangeSlider";
import AutocompleteSample from "./sections/AutocompleteSample";
import PopoverSample from "./sections/Popover";
import Incrementer from "./sections/Incrementer";
import ModalSample from "./sections/ModalSample";
import TableSample from "./sections/TableSample";
import GraphSample from "./sections/GraphSample";



const UserList: FC = () => {
    const { commonStore } = useStore();
    const { setTitle } = commonStore;


    useEffect(() => {
        setTitle("Component Samples");
    }, [])


    return (

        <Grid container spacing={6} pt={2} pb={4}>
            <Grid item xs={12} md={6}>
                <CheckBoxes />
            </Grid>
            <Grid item xs={12} md={6}>
                <RadioButtons />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextInputs/>
            </Grid>
            <Grid item xs={12} md={6}>
                <TextInputsDark />
            </Grid>
            <Grid item xs={12} md={6}>
                <Selections />
            </Grid>
            <Grid item xs={12} md={6}>
                <AutocompleteSample />
            </Grid>
            <Grid item xs={12} md={6}>
                <Tabs />
            </Grid>
            <Grid item xs={12} md={6}>
                <Buttons />
            </Grid>
            <Grid item xs={12} md={6}>
                <PopoverSample />
            </Grid>
            <Grid item xs={12} md={6}>
                <Switches />
            </Grid>
            <Grid item xs={12} md={6}>
                <Incrementer />
            </Grid>
            <Grid item xs={12} md={6}>
                <RangeSlider />
            </Grid>
            <Grid item xs={12} md={6}>
                <ModalSample />
            </Grid>
            <Grid item xs={12} md={6}>
                <DatePickerSample />
            </Grid>
            <Grid item xs={12} md={6}>
                <TableSample />
            </Grid>
            <Grid item xs={12} md={6}>
                <GraphSample />
            </Grid>
        </Grid>

    );
};

export default observer(UserList);
