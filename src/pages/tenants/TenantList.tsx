import { FC, useEffect, useMemo, useState } from "react";
import { Box, Button, Grid, styled } from "@mui/material";
import { observer } from "mobx-react-lite";
import { Add } from "@mui/icons-material";
import { useExpanded, useFilters, useGlobalFilter, usePagination, useSortBy, useTable } from "react-table";
import { useStore } from 'app/stores/store';
import TenantColumnShape from "./TenantColumnShape";
import RegisterTenantModal from "./RegisterTenantModal";
import { Tenant } from "app/models/tenant";
import { paginationInitialState } from "app/hooks/usePaginationMetaData";
import { CustomTableOptions } from "app/models/reactTable";
import { H6 } from "components/Typography";
import ReactTable from "components/DataTables/ReactTable/ReactTable";
import GlobalFilter from "components/DataTables/ReactTable/GlobalFilter";

// tenants list table, accessable to root admin only
const TenantList: FC = () => {
  const { tenantStore, commonStore } = useStore();
  const { loadTenants, tenantsSorted, loadingInitial } = tenantStore;
  const { setTitle, pageSizeDefault } = commonStore;
  const data: Tenant[] = useMemo(() => tenantsSorted, [tenantsSorted]);
  const columns: any = useMemo(() => TenantColumnShape, [TenantColumnShape]);

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
      <H6 sx={{fontSize: "12px", fontWeight: "300", color: "#94A4C4"}}>Demo Tip: To see multitenancy in action, try logging in as other tenants. Default password for all users is Password123!</H6>
    </Box>
  );
};

export default observer(TenantList);
