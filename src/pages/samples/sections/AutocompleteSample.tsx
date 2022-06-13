import { Clear, KeyboardArrowDown } from "@mui/icons-material";
import {
    Autocomplete,
    Card,
    Grid,

} from "@mui/material";
import FlexBox from "components/FlexBox";
import LightTextField from "components/LightTextField";
import { StyledChip } from "components/StyledComponent";
import { H5, Small } from "components/Typography";
import { FC } from "react";
import { NavLink } from "react-router-dom";




const AutocompleteSample: FC = () => {

    return (
        <Card sx={{ padding: 3 }}>
            <FlexBox justifyContent={"space-between"}>
                <H5>Autocomplete</H5>
                <NavLink to={{ pathname: "https://mui.com/material-ui/react-autocomplete/" }} target="_blank">
                    <Small color="primary.main">Docs</Small>
                </NavLink>
            </FlexBox>
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
