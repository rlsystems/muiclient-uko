import { Instagram, NotificationsNone } from "@mui/icons-material";
import { Box, Button, Card, Grid, styled, useTheme } from "@mui/material";


import { FC, useEffect, useState } from "react";
import { H3, H6, Tiny } from "../../components/Typography";
import convertToSlug from "../../app/utils/convertSlug";
import FlexBox from "../../components/FlexBox";

import PasswordIcon from "../../icons/PasswordIcon";
import ProfileIcon from "../../icons/ProfileIcon";
import SettingIcon from "../../icons/SettingIcon";

import UserInfo from "./tabs/UserInfo/UserInfo";
import Preferences from "./tabs/Preferences";
import Password from "./tabs/Password";

import { useStore } from "../../app/stores/store";


// styled component
const StyledButton = styled(Button)(() => ({
  fontSize: 12,
  borderRadius: 0,
  marginTop: "0.4rem",
  position: "relative",
  justifyContent: "flex-start",
}));

const AccountSettings: FC = () => {
  const { commonStore } = useStore();

  // Below solves the console warning for DashboardNavbar
  // Should fix that warning, let me know if it pops up again
  useEffect(() => {
    commonStore.setTitle("Account Settings");
  }, [])

  const theme = useTheme();
  const [active, setActive] = useState("user-info");

  const style = {
    backgroundColor:
      theme.palette.mode === "light"
        ? theme.palette.secondary.light
        : theme.palette.divider,
    color: theme.palette.primary.main,
    "&::before": {
      width: 4,
      right: 0,
      content: '""',
      height: "100%",
      position: "absolute",
      backgroundColor: theme.palette.primary.main,
    },
  };

  return (
    <Box pt={2} pb={4}>
      <Grid container spacing={3}>
        <Grid item lg={2} xs={3}>
          <Card sx={{ padding: "1.5rem 0" }}>
            <H3 mb="0.5rem" pl="1.5rem">
              User Profile
            </H3>

            {/* Side Menu */}
            <FlexBox
              flexDirection="column"
            >

              {tabList.map(({ id, name, Icon }) => (
                <StyledButton
                  key={id}
                  startIcon={<Icon sx={{ color: "text.disabled" }} />}
                  onClick={() => setActive(convertToSlug(name))}
                  sx={
                    active === convertToSlug(name)
                      ? style
                      : { "&:hover": style }
                  }
                >
                  {name}
                </StyledButton>
              ))}
            </FlexBox>
          </Card>
        </Grid>

        {/* Tab Content */}
        <Grid item lg={7} xs={9}>
          {active === convertToSlug(tabList[0].name) && <UserInfo />}
          {active === convertToSlug(tabList[1].name) && <Password />}

        </Grid>
      </Grid>
    </Box>
  );
};

const tabList = [
  {
    id: 1,
    name: "User Info",
    Icon: ProfileIcon,
  },
  {
    id: 2,
    name: "Password",
    Icon: PasswordIcon,
  }
];




export default AccountSettings;
