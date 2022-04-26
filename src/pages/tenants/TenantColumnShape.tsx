import { useState } from "react";
import { H6, Small } from "components/Typography";
import EditIconButton from "components/EditIconButton";

const TenantColumnShape = [
  {
    Header: "Key",
    accessor: "key",
    minWidth: 200,
    Cell: ({ row }: any) => {

      const { key } = row.original;
      return (
        <H6 color="text.primary"
          sx={{textTransform: "capitalize"}}
        >{key}</H6>
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
          color: value.toString().toLowerCase() === "true" ? "" : "error.main",
          textTransform: "capitalize"
        }}
      >
        {/* <CheckDoneIcon color="success" /> */}
        {value.toString() === "true" ? "Yes" : "No"}
      </Small>
    ),
  },

  {
    Header: "Edit",
    accessor: "action",
    Cell: () => {
      const [, setOpenModal] = useState(false);
      return (
        <EditIconButton onClick={() => setOpenModal(true)} />
      );
    },
  },
];

export default TenantColumnShape;
