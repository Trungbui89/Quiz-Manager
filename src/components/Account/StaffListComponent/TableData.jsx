import React from 'react';
import { useHistory } from 'react-router-dom';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import { checkStatusStaff } from '../../../constants/shared';

function TableData(props) {
    const { 
        staffs,
        pagination
     } = props;
    const history = useHistory()
    const pushHistory = (value) => {
        history.push(`/admin/staff-list/${value}`)
    }
    const renderMultiRoles = (roles) => {
        if(Array.isArray(roles) && roles.length > 0) {
            if(roles.length > 1) {
                const roleName = roles.filter((i, index) => index !== roles.length -1).map(i => `${i.name},`);
                const roleLast = `${roles[roles.length - 1].name}`;
                return `${roleName} ${roleLast}`
            } else return `${roles[0].name}`
        } else {
            return ''
        }
    }
    const RowStaff = () => {
        return (
            <>
                {Array.isArray(staffs) && staffs.length > 0 && staffs?.map((item, index) => (
                        <TableRow key={index} style={{ position: 'relative' }}>
                            <TableCell align='center' component="th" scope="row">{(Number(pagination.page) - 1)*(pagination.limit) + index + 1}</TableCell>
                            <TableCell align="left">{item.fullName}</TableCell>
                            <TableCell align="left">{item.phone}</TableCell>
                            <TableCell align="left">{item.email}</TableCell>
                            <TableCell align="left">{item.address}</TableCell>
                            <TableCell align="center">{renderMultiRoles(item.roles)}</TableCell>
                            <TableCell align="left">{checkStatusStaff(item.userType)}</TableCell>
                            <TableCell className="text-dark" onClick={() => pushHistory(item.id)} style={styles.staffLinks}></TableCell>
                        </TableRow>
                    ))}
            </>
        )
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ width: '100%' }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">STT</TableCell>
                        <TableCell align="left">Họ và tên</TableCell>
                        <TableCell align="left">Số điện thoại</TableCell>
                        <TableCell align="left">Email</TableCell>
                        <TableCell align="left">Địa chỉ</TableCell>
                        <TableCell align="center">Vai trò</TableCell>
                        <TableCell align="center">Trạng thái</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <RowStaff />
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TableData;

const styles = {
    staffLinks: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        cursor: 'pointer',
        zIndex: 100,
        top: 0,
        left: 0,
    }
}