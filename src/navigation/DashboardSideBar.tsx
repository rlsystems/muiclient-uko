import {
  Box,
  List,
  ListItem,
  ListItemButton,
  styled,
  Theme,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
//import UIAccordion from "components/accordion/UIAccordion";
import FlexBox from "../components/FlexBox";
import { H3, Small } from "../components/Typography";
import {
  Dispatch,
  FC,
  Fragment,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
//import { useNavigate } from "react-router-dom";
import ScrollBar from "simplebar-react";
import topMenuList from "./topMenuList";
import { useHistory } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStore } from "../app/stores/store";
import { RoleID } from "app/models/user";

// root component interface
interface SideNavBarProps {

}

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
const DashboardSideBar: FC<SideNavBarProps> = () => {
  //const navigate = useNavigate();
  const { userStore } = useStore();
  const [active, setActive] = useState("Venues");
  const history = useHistory();

  const handleActiveMainMenu = (menuItem: any) => () => {
    setActive(menuItem.title);
    history.push(menuItem.path)
  };

  // main menus content
  const mainSideBarContent = (
    <List sx={{ height: "100%" }}>
      <StyledListItemButton disableRipple>
        <img src="/logo/logo.svg" alt="UKO Logo" width={31} />
      </StyledListItemButton>

      <ScrollBar style={{ maxHeight: "calc(100% - 50px)" }}>
        {topMenuList.filter(item => !item.roles || item.roles.includes(userStore.currentUser?.roleId as RoleID)).map((nav, index) => (
          <Tooltip title={nav.title} placement="right" key={index}>
            <StyledListItemButton
              disableRipple
              onClick={handleActiveMainMenu(nav)}
            >
              <nav.Icon
                sx={{
                  color:
                    active === nav.title ? "primary.main" : "secondary.400",
                }}
              />
            </StyledListItemButton>
          </Tooltip>
        ))}
      </ScrollBar>
    </List>
  );



  return (
      <MainMenu>{mainSideBarContent}</MainMenu>
  );
};


export default observer(DashboardSideBar);
