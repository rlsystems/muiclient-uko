import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { Box, Button, Grid, Stack, Tooltip } from "@mui/material";
import { Add, Search } from "@mui/icons-material";
import { observer } from "mobx-react-lite";
import { useStore } from 'app/stores/store';
import usePaginationMetaData, { TOTAL_PAGE_COUNT_CHANGED } from "app/hooks/usePaginationMetaData";

import { Roles } from "app/models/roles";
import { Venue } from "app/models/venue";
import { H5, H6 } from "components/Typography";

import SearchInput from "components/formInput/SearchInput";
import VenueColumnShape from "./VenueColumnShape";
import VenueModal from "./VenueModal";
import ResultText from "components/DataTables/ServerTable/ResultText";
import ServerTable, { ColumnShape } from "components/DataTables/ServerTable/ServerTable";


const VenueList = () => {
  const { venueStore, commonStore, currentUserStore } = useStore();
  const { loadVenues, venues, venueMetaData, loadingInitial } = venueStore;
  const { setTitle } = commonStore;
  const [openModal, setOpenModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredQuery, setFilteredQuery] = useState("");
  const [state, dispatch] = usePaginationMetaData(commonStore.pageSizeDefault);
  const data: Venue[] = useMemo(() => venues, [venues]);
  const columns: ColumnShape<Venue>[] = useMemo(() => VenueColumnShape({queryPageIndex: state.queryPageIndex, queryPageSize: state.queryPageSize}), [VenueColumnShape, state]);

  const handleSearchButton = () => {
    setSearchQuery("")
    setFilteredQuery(searchQuery);
    loadVenues(state.queryPageIndex + 1, state.queryPageSize, searchQuery);
  }

  const handleClearFiltersButton = () => {
    setFilteredQuery("");
    loadVenues(state.queryPageIndex + 1, state.queryPageSize);
  }

  const handleSearchInputField = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = evt.target;
    setSearchQuery(value);
  }

  useEffect(() => {
    setTitle("Venues");
  }, [])

  useEffect(() => {
    dispatch({
      type: TOTAL_PAGE_COUNT_CHANGED,
      payload: venueMetaData?.totalPages || 0,
    });
  }, [venueMetaData?.totalPages]);

  useEffect(() => {
    loadVenues(state.queryPageIndex + 1, state.queryPageSize);
    setFilteredQuery("")
  }, [loadVenues, state.queryPageSize, state.queryPageIndex])


  return (
    <Box pt={2} pb={4}>
      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} md={6}>
          <Stack direction="row" alignItems="stretch">
            <SearchInput
              value={searchQuery}
              onChange={handleSearchInputField}
              placeholder="Search venues..."
            />

            {searchQuery && (<Button
              sx={{
                marginLeft: 2,
                px: "30px"

              }}
              startIcon={<Search />}
              variant="contained"
              onClick={handleSearchButton}
            >
              Search
            </Button>)}
          </Stack>
        </Grid>
        <Grid item xs={12} md={6} display="flex" justifyContent={{ xs: "flex-start", md: "flex-end" }} >
          {currentUserStore.currentUser?.roleId !== Roles.basic ? (<Button
            endIcon={<Add />}
            variant="contained"
            onClick={() => setOpenModal(true)}

          >
            Add Venue
          </Button>) : (<Tooltip title="Basic user cannot use this feature">
            <span>
              <Button
                endIcon={<Add />}
                disabled
                variant="contained"
              >
                Add Venue
              </Button>
            </span>
          </Tooltip>)}
        </Grid>
      </Grid>

      {filteredQuery && (<Box my={2}>
        <H5 sx={{ color: "text.primary" }}>
          Showing results for <strong>"{filteredQuery}"</strong>, <ResultText
            italic
            color="#fff"
            onClick={handleClearFiltersButton}>
            Clear?
          </ResultText>
        </H5>
      </Box>)}

      {openModal && (<VenueModal
        open={openModal}
        isEdit={false}
        data={null}
        onClose={() => setOpenModal(false)}
        paginationState={{queryPageIndex: state.queryPageIndex + 1, queryPageSize: state.queryPageSize}}
      />)}


      <ServerTable
        data={data}
        columns={columns}
        paginationState={state}
        paginationDispatch={dispatch}
        isLoading={loadingInitial}
      />
      <H6 sx={{ fontSize: "12px", fontWeight: "300", color: "#94A4C4" }}>Server-side pagaination example</H6>
    </Box>
  );
};

export default observer(VenueList);
