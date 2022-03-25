import { useState } from "react";
import FlexBox from "../../components/FlexBox";
import { H6, Small, Tiny } from "../../components/Typography";
import UkoAvatar from "../../components/UkoAvatar";
import EditIconButton from "../../components/EditIconButton";

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
    Cell: ({ value }: any) => (
      <Small
        sx={{
          color: value.toString().toLowerCase() === "true" ? "" : "error.main",
          textTransform: "capitalize"
        }}
      >
        {/* <CheckDoneIcon color="success" /> */}
        {value.toString() =="true" ? "Yes" : "No"}
      </Small>
    ),
  },

  {
    Header: "Edit",
    accessor: "action",
    Cell: ({ row }: any) => {
      // const { appUserStore } = useStore();
      // const { appUserRegistry } = appUserStore;
      const [openModal, setOpenModal] = useState(false);
      //const selectedUser = appUserStore.getAppUser(row.original['id']);
      return (
        <>
          <EditIconButton onClick={() => setOpenModal(true)} />
        
          
        </>
      );
    },
  },
];

export default TenantColumnShape;
