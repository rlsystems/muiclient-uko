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
import { H2 } from "../../components/Typography";
import { FC } from "react";
import ProfileButton from "./profileButton/ProfileButton";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import ThemeIcon from "../../icons/ThemeIcon";


// custom styled components
const StyledNavbar = styled(AppBar)(() => ({
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


// main component
const Navbar: FC = () => {
  const { commonStore } = useStore();

  let mode = 'dark';
  if (commonStore.darkMode === true) {
    mode = 'dark';

  } else {
    mode = 'light';
  }


  return (
    <StyledNavbar position="sticky">
      <StyledToolBar>
        <H2
          fontSize={21}
          lineHeight={0}
          mx={1}
          fontWeight="700"
          color="text.primary"
        >
          {commonStore.title}
        </H2>
        <Box flexGrow={1} ml={1} />

        {mode === "light" ? (
          <StyledIconButton
            disableRipple
            onClick={() => commonStore.setDarkTheme(true)}
          >
            <ThemeIcon />
          </StyledIconButton>
        ) : (
          <StyledIconButton
            disableRipple
            onClick={() => commonStore.setDarkTheme(false)}
          >
            <Brightness4 />
          </StyledIconButton>
        )}

        <ProfileButton />
      </StyledToolBar>
    </StyledNavbar>
  );
};

export default observer(Navbar);
