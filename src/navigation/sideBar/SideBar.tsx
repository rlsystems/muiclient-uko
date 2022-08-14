import {
  Box,
  Divider,
  List,
  ListItemButton,
  styled,
  Tooltip,
} from "@mui/material";
import ScrollBar from "simplebar-react";
import navList from "./navList";
import { useHistory, useLocation } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { Roles } from "app/models/roles";
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
const SideBar = () => {
  const { pathname } = useLocation();
  const history = useHistory();
  const { currentUserStore } = useStore();

  return (
    <MainMenu>
      <List sx={{ height: "100%" }}>
        <StyledListItemButton disableRipple>
          <img src="/logo/nanoLogo.png" alt="Nano Logo" width={31} />
        </StyledListItemButton>
        <ScrollBar style={{ maxHeight: "calc(100% - 50px)" }}>
          {navList.filter(item => !item.roles || item.roles.includes(currentUserStore.currentUser?.roleId as Roles)).map((nav, index) => (
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


export default observer(SideBar);
