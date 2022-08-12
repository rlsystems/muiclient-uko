import { FC, useEffect, useMemo, useState } from "react";
import { Box, Button, Grid, styled } from "@mui/material";
import { Add } from "@mui/icons-material";
import { observer } from "mobx-react-lite";
import { useExpanded, useFilters, useGlobalFilter, usePagination, useSortBy, useTable } from "react-table";

import { useStore } from 'app/stores/store';
import ReactTable from "components/DataTables/ReactTable/ReactTable";
import GlobalFilter from "components/DataTables/ReactTable/GlobalFilter";
import RegisterUserModal from "./RegisterUserModal";
import UserColumnShape from "./UserColumnShape";
import { paginationInitialState } from "app/hooks/usePaginationMetaData";
import { CustomTableOptions } from "app/models/reactTable";
import { H5, H6 } from "components/Typography";


const UserList: FC = () => {
  const { appUserStore, commonStore } = useStore();
  const { loadAppUsers, appUsersSorted, loadingInitial } = appUserStore;
  const { setTitle, pageSizeDefault } = commonStore;
  const [openModal, setOpenModal] = useState(false);

  const data: any = useMemo(() => appUsersSorted, [appUsersSorted]);
  const columns: any = useMemo(() => UserColumnShape, [UserColumnShape]);

  const initialState = useMemo(() => ({
    pageIndex: paginationInitialState.queryPageIndex,
    pageSize: pageSizeDefault
  }), [])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    pageOptions,
    setPageSize,
    gotoPage,
    preGlobalFilteredRows,
    setGlobalFilter,
    state,
  }: any = useTable(
    {
      columns,
      data,
      initialState
    } as CustomTableOptions<any>,
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination
  );

  useEffect(() => {
    setTitle("Users");
  }, [])

  useEffect(() => {
    loadAppUsers();
  }, [loadAppUsers])

  // if (loadingInitial) return <LoadingScreen content='Loading Users...' />

  return (
    <Box pt={2} pb={4}>

      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} md={6} >
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            setGlobalFilter={setGlobalFilter}
            globalFilter={state.globalFilter}
            inputProps={{
              placeholder: "Search users...",
            }}
          />
        </Grid>
        <Grid item xs={12} md={6} display="flex" justifyContent={{xs:"flex-start", md:"flex-end"}} >
          <Button
            endIcon={<Add />}
            variant="contained"
            onClick={() => setOpenModal(true)}>
            Add User
          </Button>
        </Grid>
      </Grid>


      {openModal && <RegisterUserModal
        open={openModal}
        data={null}
        onClose={() => setOpenModal(false)}
      />}

      <ReactTable
        getTableProps={getTableProps}
        getTableBodyProps={getTableBodyProps}
        headerGroups={headerGroups}
        prepareRow={prepareRow}
        page={page}
        pageOptions={pageOptions}
        pageIndex={state.pageIndex}
        pageSize={state.pageSize}
        setPageSize={setPageSize}
        gotoPage={gotoPage}
        isLoading={loadingInitial}
      />
      <H6 sx={{fontSize: "12px", fontWeight: "300", color: "#94A4C4"}}>Client-side pagination with ReactTable example</H6>

    </Box>
  );
};

export default observer(UserList);
