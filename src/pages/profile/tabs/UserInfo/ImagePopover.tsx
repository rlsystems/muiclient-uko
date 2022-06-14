import { FC, Fragment, useRef, useState } from "react";
import {  Box, IconButton, styled } from "@mui/material";
import { Small} from "components/Typography";
import ProfileMenu from "navigation/profileMenu/ProfileMenu";
import { CameraAlt } from "@mui/icons-material";

const StyledSmall = styled(Small)(({ theme }) => ({
  display: "block",
  padding: "5px 1rem",
  cursor: "pointer",
  "&:hover": {
    color: theme.palette.primary.main,
    backgroundColor:
      theme.palette.mode === "light"
        ? theme.palette.secondary.light
        : theme.palette.divider,
  },
}));

interface ImagePopoverProps {
  handleImageUpdate: React.ChangeEventHandler<HTMLInputElement>,
  handleImageRemove: () => void
}

const ImagePopover: FC<ImagePopoverProps> = (props) => {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handlePopoverOpen = () => setOpen(true);
  const handlePopoverClose = () => setOpen(false);

  const handleImageUpdateClick: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
    props.handleImageUpdate(evt);
    handlePopoverClose();
  };
  const handleImageRemoveClick = () => {
    props.handleImageRemove();
    handlePopoverClose();
  };

  return (
    <Fragment>
      <IconButton size="small" onClick={handlePopoverOpen} ref={anchorRef}>
        <CameraAlt
          sx={{ fontSize: 16, color: "background.paper" }}
        />
      </IconButton>
      <ProfileMenu
        hiddenViewButton
        maxWidth={230}
        minWidth={200}
        popoverOpen={open}
        anchorRef={anchorRef}
        popoverClose={handlePopoverClose}
        noHeader
      >
        <Box pt={1}>
          <label htmlFor="icon-button-file">
            <input
              onChange={handleImageUpdateClick}
              name="imageFile"
              type="file"
              accept="image/*"
              id="icon-button-file"
              style={{ display: "none" }}
            />
            <StyledSmall
            >
              Upload Picture
            </StyledSmall>
          </label>
          <StyledSmall
            onClick={handleImageRemoveClick}
          >
            Remove Picture
          </StyledSmall>
        </Box>
      </ProfileMenu>
    </Fragment>
  );
};

export default ImagePopover;
