import {
    Box,
    Button,
    Card,
    Grid,
    Modal,

} from "@mui/material";
import FlexBox from "components/FlexBox";

import { H5, Small } from "components/Typography";
import { FC, useState } from "react";
import { NavLink } from "react-router-dom";



  //// -- To prevent close on backdrop click --
  // const handleBackdropClose = (_: any, reason: any) => {
  //   if (reason && reason == "backdropClick")
  //   return;
  //   handleClose();
  // }



const ModalSample: FC = () => {
    const [openModal, setOpenModal] = useState(false);
    return (
        <Card sx={{ padding: 3 }}>
             <FlexBox justifyContent={"space-between"}>
                <H5>Modal</H5>
                <NavLink to={{ pathname: "https://mui.com/material-ui/react-modal/" }} target="_blank">
                    <Small color="primary.main">Docs</Small>
                </NavLink>
            </FlexBox>
            <Small color="text.disabled">
                Modal dialog example with overlay
            </Small>

            <Grid container spacing={4} marginTop={.5}>
                <Grid item xs={12} >
                    <Button
                        onClick={() => setOpenModal(true)}
                        variant="contained">
                        Open Modal
                    </Button>
                </Grid>

                <ModalExample
                    openModal={openModal}
                    closeModal={() => setOpenModal(false)}             
                />
            </Grid>

        </Card>
    );
};


//modal window props interface
interface ModalExampleProps {
    openModal: boolean;
    closeModal: () => void;
}

const ModalExample: FC<ModalExampleProps> = ({
    openModal,
    closeModal,
}) => {

    return (
        <Modal open={openModal} onClose={closeModal}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    maxWidth: 700,
                    minWidth: 370,
                    width: "100%",
                    backgroundColor: "background.paper",
                    boxShadow: 2,
                    borderRadius: "8px",
                    padding: 3
                }}
            >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium mollitia dolor officiis provident, minima ipsum vero eos consequuntur hic corporis adipisci doloribus culpa temporibus alias soluta facilis, neque natus atque!
            </Box>
        </Modal>
    );
};




export default ModalSample;
