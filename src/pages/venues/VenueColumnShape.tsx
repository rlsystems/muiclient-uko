import React, { useState } from "react";
import { H6 } from "components/Typography";
import { useStore } from "app/stores/store";
import { RoleID } from "app/models/user";
import { IconButton, Tooltip } from "@mui/material";
import MoreOptions from "components/MoreOptions";
import { StyledDisabledBox } from "components/common";
import { MoreVert } from "@mui/icons-material";
import EditVenueModal from './EditVenueModal'

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
    Header: "Actions",
    accessor: "_",
    minWidth: 80,
    Cell: ({ row }: any) => {
      const { userStore, venueStore} = useStore();
      const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
      const [openModal, setOpenModal] = useState(false);

      const handleMenuOpen = (evt: React.MouseEvent<HTMLElement | HTMLSpanElement>) => {
        setAnchorEl(evt.currentTarget);
      }

      const handleMenuClose = () => {
        setAnchorEl(null);
      }

      const handleEdit = () => {
        setOpenModal(true);
      }
      const handleDelete = () => {
        venueStore.deleteVenue(row.original.id);
      }

      return <React.Fragment>
        {userStore.currentUser?.roleId !== RoleID.basic
          ? <IconButton onClick={handleMenuOpen}>
            <MoreVert  />
          </IconButton>
          : <Tooltip title="Basic user cannot use this feature">
            <StyledDisabledBox>
              <MoreVert color="disabled" />
            </StyledDisabledBox>
          </Tooltip>}
          <MoreOptions
            anchorEl={anchorEl}
            handleMoreClose={handleMenuClose}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
          <EditVenueModal
            open={openModal}
            onClose={() => setOpenModal(false)}
            data={row.original}
          />
        </React.Fragment>
    },
  },
];

export default VenueColumnShape;
