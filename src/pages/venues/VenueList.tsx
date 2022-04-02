import { Box, Button, styled } from "@mui/material";
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



// styled component
const StyledFlexBox = styled(FlexBox)(({ theme }) => ({
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  marginBottom: 20,

}));

const VenueList: FC = () => {



  const { venueStore, commonStore } = useStore();
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
        <Button
          endIcon={<Add />}
          variant="contained"
          onClick={() => console.log('new venue')}>
          {("Add Venue")}
        </Button>
      </StyledFlexBox>



      <DataTable columnShape={VenueColumnShape} data={venuesSorted} />

    </Box>
  );
};

export default observer(VenueList);
