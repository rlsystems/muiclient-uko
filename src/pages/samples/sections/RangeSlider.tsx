import {
    Box,
    Card,
    Slider,
} from "@mui/material";
import FlexBox from "components/FlexBox";
import { H5, Small, Tiny } from "components/Typography";
import { FC, useState } from "react";
import { NavLink } from "react-router-dom";


const RangeSlider: FC = () => {
    const [value, setValue] = useState<number[]>([100, 1000]);

    const handleChange = (e: Event, value: number | number[]) => {
        setValue(value as number[]);
    };

    return (
        <Card sx={{ padding: 3 }}>
            <FlexBox justifyContent={"space-between"}>
                <H5>Range Slider</H5>
                <NavLink to={{ pathname: "https://mui.com/material-ui/react-slider/" }} target="_blank">
                    <Small color="primary.main">Docs</Small>
                </NavLink>
            </FlexBox>
            <Small color="text.disabled">
                Styled range control slider
            </Small>

            <Box mt={3} width="70%">

                <Slider
                    disableSwap
                    color="primary"
                    value={value}
                    valueLabelFormat={(value) => `$${value}`}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    min={100}
                    max={1000}
                    sx={{
                        "& .MuiSlider-thumb": {
                            width: 13,
                            height: 13,
                        },
                        "& .MuiSlider-thumbColorPrimary:hover": {
                            boxShadow: "0px 0px 0px 5px rgb(97 169 255 / 16%)",
                        },
                        "& .MuiSlider-thumbColorPrimary.Mui-focusVisible": {
                            boxShadow: "0px 0px 0px 5px rgb(97 169 255 / 16%)",
                        },
                        ".MuiSlider-colorPrimary .MuiSlider-valueLabelLabel": {
                            color: "background.paper",
                        },
                        "& .MuiSlider-thumbColorPrimary .MuiSlider-valueLabel": {
                            backgroundColor: "primary.main",
                        },
                    }}
                />
                <FlexBox alignItems="center" justifyContent="space-between">
                    <Tiny fontWeight={500} color="text.disabled">
                        Min
                    </Tiny>
                    <Tiny fontWeight={500} color="text.disabled">
                        Max
                    </Tiny>
                </FlexBox>
            </Box>

        </Card>
    );
};



export default RangeSlider;
