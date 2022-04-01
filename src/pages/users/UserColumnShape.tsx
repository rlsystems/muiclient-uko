import { useState } from "react";
import FlexBox from "../../components/FlexBox";
import { H6, Small, Tiny } from "../../components/Typography";
import UkoAvatar from "../../components/UkoAvatar";
import EditIconButton from "../../components/EditIconButton";
import EditUserModal from "./EditUserModal";
import CheckBoxIcon from "../../icons/CheckBoxIcon";
import CheckDoneIcon from "../../icons/CheckDoneIcon";
import { useStore } from "../../app/stores/store";



const UserColumnShape = [
  {
    Header: "Name",
    accessor: "name",
    minWidth: 200,
    Cell: ({ row }: any) => {
      
      const { avatar, firstName, lastName } = row.original;
      return (
        <FlexBox alignItems="center">
          <UkoAvatar src={avatar} />
          <FlexBox flexDirection="column" ml={1}>
            <H6 color="text.primary">{firstName + " " + lastName}</H6>
            <Tiny color="text.disabled">Lima, PE</Tiny>
          </FlexBox>
        </FlexBox>
      );
    },
  },
  {
    Header: "Role",
    accessor: "roleId",
    minWidth: 200,
    Cell: ({ value }: any) => (


      <Small
        sx={{
          borderRadius: 10,
          padding: ".2rem 1rem",
          color: "background.paper",
          backgroundColor: value.toLowerCase() === "root" ? "success.main" : "info.main",
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
    Cell: ({ value }: any) => (
      <Small
        sx={{
          color: value.toString().toLowerCase() === "true" ? "success.main" : "error.main",
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
