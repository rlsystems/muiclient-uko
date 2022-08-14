import { Add, Remove } from "@mui/icons-material";
import {
    Box,
    ButtonBase,
    Card,
    styled,
} from "@mui/material";
import FlexBox from "components/FlexBox";
import { H3, H5, Small, Tiny } from "components/Typography";
import { FC, useState } from "react";

const StyledButton = styled(ButtonBase)(({ theme }) => ({
    width: 35,
    height: 35,
    borderRadius: "8px",
    backgroundColor:
        theme.palette.mode === "light"
            ? theme.palette.secondary[200]
            : theme.palette.divider,
}));

const Incrementer: FC = () => {
    const [quantity, setQuantity] = useState(1);
    return (
        <Card sx={{ padding: 3 }}>
            <H5>Incrementer</H5>
            <Small color="text.disabled">
                Numeric input control
            </Small>
            <Box mt={3} >
                <FlexBox alignItems="center">
                    <StyledButton onClick={() => setQuantity((state) => state + 1)}>
                        <Add color="disabled" />
                    </StyledButton>
                    <H3 width={40} textAlign="center">
                        {quantity}
                    </H3>
                    <StyledButton
                        onClick={() =>
                            setQuantity((state) => (state > 0 ? state - 1 : state))
                        }
                    >
                        <Remove color="disabled" />
                    </StyledButton>
                </FlexBox>
            </Box>
        </Card>
    );
};

export default Incrementer;
