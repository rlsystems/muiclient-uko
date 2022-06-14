import {
  Box,
  Divider,
  List,
  ListItemButton,
  styled,
  Tooltip,
} from "@mui/material";
import ScrollBar from "simplebar-react";
import topMenuList from "./topMenuList";
import { useHistory, useLocation } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStore } from "../app/stores/store";
import { RoleID } from "app/models/user";
import { Fragment } from "react";

// custom styled components
const MainMenu = styled(Box)(({ theme }) => ({
  width: 80,
  height: "100%",
  position: "fixed",
  left: 0,
  boxShadow: theme.shadows[2],
  zIndex: theme.zIndex.drawer + 11,
  transition: "left 0.3s ease",
  backgroundColor: theme.palette.background.paper,
}));


const StyledListItemButton = styled(ListItemButton)(() => ({
  marginBottom: "1rem",
  justifyContent: "center",
  "&:hover": { backgroundColor: "transparent" },
}));

// root component
const DashboardSideBar = () => {
  const { pathname } = useLocation();
  const history = useHistory();
  const { userStore } = useStore();

  return (
    <MainMenu>
      <List sx={{ height: "100%" }}>
        <StyledListItemButton disableRipple>
          <img src="/logo/nanoLogo.png" alt="Nano Logo" width={31} />
        </StyledListItemButton>

        <ScrollBar style={{ maxHeight: "calc(100% - 50px)" }}>
          {topMenuList.filter(item => !item.roles || item.roles.includes(userStore.currentUser?.roleId as RoleID)).map((nav, index) => (
            <Fragment key={index}>
              {nav.topDivider && <Divider variant="middle" sx={{ marginBottom: "15px" }} />}

              <Tooltip title={nav.title} placement="right" >

                <StyledListItemButton
                  disableRipple
                  onClick={() => history.push(nav.path)}
                >

                  <nav.Icon
                    sx={{
                      color:
                        nav.path === pathname ? "primary.main" : "secondary.400",
                      //borderTop: "1px solid red"
                    }}
                  />
                </StyledListItemButton>
              </Tooltip>
            </Fragment>

          ))}
        </ScrollBar>
      </List>
    </MainMenu>
  );
};


export default observer(DashboardSideBar);
