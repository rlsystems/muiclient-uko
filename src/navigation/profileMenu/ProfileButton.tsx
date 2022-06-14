import { Badge, Box, ButtonBase, Divider, styled } from "@mui/material";
import FlexBox from "../../components/FlexBox";
import { H6, Small, Tiny } from "../../components/Typography";
import NanoAvatar from "../../components/NanoAvatar";
import { FC, Fragment, useRef, useState } from "react";
import ProfileMenu from "./ProfileMenu";
import { useStore } from "../../app/stores/store";
import { useHistory } from "react-router-dom";
import { observer } from "mobx-react-lite";
// styled components
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


const ProfilePopover: FC = () => {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const { userStore: { currentUser, logout } } = useStore();
  const history = useHistory();
  const handleMenuItem = (path: string) => {
    history.push(path);
    setOpen(false);
  };

  return (
    <Fragment>
      <ButtonBase disableRipple ref={anchorRef} onClick={() => setOpen(true)}>
        <Badge
          overlap="circular"
          variant="dot"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          sx={{
            "& .MuiBadge-badge": {
              width: 11,
              height: 11,
              right: "7%",
              borderRadius: "50%",
              border: "2px solid #fff",
              backgroundColor: "success.main",
            },
          }}
        >
          <NanoAvatar
            src={currentUser?.imageUrl || "/static/001-man.svg"}
            sx={{ width: 30, height: 30, ml: 1 }}
          />
        </Badge>
      </ButtonBase>

      <ProfileMenu
        hiddenViewButton
        maxWidth={230}
        minWidth={200}
        popoverOpen={open}
        anchorRef={anchorRef}
        popoverClose={() => setOpen(false)}
        title={
          <FlexBox alignItems="center">
            <NanoAvatar
              src={currentUser?.imageUrl || "/static/001-man.svg"}
              sx={{ width: 35, height: 35 }}
            />

            <Box ml={1}>
              <H6>{currentUser?.firstName}</H6>
              <Tiny display="block" fontWeight={500} color="text.disabled">
                {currentUser?.email}
              </Tiny>
            </Box>
          </FlexBox>
        }
      >
        <Box pt={1}>


          <StyledSmall
            onClick={() => handleMenuItem("/profile?tab=user-info")}
          >
            Profile
          </StyledSmall>
          <StyledSmall
            onClick={() => handleMenuItem("/profile?tab=preferences")}
          >
            Preferences
          </StyledSmall>
          <StyledSmall
            onClick={() => handleMenuItem("/profile?tab=change-password")}
          >
            Change Password
          </StyledSmall>


          <Divider sx={{ my: 1 }} />

          <StyledSmall
            onClick={() => {
              logout();
              //toast.error("You Logout Successfully");
            }}
          >
            Sign Out
          </StyledSmall>
        </Box>
      </ProfileMenu>
    </Fragment>
  );
};

export default observer(ProfilePopover);
