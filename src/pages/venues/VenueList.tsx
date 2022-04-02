import { Box, Button, styled, Tooltip } from "@mui/material";
import DataTable from "../../components/dataTable/DataTable";
import FlexBox from "../../components/FlexBox";
import SearchInput from "../../components/SearchInput";

//import useTitle from "hooks/useTitle";
import { FC, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";


import { useStore } from '../../app/stores/store';
import VenueColumnShape from "./VenueColumnShape";
import { Add } from "@mui/icons-material";
import LoadingScreen from "../../components/LoadingScreen";
import { RoleID } from "app/models/user";



// styled component
const StyledFlexBox = styled(FlexBox)(({ theme }) => ({
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  marginBottom: 20,

}));

const VenueList = () => {
  const { venueStore, commonStore, userStore } = useStore();
  const { loadVenues, venueRegistry, venuesSorted, loadingInitial } = venueStore;
  const { setTitle } = commonStore;

  setTitle("Venues");

  useEffect(() => {
    if (venueRegistry.size <= 1) loadVenues();
  }, [venueRegistry.size, loadVenues])

  if (loadingInitial) return <LoadingScreen content='Loading Venues...' />

  return (
    <Box pt={2} pb={4}>
      <StyledFlexBox>
        <SearchInput placeholder="Search venues..." />
        {
          userStore.currentUser?.roleId !== RoleID.basic ?
            <Button
              endIcon={<Add />}
              variant="contained"
              onClick={() => console.log('new venue')}
            >
              {("Add Venue")}
            </Button> :
            <Tooltip title="Basic user cannot use this feature">
              <span>
                <Button
                  endIcon={<Add />}
                  disabled
                  variant="contained"
                >
                  {("Add Venue")}
                </Button>
              </span>
            </Tooltip>
          }
      </StyledFlexBox>

      <DataTable columnShape={VenueColumnShape} data={venuesSorted} />

    </Box>
  );
};

export default observer(VenueList);
