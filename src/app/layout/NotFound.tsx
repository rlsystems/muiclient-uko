import { Box, Button, Container, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'


export default function NotFound() {
    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',

                }}
            >
                <Typography component="h1" variant="h5" sx={{
                    marginBottom: '2rem'
                }}>
                    Not Found
                </Typography>

                <Button component={Link} to='/brands' variant='outlined'>
                    Return to brands page
                </Button>




            </Box>
        </Container>

    )
}