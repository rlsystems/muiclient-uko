import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { Button, Chip, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';

import { useStore } from '../../../app/stores/store';


export default observer(function UserListTable() {
    const { appUserStore } = useStore();
    const { appUsersSorted } = appUserStore;

    console.log(appUsersSorted);
    console.log('ss')

    return (
        <>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                    Users
                </Typography>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>First</TableCell>
                            <TableCell>Last</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Active</TableCell>
                            <TableCell>GUID</TableCell>

                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {appUsersSorted.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.firstName}</TableCell>
                                <TableCell>{user.lastName}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.userName}</TableCell>
                                <TableCell>{user.isActive ?
                                    <Chip label="True" variant="outlined" color="success" sx={{width: '4rem'}} /> :
                                    <Chip label="False" variant="outlined" color="error"  sx={{width: '4rem'}}/>}
                                </TableCell>
                                <TableCell>{user.id}</TableCell>
                                <TableCell sx={{ display: 'flex', justifyContent: 'flex-end' }}>

                                    <Button component={Link} to={`/editUser/${user.id}`} variant="text" >
                                        Edit
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </Paper>



        </>

    )
})
