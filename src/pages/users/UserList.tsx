import { FC, useEffect, useMemo, useState } from "react";
import { Box, Button, styled } from "@mui/material";
import { Add } from "@mui/icons-material";
import { observer } from "mobx-react-lite";
import { useExpanded, useFilters, useGlobalFilter, usePagination, useSortBy, useTable } from "react-table";

import { useStore } from 'app/stores/store';
import LoadingScreen from "components/LoadingScreen";
import FlexBox from "components/FlexBox";
import ReactTable from "components/ReactTable";
import GlobalFilter from "components/GlobalFilter";
import RegisterUserModal from "./RegisterUserModal";
import UserColumnShape from "./UserColumnShape";
import { paginationInitialState } from "app/hooks/usePaginationMetaData";
import { CustomTableOptions } from "app/models/reactTable";

const StyledFlexBox = styled(FlexBox)(({ theme }) => ({
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  marginBottom: 20,
}));

const UserList: FC = () => {
  const { appUserStore, commonStore } = useStore();
  const { loadAppUsers, appUserRegistry, appUsersSorted, loadingInitial } = appUserStore;
  const { setTitle } = commonStore;
  const [openModal, setOpenModal] = useState(false);

  const data: any = useMemo(() => appUsersSorted, [appUsersSorted]);
  const columns: any = useMemo(() => UserColumnShape, [UserColumnShape]);

  const initialState = useMemo(() => ({
      pageIndex: paginationInitialState.queryPageIndex,
      pageSize: paginationInitialState.queryPageSize
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
      <StyledFlexBox>
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            setGlobalFilter={setGlobalFilter}
            globalFilter={state.globalFilter}
            inputProps={{
              placeholder: "Search users...",
            }}
          />

        <Button
          endIcon={<Add />}
          variant="contained"
          onClick={() => setOpenModal(true)}>
          Add User
        </Button>
      </StyledFlexBox>

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

    </Box>
  );
};

export default observer(UserList);
