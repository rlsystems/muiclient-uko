import { Backdrop, CircularProgress, Stack } from '@mui/material'
import React from 'react'

interface Props {
    content?: string;
}

export default function LoadingComponent({ content = 'Loading...' }: Props) {
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1  }}
            open={true}
        >
            <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            >
                <div>{content}</div>
                <CircularProgress color="primary" />
            </Stack>
        </Backdrop>
    )
}
