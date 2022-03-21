
import React from 'react';
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";






export default function UserHeader() {



    return (
        <Box sx={{ mb: 5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h4" gutterBottom>
                    Users
                </Typography>
            </Box>

            <Box sx={{ flexShrink: 0 }}>
                <Button component={Link} to="/createUser" variant="contained">New User</Button>
            </Box>
        </Box>

        
    </Box>

   
    )
}