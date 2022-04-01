import { Box, Button, styled } from "@mui/material";
import DataTable from "../../components/dataTable/DataTable";
import FlexBox from "../../components/FlexBox";
import SearchInput from "../../components/SearchInput";
import UserColumnShape from "./UserColumnShape";
//import useTitle from "hooks/useTitle";
import { FC, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
//import { useTranslation } from "react-i18next";
//import { useNavigate } from "react-router-dom";

import { useStore } from '../../app/stores/store';
import LoadingComponent from "../../components/LoadingComponent";
import RegisterUserModal from "./RegisterUserModal";
import { Add } from "@mui/icons-material";



// styled component
const StyledFlexBox = styled(FlexBox)(({ theme }) => ({
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  marginBottom: 20,

}));

const UserList: FC = () => {


  const { appUserStore, commonStore } = useStore();
  const { loadAppUsers, appUserRegistry, appUsersSorted } = appUserStore;
  const { setTitle } = commonStore;

  useEffect(() => {
    if (appUserRegistry.size <= 1) loadAppUsers();
    ;
  }, [appUserRegistry.size, loadAppUsers])


  //Set title in Navigation
  setTitle("Users");

  //Modal State
  const [openModal, setOpenModal] = useState(false);



  if (appUserStore.loadingInitial) return <LoadingComponent content='Loading Users...' />


  return (
    <Box pt={2} pb={4}>
      <StyledFlexBox>
        <SearchInput placeholder="Search users..." />
        <Button
          endIcon={<Add />}
          variant="contained"
          onClick={() => setOpenModal(true)}>
          {("Add User")}
        </Button>
      </StyledFlexBox>

      {openModal && <RegisterUserModal
        open={openModal}
        data={null}
        onClose={() => setOpenModal(false)}
      />
      }
    
      <DataTable columnShape={UserColumnShape} data={appUsersSorted} />

    </Box>
  );
};

export default observer(UserList);
