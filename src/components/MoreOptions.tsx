import React, { FC } from "react";
import { Menu, MenuItem } from "@mui/material";
import DeleteIcon from "icons/DeleteIcon";
import PencilIcon from "icons/PencilIcon";
import { Small } from "./Typography";

interface MoreOptionsProps {
  open?: boolean;
  anchorEl: HTMLElement | null;
  handleMoreClose: () => void;
  handleEdit: () => void;
  handleDelete: () => void;
}

const MoreOptions: FC<MoreOptionsProps> = ({ anchorEl, handleMoreClose, handleEdit, handleDelete }) => {
  const handleEditClick = () => {
    handleEdit()
    handleMoreClose()
  }

  const handleDeleteClick = () => {
    handleDelete()
    handleMoreClose()
  }

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleMoreClose}
      anchorOrigin={{horizontal: 'left', vertical: 'center'}}
      transformOrigin={{horizontal: 'left', vertical: 'center'}}
    >
      <MenuItem
        onClick={handleEditClick}
        sx={{ "&:hover": { color: "primary.main" } }}
      >
        <PencilIcon sx={{ fontSize: 14, marginRight: 1 }} />
        <Small fontWeight={500}>Edit</Small>
      </MenuItem>
      <MenuItem
        onClick={handleDeleteClick}
        sx={{ "&:hover": { color: "primary.main" } }}
      >
        <DeleteIcon sx={{ fontSize: 14, marginRight: 1 }} />
        <Small fontWeight={500}>Remove</Small>
      </MenuItem>
    </Menu>
  );
};

export default MoreOptions;
