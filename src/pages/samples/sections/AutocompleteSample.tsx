import { Clear, KeyboardArrowDown } from "@mui/icons-material";
import {
    Autocomplete,
    Card,
    Grid,

} from "@mui/material";
import LightTextField from "components/LightTextField";
import { StyledChip } from "components/StyledComponent";
import { H5, Small } from "components/Typography";
import { FC } from "react";




const AutocompleteSample: FC = () => {

    return (
        <Card sx={{ padding: 3 }}>
            <H5>Autocomplete</H5>
            <Small color="text.disabled">
                A multi-select, searchable autocomplete field
            </Small>

            <Grid container spacing={4} marginTop={.5}>
                <Grid item xs={12} >
                    <Autocomplete
                        multiple
                        fullWidth
                        popupIcon={false}
                        clearIcon={false}
                        options={tagList}
                        getOptionLabel={(option) => option}
                        renderInput={(params) => renderInput(params)}
                        renderTags={(tagValue, getTagProps) =>
                            renderTags(tagValue, getTagProps)
                        }
                    />
                </Grid>
        

            </Grid>

        </Card>
    );
};

// autocomplete render input function
const renderInput = (params: any) => (
    <LightTextField
        {...params}
        placeholder="Add Tags"
        sx={{
            "& .MuiOutlinedInput-root .MuiAutocomplete-input": {
                padding: 0,
            },
        }}
    />
);

// autocomplete render tag function
const renderTags = (tagValue: any, getTagProps: any) =>
    tagValue.map((option: any, index: any) => (
        <StyledChip
            label={option}
            deleteIcon={<Clear />}
            {...getTagProps({ index })}
        />
    ));

// tag list item
const tagList = [
    "Developer",
    "React Developer",
    "Back-End Developer",
    "Front-End Developer",
    "JavaScript Developer",
];



export default AutocompleteSample;
