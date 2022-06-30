import { FC, useEffect, useMemo, useState } from "react";
import { Box, Button, Grid, styled } from "@mui/material";
import { observer } from "mobx-react-lite";
import { Add } from "@mui/icons-material";
import { useExpanded, useFilters, useGlobalFilter, usePagination, useSortBy, useTable } from "react-table";


import { useStore } from 'app/stores/store';
import FlexBox from "components/FlexBox";
import TenantColumnShape from "./TenantColumnShape";
import RegisterTenantModal from "./RegisterTenantModal";
import ReactTable from "components/DataTables/ReactTable/ReactTable";
import { Tenant } from "app/models/tenant";
import GlobalFilter from "components/GlobalFilter/GlobalFilter";
import { paginationInitialState } from "app/hooks/usePaginationMetaData";
import { CustomTableOptions } from "app/models/reactTable";


const TenantList: FC = () => {
  const { tenantStore, commonStore } = useStore();
  const { loadTenants, tenantRegistry, tenantsSorted, loadingInitial } = tenantStore;
  const { setTitle } = commonStore;
  const data: Tenant[] = useMemo(() => tenantsSorted, [tenantsSorted]);
  const columns: any = useMemo(() => TenantColumnShape, [TenantColumnShape]);

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
    } as CustomTableOptions<Tenant>,
    useFilters,
    useGlobalFilter,
    useSortBy,
    useExpanded,
    usePagination
  );

  useEffect(() => {
    setTitle("Tenants");
  }, [])

  useEffect(() => {
    loadTenants();
  }, [loadTenants])

  const [openModal, setOpenModal] = useState(false);

  return (
    <Box pt={2} pb={4}>
      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} md={6}>
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            setGlobalFilter={setGlobalFilter}
            globalFilter={state.globalFilter}
            inputProps={{
              placeholder: 'Search tenants...'
            }}
          />
        </Grid>
        <Grid item xs={12} md={6} display="flex" justifyContent={{ xs: "flex-start", md: "flex-end" }} >
          <Button
            endIcon={<Add />}
            variant="contained"
            onClick={() => setOpenModal(true)}>
            Add Tenant
          </Button>
        </Grid>
      </Grid>

      <RegisterTenantModal
        open={openModal}
        data={null}
        onClose={() => setOpenModal(false)}
      />

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

export default observer(TenantList);
