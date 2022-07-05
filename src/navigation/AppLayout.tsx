import { Box, styled } from '@mui/material';
import React from 'react'
import Navbar from './navBar/Navbar';
import SideBar from './sideBar/SideBar';

interface Props {
  children: React.ReactNode
}

const ContentWrapper = styled(Box)(({theme}) => ({
    width: `calc(100% - 80px)`,
    paddingLeft: "3rem",
    paddingRight: "3rem",
    transition: "all 0.3s",
    marginLeft: 80,
    [theme.breakpoints.down("md")]: {
      paddingLeft: "1rem",
      paddingRight: "1rem",
    },
  }));

const AppLayout = (props: Props) => {
  return (
    <React.Fragment>
      <SideBar />
      <ContentWrapper>
        <Navbar />
        {props.children}
      </ContentWrapper>
    </React.Fragment>
  )
}

export default AppLayout