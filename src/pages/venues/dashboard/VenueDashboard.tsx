import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
//import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import Box from '@mui/material/Box';

import VenueListTable from './VenueListTable';
import { Button, Container } from '@mui/material';
import VenueHeader from './VenueHeader';

import { Link } from 'react-router-dom';




export default observer(function VenueDashboard() {


    const { venueStore } = useStore();
    const { loadVenues, venueRegistry } = venueStore;

    useEffect(() => {
        if (venueRegistry.size <= 1) loadVenues();
    }, [venueRegistry.size, loadVenues])



    return (
        <Box
        component="main"
        sx={{
            backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
        }}
    >
        <Container maxWidth={false} sx={{ mt: 4, mb: 4 }}>
            <VenueHeader />
            <VenueListTable />
        </Container>


    </Box>


    )
})