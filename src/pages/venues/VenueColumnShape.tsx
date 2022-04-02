import { H6 } from "../../components/Typography";
import UkoAvatar from "../../components/UkoAvatar";
import EditIconButton from "../../components/EditIconButton";
import { useStore } from "app/stores/store";
import { RoleID } from "app/models/user";
import { Tooltip } from "@mui/material";

const VenueColumnShape = [
  {
    Header: "Name",
    accessor: "name",
    minWidth: 200,
    Cell: ({ row }: any) => {

      const { name } = row.original;
      return (
        <H6 color="text.primary"
          sx={{textTransform: "capitalize"}}
        >{name}</H6>
      );
    },
  },
  {
    Header: "Description",
    accessor: "description",
    minWidth: 200,
  },
  {
    Header: "Guid",
    accessor: "id",
    minWidth: 150,
  },
  {
    Header: "Edit",
    accessor: "action",
    Cell: ({ row }: any) => {
      const {userStore} = useStore();

      return userStore.currentUser?.roleId !== RoleID.basic ?
          <EditIconButton onClick={() => console.log('edit')} /> :
          <Tooltip title="Basic user cannot use this feature">
            <span>
              <EditIconButton disabled/>
            </span>
          </Tooltip>
    },
  },
];

export default VenueColumnShape;
