import {
    Box,
    Card,
    styled,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@mui/material";
import FlexBox from "components/FlexBox";
import { H5, Small } from "components/Typography";
import { FC } from "react";
import { NavLink } from "react-router-dom";
import ScrollBar from "simplebar-react";
import { HeadTableCell, BodyTableCell } from "components/BasicTable";

const TableSample: FC = () => {
    return (
        <Card sx={{ padding: 3 }}>
            <FlexBox justifyContent={"space-between"}>
                <H5>Tables</H5>
                <NavLink to={{ pathname: "https://mui.com/material-ui/react-table/" }} target="_blank">
                    <Small color="primary.main">Docs</Small>
                </NavLink>
            </FlexBox>
            <Small color="text.disabled">
                Styled table example with scrollbar (simplebar-react). For dynamic tables see <NavLink to={{ pathname: "https://react-table-v7.tanstack.com/" }} target="_blank">
                    <Small color="primary.main">react-table</Small>
                </NavLink>
            </Small>
            <ScrollBar>
                <Table>
                    <TableHead
                        sx={{ borderBottom: "1.5px solid", borderColor: "divider" }}
                    >
                        <TableRow>
                            <HeadTableCell>Tracking No</HeadTableCell>
                            <HeadTableCell>Product Name</HeadTableCell>
                            <HeadTableCell>Price</HeadTableCell>
                            <HeadTableCell>Total Order</HeadTableCell>
                            <HeadTableCell>Total amount</HeadTableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {orderList.map((item, index) => (
                            <TableRow key={index}>
                                <BodyTableCell>{item.orderNo}</BodyTableCell>
                                <BodyTableCell>
                                    {item.name}
                                </BodyTableCell>
                                <BodyTableCell>${item.price}</BodyTableCell>
                                <BodyTableCell>
                                    <Box
                                        sx={{
                                            backgroundColor: "secondary.200",
                                            borderRadius: 11,
                                            maxWidth: 55,
                                            padding: "0.3rem",
                                            textAlign: "center",
                                            color: "secondary.400",
                                        }}
                                    >
                                        {item.totalOrder}
                                    </Box>
                                </BodyTableCell>
                                <BodyTableCell>{item.totalAmount}</BodyTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </ScrollBar>
        </Card>
    );
};

const orderList = [
    {
        orderNo: "#IRER09",
        name: "Rocket Launcher",
        price: 200,
        totalOrder: 125,
        totalAmount: "$2,250,660",
    },
    {
        orderNo: "#KJNASF",
        name: "Bear Trap",
        price: 25,
        totalOrder: 750,
        totalAmount: "$1,090,420",
    },
    {
        orderNo: "#ASF11AF",
        name: "Space Suit",
        price: 950,
        totalOrder: 117,
        totalAmount: "$650,660",
    },
    {
        orderNo: "#ADFA7",
        name: "Range Finder",
        price: 55,
        totalOrder: 225,
        totalAmount: "$120,660",
    },
];


export default TableSample;
