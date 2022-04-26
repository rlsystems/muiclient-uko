import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { Box, Button, Stack, styled, Tooltip } from "@mui/material";
import { Add, Search } from "@mui/icons-material";
import { observer } from "mobx-react-lite";

import DataTable from "components/dataTable";
import FlexBox from "components/FlexBox";
import SearchInput from "components/SearchInput";
import LoadingScreen from "components/LoadingScreen";
import { useStore } from 'app/stores/store';
import VenueColumnShape from "./VenueColumnShape";
import { RoleID } from "app/models/user";
import AddVenueModal from "./AddVenueModal";
import { Venue } from "app/models/venue";
import usePaginationMetaData from "app/hooks/usePaginationMetaData";

const StyledFlexBox = styled(FlexBox)(({ theme }) => ({
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  marginBottom: 20,
}));

const VenueList = () => {
  const { venueStore, commonStore, userStore } = useStore();
  const { loadVenues, venues, loadingInitial, loading } = venueStore;
  const { setTitle } = commonStore;
  const [openModal, setOpenModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [{ queryPageIndex, queryPageSize, totalPageCount }, dispatch] =
    usePaginationMetaData(); //QUESTION! - what is the purpose of this
  // const timeout = useRef()
  const data: Venue[] = useMemo(() => venues, [venues]);
  const columns: any = useMemo(() => VenueColumnShape, [VenueColumnShape]);


  // const handleSearchInputFieldDebounce = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   clearTimeout(timeout.current)
  //   const {value} = evt.target

  //   setSearchQuery(value)
  //   timeout.current = setTimeout(() => {
  //     loadVenues(queryPageIndex + 1, queryPageSize, value);
  //   }, 600) as any
  // }

  const handleSearchInputField = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {value} = evt.target;
    setSearchQuery(value); //QUESTION! - does this fire on keypress?
    if (!value) loadVenues(queryPageIndex + 1, queryPageSize); //QUESTION! - if null value, load venues - gets 10 value from usePaginationMetaData?
  }

  useEffect(() => {
    setTitle("Venues"); //places the function into the normal react flow
  }, []) //must always pass an array

  useEffect(() => {
    loadVenues(queryPageIndex + 1, queryPageSize); //QUESTION! - start discussion here
  }, [loadVenues, queryPageSize, queryPageIndex]) //QUESTION! - what triggers the table re-rendering

  if (loadingInitial || loading) return <LoadingScreen content='Loading Venues...' />

  return (
    <Box pt={2} pb={4}>
      <StyledFlexBox>
        <Stack direction="row" alignItems="stretch">
          <SearchInput
            value={searchQuery} //QUESTION! - must inputs always have this loop
            onChange={handleSearchInputField}
            placeholder="Search venues..."
          />

          {
            searchQuery &&
            <Button
            sx={{
              marginLeft: 2
            }}
            startIcon={<Search/>}
            variant="contained"
            onClick={() => loadVenues(queryPageIndex + 1, queryPageSize, searchQuery)}
            >
              Search
            </Button>
          }
        </Stack>

        {
          userStore.currentUser?.roleId !== RoleID.basic ?
            <Button
              endIcon={<Add />}
              variant="contained"
              onClick={() => setOpenModal(true)}
            >
              Add Venue
            </Button> :
            <Tooltip title="Basic user cannot use this feature">
              <span>
                <Button
                  endIcon={<Add />}
                  disabled
                  variant="contained"
                >
                  Add Venue
                </Button>
              </span>
            </Tooltip>
          }
      </StyledFlexBox>

      {
        openModal && <AddVenueModal
          open={openModal}
          data={null}
          onClose={() => setOpenModal(false)}
        />
      }

      <DataTable
        data={data}
        columns={columns}
        dispatch={dispatch}
        queryPageSize={queryPageSize}
        queryPageIndex={queryPageIndex}
        totalPageCount={totalPageCount}
      />

    </Box>
  );
};

export default observer(VenueList);
