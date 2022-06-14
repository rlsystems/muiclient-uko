import { Box, styled } from '@mui/material';
import React from 'react'
import DashboardNavbar from './DashboardNavbar';
import DashboardSideBar from './DashboardSideBar';

interface Props {
  children: React.ReactNode
}

const Wrapper = styled(Box)(() => ({
    width: `calc(100% - 80px)`,
    paddingLeft: "3rem",
    paddingRight: "3rem",
    transition: "all 0.3s",
    marginLeft: 80,
  }));

const DashboardLayout = (props: Props) => {
  return (
    <React.Fragment>
      <DashboardSideBar />
      <Wrapper>
        <DashboardNavbar />
        {props.children}
      </Wrapper>
    </React.Fragment>
  )
}

export default DashboardLayout