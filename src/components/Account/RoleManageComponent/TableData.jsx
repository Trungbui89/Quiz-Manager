import * as React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Button,
} from '@mui/material';
import Column from './Column';
import Rows from './Rows';
import AddIcon from '@mui/icons-material/Add';

export function TableData(props) {
    const { roleDetail, postAddPerToRole } = props;
    const createData = (name, create, read, update) => {
        return { name, create, read, update };
    };
    const rows = roleDetail?.map((per) =>
        createData(per.name, per.canCreate, per.canRead, per.canUpdate),
    );
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow className='table-title-permission'>
                        <Column />
                    </TableRow>
                </TableHead>
                <TableBody>
                    <Rows roleDetail={roleDetail} postAddPerToRole={postAddPerToRole}/>
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export function BoxRole(props) {
    const { roles, setRoleDetailId, roleDetailId, toggleAddRoleModal } = props;
    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 200 }} aria-label="custom pagination table">
                    <TableBody>
                        {roles?.map((role) => (
                            <TableRow key={role.id}>
                                <TableCell
                                    style={{cursor: 'pointer'}}
                                    onClick={() => setRoleDetailId(role.id)}
                                    className={
                                        roleDetailId === role?.id
                                            ? 'roleFocus'
                                            : ''
                                    }
                                >
                                    {role.name}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button onClick={toggleAddRoleModal} className='button-add-role'>
                <Typography sx={{fontFamily: 'Quicksand' }}>
                    <AddIcon/> Thêm vai trò mới
                </Typography>
            </Button>
        </>
    );
}


export function BoxPermission (props) {
    const {permissions} = props
    return(
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 200 }} aria-label="custom pagination table">
                <TableBody>
                    {permissions?.map((per) => (
                        <TableRow>
                            <TableCell>
                                {per.name}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}