import { Brightness4 } from "@mui/icons-material";
import {
  AppBar,
  Box,
  IconButton,
  styled,
  Theme,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import FlexBox from "../../../components/FlexBox";
import { H2 } from "../../../components/Typography";
//import { SettingsContext } from "contexts/SettingsContext";
//import { TitleContext } from "contexts/TitleContext";
// import LTR from "icons/LTR";
// import RtlIcon from "icons/RTL";
// import ThemeIcon from "icons/ThemeIcon";
import { FC, useContext } from "react";
// import { useTranslation } from "react-i18next";
// import { themeSettingsProps } from "theme";
// import { THEMES } from "../../constants";
// import ActivityPopover from "./popovers/ActivityPopover";
// import LanguagePopover from "./popovers/LanguagePopover";
// import NotificationsPopover from "./popovers/NotificationsPopover";
import ProfilePopover from "./ProfilePopover";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";
import ThemeIcon from "../../../icons/ThemeIcon";
// import ServicePopover from "./popovers/ServicePopover";

// root component interface
interface DashboardNavBarProps {

}

// custom styled components
const DashboardNavbarRoot = styled(AppBar)(() => ({
  zIndex: 11,
  boxShadow: "none",
  paddingTop: "1rem",
  paddingBottom: "1rem",
  backdropFilter: "blur(6px)",
  backgroundColor: "transparent",
}));

const StyledToolBar = styled(Toolbar)(() => ({
  "@media (min-width: 0px)": {
    paddingLeft: 0,
    paddingRight: 0,
    minHeight: "auto",
  },
}));

const StyledIconButton = styled(IconButton)(() => ({
  "&:hover": { backgroundColor: "transparent" },
}));

const ToggleIcon = styled(Box)(({ theme }) => ({
  width: 25,
  height: 3,
  margin: "5px",
  borderRadius: "10px",
  transition: "width 0.3s",
  backgroundColor: theme.palette.primary.main,
}));




// root component
const DashboardNavbar: FC<DashboardNavBarProps> = () => {
  const { commonStore } = useStore();

  let mode = 'dark';
  if (commonStore.darkMode === true) {
    mode = 'dark';

  } else {
    mode = 'light';
  }

  // const { t } = useTranslation();
  // const { title } = useContext(TitleContext);
  // const { settings, saveSettings } = useContext(SettingsContext);
  // const downMd = useMediaQuery((theme: Theme) => theme.breakpoints.down(1200));
  // const upSm = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
  // const downSm = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  // const handleChangeTheme = (theme: string) => {
  //   //saveSettings({ ...settings, theme } as themeSettingsProps);
  // };






  return (
    <DashboardNavbarRoot position="sticky">
      <StyledToolBar>
       

        <H2
          fontSize={21}
          lineHeight={0}
          mx={1}
          fontWeight="700"
          color="text.primary"
        >
          User Management
        </H2>

        <Box flexGrow={1} ml={1} />


        {mode === "light" ? (
          <StyledIconButton
            disableRipple
            onClick={() => commonStore.setDarkMode()}
          >
            <ThemeIcon />
          </StyledIconButton>
        ) : (
          <StyledIconButton
            disableRipple
            onClick={() => commonStore.setDarkMode()}
          >
            <Brightness4 />
          </StyledIconButton>
        )}


        <ProfilePopover />
      </StyledToolBar>
    </DashboardNavbarRoot>
  );
};

export default observer(DashboardNavbar);
