import {
    Box,
    Grid,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useState } from 'react';
import CardHeader from './CardHeader';
import Paper from '@mui/material/Paper';
import Column from './Column';
import Rows from './Rows';

export default function UserRole(props) {
    const {
        staffInfo,
        roles,
    } = props;
    const [userInfor, setUserInfor] = useState({});
    useEffect(() => {
        if (staffInfo) {
            setUserInfor(staffInfo);
        }
    }, [staffInfo]);

    const rows = roles?.map((role) => ({ id: role?.id, name: role?.name }));

    

    return (
        <>
            <Box sx={{ paddingTop: '40px', marginBottom: '90px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={5}>
                        
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}
