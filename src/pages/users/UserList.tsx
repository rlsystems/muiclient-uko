import { Box, Button, styled } from "@mui/material";
import CustomTable from "../../components/adminEcommerce/CustomTable";
import FlexBox from "../../components/FlexBox";
import SearchInput from "../../components/SearchInput";
import UserListColumnShape from "../../components/userManagement/columnShape";
import { userListFakeData } from "../../components/userManagement/fakeData";
//import useTitle from "hooks/useTitle";
import { FC, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
//import { useTranslation } from "react-i18next";
//import { useNavigate } from "react-router-dom";

import { useStore } from '../../app/stores/store';
import LoadingComponent from "../../app/layout/LoadingComponent";
import RegisterNewUserModal from "../../components/userManagement/RegisterNewUserModal";
import { RegisterUserFormValues } from "../../app/models/user";



// styled component
const StyledFlexBox = styled(FlexBox)(({ theme }) => ({
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  marginBottom: 20,
  [theme.breakpoints.down(500)]: {
    width: "100%",
    "& .MuiInputBase-root": { maxWidth: "100%" },
    "& .MuiButton-root": {
      width: "100%",
      marginTop: 15,
    },
  },
}));

const UserList: FC = () => {
  // change navbar title
  //useTitle("User List");
  //const { t } = useTranslation();

  //const navigate = useNavigate();
  //const handleAddUser = () => navigate("/dashboard/add-user");

  const [openModal, setOpenModal] = useState(false);


  const { appUserStore } = useStore();
  const { loadAppUsers, appUserRegistry, appUsersSorted } = appUserStore;


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

      <CustomTable columnShape={UserListColumnShape} data={appUsersSorted} />
      <RegisterNewUserModal
            edit
            open={openModal}
            data={null}
            onClose={() => setOpenModal(false)}
          />
    </Box>
  );
};

export default observer(UserList);
