import { Box, Button, styled } from "@mui/material";
import DataTable from "../../components/dataTable/DataTable";
import FlexBox from "../../components/FlexBox";
import SearchInput from "../../components/SearchInput";

//import useTitle from "hooks/useTitle";
import { FC, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";


import { useStore } from '../../app/stores/store';
import TenantColumnShape from "./TenantColumnShape";
import LoadingComponent from "../../components/LoadingComponent";
import { Add } from "@mui/icons-material";
import RegisterTenantModal from "./RegisterTenantModal";



// styled component
const StyledFlexBox = styled(FlexBox)(({ theme }) => ({
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  marginBottom: 20,

}));

const TenantList: FC = () => {



  const { tenantStore, commonStore } = useStore();
  const { loadTenants, tenantRegistry, tenantsSorted, loadingInitial } = tenantStore;
  const { setTitle } = commonStore;

  setTitle("Tenants");

  useEffect(() => {
    if (tenantRegistry.size <= 1) loadTenants();
  }, [tenantRegistry.size, loadTenants])

  const [openModal, setOpenModal] = useState(false);


  if (loadingInitial) return <LoadingComponent content='Loading Tenants...' />


  return (
    <Box pt={2} pb={4}>
      <StyledFlexBox>
        <SearchInput placeholder="Search tenants..." />
        <Button endIcon={<Add />} variant="contained" onClick={() => setOpenModal(true)}>
          {("Add Tenant")}
        </Button>
      </StyledFlexBox>


      <RegisterTenantModal
        open={openModal}
        data={null}
        onClose={() => setOpenModal(false)}
      />
      <DataTable columnShape={TenantColumnShape} data={tenantsSorted} />

    </Box>
  );
};

export default observer(TenantList);
