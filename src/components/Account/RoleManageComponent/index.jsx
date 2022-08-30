/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Grid, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { BoxPermission, BoxRole, TableData } from './TableData'
import ClearIcon from '@mui/icons-material/Clear';
import './styles.scss'
import { styles } from './styles'
import InputSearchComponent from '../../../helper/InputSearchComponent';

//MODAL ADD ROLE
const AddNewRole = (props) => {
    const {postSaveRole, roles} = props;
    const [nameRole, setNameRole] = useState('');
    const handleClickSaveRole = () => {
        postSaveRole(nameRole);
        setNameRole('');
    };
    const [error, setError] = useState(false);

    const handleChangeRoleName = (key, value) => {
        switch (key) {
            case 'role_name':
                setNameRole(value)
                break;
            default:
                break;
        }
    }

    const handleValidate = (name) => {
        const hasExistRole = roles.findIndex(r => r.name === name);
        if(hasExistRole === -1) {
            setError(false)
        }
        else setError(true)
    }

    React.useEffect(() => {
        handleValidate(nameRole)
    }, [nameRole])
    return (
        <Modal
            centered
            show={props.showModalAddRole}
            style={{ fontFamily: 'Quicksand' }}
        >
            <Modal.Header>
                <b className="p-2">Thêm vai trò mới</b>
                <IconButton className="btn" onClick={props.toggleAddRoleModal}>
                    <ClearIcon />
                </IconButton>
            </Modal.Header>
            <Modal.Body>
                <Box>
                    <InputSearchComponent 
                        title='Tên vai trò' 
                        value={nameRole} 
                        handleChangeText={handleChangeRoleName} 
                        name='role_name'
                        error={error}
                        errMessage='Role đã tồn tại!'
                        inputProps={{
                            maxLength: 200
                        }}
                    />
                </Box>
                <Box style={{textAlign: 'right', padding:'25px 15px 15px 15px'}}>
                    <Button onClick={handleClickSaveRole} disabled={error === true ? true : false} className='button-save-update'>Thêm</Button>
                </Box>
            </Modal.Body>
        </Modal>
    );
};

const RoleManageView = (props) => {
    const {
        roleDetail,
        postAddPerToRole,
        deleteRolePer,
        postSaveRole,
        showModalAddRole,
        perId,
        toggleAddRoleModal,
        setPerId,
        permissions,
        roles,
        setRoleId,
        setRoleDetailId,
        roleDetailId,
    } = props;
    return (
        <div style={{ fontFamily: 'Quicksand' }}>
            <div className='card__list-test'>
                <div className='card__header'>
                    <h3>Đặt phân quyền</h3>
                </div>
            </div>
            <div className="pt-5">
                <Grid container>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={2}>
                        <Typography className='title-table-function'>Chọn vai trò</Typography>
                        <BoxRole 
                            roles={roles} 
                            setRoleDetailId={setRoleDetailId} 
                            roleDetailId={roleDetailId} 
                            toggleAddRoleModal={toggleAddRoleModal} 
                        />
                    </Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={6}>
                        <Typography className='title-table-function'>Tùy chỉnh các chức năng cho vai trò</Typography>
                        <TableData roleDetail={roleDetail} postAddPerToRole={postAddPerToRole} />
                    </Grid>
                    <Grid item xs={1}></Grid>
                </Grid>
            </div>
            <AddNewRole
                showModalAddRole={showModalAddRole}
                toggleAddRoleModal={toggleAddRoleModal}
                postSaveRole={postSaveRole}
                roles={roles}
            />
        </div>
    );
};

export default RoleManageView;
