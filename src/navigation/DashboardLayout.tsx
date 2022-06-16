import { Box, styled } from '@mui/material';
import React from 'react'
import DashboardNavbar from './DashboardNavbar';
import DashboardSideBar from './DashboardSideBar';

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

const DashboardLayout = (props: Props) => {
  return (
    <React.Fragment>
      <DashboardSideBar />
      <ContentWrapper>
        <DashboardNavbar />
        {props.children}
      </ContentWrapper>
    </React.Fragment>
  )
}

export default DashboardLayout