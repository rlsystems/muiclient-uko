import {
    Card,
    Grid,
    Menu,
    MenuItem,
} from "@mui/material";
import FlexBox from "components/FlexBox";
import ListCard from "components/ListCard";
import { H5, Small } from "components/Typography";
import DeleteIcon from "icons/DeleteIcon";
import PencilIcon from "icons/PencilIcon";
import { FC, useState, MouseEvent } from "react";
import { NavLink } from "react-router-dom";



const PopoverSample: FC = () => {
    const [moreEl, setMoreEl] = useState<null | HTMLElement>(null);
    const handleMoreOpen = (event: MouseEvent<HTMLButtonElement>) => {
        setMoreEl(event.currentTarget);
    };
    const handleMoreClose = () => setMoreEl(null);

    return (
        <Card sx={{ padding: 3 }}>
            <FlexBox justifyContent={"space-between"}>
                <H5>Popover</H5>
                <NavLink to={{ pathname: "https://mui.com/material-ui/react-popover/" }} target="_blank">
                    <Small color="primary.main">Docs</Small>
                </NavLink>
            </FlexBox>
            <Small color="text.disabled">
                Sample popover menu with list items
            </Small>

            <Grid container spacing={6} pt={3} >
                <Grid item xs={12} md={6}>
                    <ListCard item={sampleItem1} handleMore={handleMoreOpen} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <ListCard item={sampleItem2} handleMore={handleMoreOpen} />
                </Grid>
                <MoreOptions anchorEl={moreEl} handleMoreClose={handleMoreClose} />
            </Grid>



        </Card>
    );
};


//Sample list card items
const sampleItem1 = {
    title: "Amazon",
    image: "/static/brand-logo/amazon.svg",
    snippet: "Online retailer",
};
const sampleItem2 = {
    title: "Github",
    image: "/static/brand-logo/github.svg",
    snippet: "Source control platform",
};

//Popover Menu 
interface MoreOptionsProps {
    open?: boolean;
    anchorEl: HTMLElement | null;
    handleMoreClose: () => void;
}

const MoreOptions: FC<MoreOptionsProps> = ({ anchorEl, handleMoreClose }) => {
    return (
        <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMoreClose}
        >
            <MenuItem
                onClick={handleMoreClose}
                sx={{ "&:hover": { color: "primary.main" } }}
            >
                <PencilIcon sx={{ fontSize: 14, marginRight: 1 }} />
                <Small fontWeight={500}>Edit</Small>
            </MenuItem>
            <MenuItem
                onClick={handleMoreClose}
                sx={{ "&:hover": { color: "primary.main" } }}
            >
                <DeleteIcon sx={{ fontSize: 14, marginRight: 1 }} />
                <Small fontWeight={500}>Remove</Small>
            </MenuItem>
        </Menu>
    );
};



export default PopoverSample;
