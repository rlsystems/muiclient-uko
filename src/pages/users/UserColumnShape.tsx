import { useState } from "react";
import FlexBox from "components/FlexBox";
import { H6, Small, Tiny } from "components/Typography";
import NanoAvatar from "components/NanoAvatar";
import EditIconButton from "components/EditIconButton";
import EditUserModal from "./EditUserModal";
import { useStore } from "app/stores/store";


const UserColumnShape = [
  {
    Header: "Name",
    accessor: (row: any) => row.firstName + " " + row.lastName,
    minWidth: 200,
    Cell: ({ row }: any) => {

      const { firstName, lastName, imageUrl } = row.original;
      return (
        <FlexBox alignItems="center">
          <NanoAvatar src={imageUrl || ""} />
          <FlexBox flexDirection="column" ml={2}>
            <H6 color="text.primary">{firstName + " " + lastName}</H6>

          </FlexBox>
        </FlexBox>
      );
    },
  },
  {
    Header: "Role",
    accessor: "roleId",
    minWidth: 200,
    canFilter: false,
    Cell: ({ value }: any) => (


      <Small
        sx={{
          borderRadius: 10,
          padding: ".2rem 1rem",
          color: "background.paper",
          backgroundColor: value.toLowerCase() === "root" ? "success.main" : (value.toLowerCase() === "admin" ? "info.alternate" : "info.main"),
          textTransform: "capitalize"
        }}
      >
        {value}
      </Small>
    ),
  },
  {
    Header: "Email",
    accessor: "email",
    minWidth: 150,
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
        {value.toString() == "true" ? "Yes" : "No"}
      </Small>
    ),
  },
  {
    Header: "Edit",
    accessor: "action",
    Cell: ({ row }: any) => {
      const { userStore } = useStore();
      const { currentUser } = userStore;

      const [openModal, setOpenModal] = useState(false);
      const { id } = row.original;
      return (
        <>
          <EditIconButton disabled={(id == currentUser?.id) ? true : false} onClick={() => setOpenModal(true)} />
          {openModal && <EditUserModal
            open={openModal}
            data={row.original}
            onClose={() => setOpenModal(false)}
          />}
        </>
      );
    },
  },
];

export default UserColumnShape;
