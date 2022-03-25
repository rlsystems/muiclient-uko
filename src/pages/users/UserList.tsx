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



// styled component
const StyledFlexBox = styled(FlexBox)(({ theme }) => ({
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  marginBottom: 20,

}));

const UserList: FC = () => {
  // change navbar title
  //useTitle("User List");
  //const { t } = useTranslation();

  //const navigate = useNavigate();
  //const handleAddUser = () => navigate("/dashboard/add-user");

  const [openModal, setOpenModal] = useState(false);


  const { appUserStore, commonStore } = useStore();
  const { loadAppUsers, appUserRegistry, appUsersSorted } = appUserStore;
  const { setTitle } = commonStore;

  setTitle("User List");

  useEffect(() => {
      if (appUserRegistry.size <= 1) loadAppUsers();
      ;
  }, [appUserRegistry.size, loadAppUsers])


  if (appUserStore.loadingInitial) return <LoadingComponent content='Loading Users new...' />

  
  return (
    <Box pt={2} pb={4}>
      <StyledFlexBox>
        <SearchInput placeholder="Search user..." />
        <Button variant="contained" onClick={() => setOpenModal(true)}>
          {("Add New User")}
        </Button>
      </StyledFlexBox>


      <RegisterUserModal         
            open={openModal}
            data={null}
            onClose={() => setOpenModal(false)}
          />
      <DataTable columnShape={UserColumnShape} data={appUsersSorted} />
     
    </Box>
  );
};

export default observer(UserList);
