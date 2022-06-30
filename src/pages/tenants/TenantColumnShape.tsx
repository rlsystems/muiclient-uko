import { useState } from "react";
import { H6, Small } from "components/Typography";
import EditIconButton from "components/EditIconButton";
import EditTenantModal from "./EditTenantModal";
import { Box } from "@mui/material";

const TenantColumnShape = [
  {
    Header: "Key",
    accessor: "id",
    minWidth: 150,
    Cell: ({ row }: any) => {

      const { id } = row.original;
      return (
        <H6 color="text.disabled"
        >{id}</H6>
      );
    },
  },
  {
    Header: "Name",
    accessor: "name",
    minWidth: 250,
    Cell: ({ row }: any) => {

      const { name } = row.original;
      return (
        <H6 color="text.primary"
          sx={{ textTransform: "capitalize" }}
        >{name}</H6>
      );
    },
  },
  {
    Header: "Active",
    accessor: "isActive",
    minWidth: 150,
    canFilter: false,
    Cell: ({ value }: any) => (
      <Small
        sx={{
          color: value.toString().toLowerCase() === "true" ? "success.main" : "error.main",
          textTransform: "capitalize"
        }}
      >
        {value.toString() === "true" ? "Yes" : "No"}
      </Small>
    ),
  },

  {
    Header: "Edit",
    accessor: "action",
    Cell: ({ row }: any) => {
      const [openModal, setOpenModal] = useState(false);
      const { id } = row.original;
      return (
        <>
          {id != "root" && <EditIconButton onClick={() => setOpenModal(true)} />}
          {id == "root" && <Box sx={{height: "36px"}}/>}

          {openModal && <EditTenantModal
            open={openModal}
            data={row.original}
            onClose={() => setOpenModal(false)}
          />}
        </>
      );
    },
  },
];

export default TenantColumnShape;
