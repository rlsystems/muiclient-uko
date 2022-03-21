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
import FlexBox from "../../../components/FlexBox";
import { H3, Small } from "../../../components/Typography";
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
  [theme.breakpoints.down("md")]: { left: -80 },
  "& .simplebar-track.simplebar-vertical": { width: 7 },
  "& .simplebar-scrollbar:before": {
    background: theme.palette.text.primary,
  },
}));


const StyledListItemButton = styled(ListItemButton)(() => ({
  marginBottom: "1rem",
  justifyContent: "center",
  "&:hover": { backgroundColor: "transparent" },
}));



// root component
const DashboardSideBar: FC<SideNavBarProps> = ({

}) => {
  //const navigate = useNavigate();

  const [active, setActive] = useState("Dashboard");
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
        {topMenuList.map((nav, index) => (
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


export default DashboardSideBar;
