import React, { useState } from "react";
import { H6 } from "components/Typography";
import { useStore } from "app/stores/store";
import { RoleID } from "app/models/user";
import { IconButton, Tooltip } from "@mui/material";
import MoreOptions from "components/MoreOptions";
import { StyledDisabledBox } from "components/common";
import { MoreVert } from "@mui/icons-material";
import VenueModal from './VenueModal'
import { Venue } from "app/models/venue";
import { ColumnShape } from "components/DataTables/ServerTable/ServerTable";

const VenueColumnShape: ColumnShape<Venue>[] = [
  {
    header: "Name",
    accessor: "name",
    minWidth: 200,
    renderRow: (row: Venue) => {
      return (
        <H6 color="text.primary"
          sx={{textTransform: "capitalize"}}
        >
          {row.name}
        </H6>
      );
    },
  },
  {
    header: "Description",
    accessor: "description",
    minWidth: 200,
  },
  {
    header: "Guid",
    accessor: "id",
    minWidth: 250,
  },
  {
    header: "Actions",
    accessor: null,
    minWidth: 80,
    renderRow: (row: Venue) => {
      const { currentUserStore, venueStore} = useStore();
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
        venueStore.deleteVenue(row.id);
      }

      return <React.Fragment>
        {currentUserStore.currentUser?.roleId !== RoleID.basic
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
          <VenueModal
            open={openModal}
            isEdit={true}
            onClose={() => setOpenModal(false)}
            data={row}
          />
        </React.Fragment>
    },
  },
];

export default VenueColumnShape;
