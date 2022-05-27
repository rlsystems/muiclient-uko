import { FC, useEffect, useMemo, useState } from "react";
import { Box, Button, styled } from "@mui/material";
import { observer } from "mobx-react-lite";
import { Add } from "@mui/icons-material";
import { useExpanded, useFilters, useGlobalFilter, usePagination, useSortBy, useTable } from "react-table";


import { useStore } from 'app/stores/store';
import FlexBox from "components/FlexBox";
import TenantColumnShape from "./TenantColumnShape";
import RegisterTenantModal from "./RegisterTenantModal";
import ReactTable from "components/ReactTable";
import { Tenant } from "app/models/tenant";
import GlobalFilter from "components/GlobalFilter";

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
  const data: Tenant[] = useMemo(() => tenantsSorted, [tenantsSorted]);
  const columns: any = useMemo(() => TenantColumnShape, [TenantColumnShape]);


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
  },
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
      <StyledFlexBox>
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          setGlobalFilter={setGlobalFilter}
          globalFilter={state.globalFilter}
          inputProps={{
            placeholder: 'Search tenants...'
          }}
        />
        <Button
          endIcon={<Add />}
          variant="contained"
          onClick={() => setOpenModal(true)}>
          Add Tenant
        </Button>
      </StyledFlexBox>

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
