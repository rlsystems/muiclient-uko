import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';
import { Button, Chip, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';


export default observer(function TenantListTable() {
    const { tenantStore } = useStore();
    const { tenantsSorted } = tenantStore;



    return (
        <>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Tenants
            </Typography>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Key</TableCell>
                        <TableCell>Admin Email</TableCell>
                        <TableCell>Connection String</TableCell>
                        <TableCell>Active</TableCell>
                        <TableCell>Validity</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {tenantsSorted.map((tenant) => (
                        <TableRow key={tenant.id}>
                            <TableCell>{tenant.key}</TableCell>

                            <TableCell>{tenant.isActive ?
                                <Chip label="True" variant="outlined" color="success" sx={{width: '4rem'}} /> :
                                <Chip label="False" variant="outlined" color="error"  sx={{width: '4rem'}}/>}
                            </TableCell>
                            
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </Paper>



    </>

    )
})
