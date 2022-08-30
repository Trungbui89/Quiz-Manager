import React from 'react';
import UserInformation from './UserInformation';
import { Link } from 'react-router-dom';
import { IconButton, Typography } from '@mui/material';
import UserRole from './UserRole';
import './styles.scss';

function StaffInfoView(props) {
    const {
        staff,
        roles,
        roleInUser,
        postAddRoleToUser,
        deleteUserRole,
        perInUser,
        postAddPerToUser,
        setPerId,
        deleteUserPer,
        showModalPass,
        toggleModalPassChange,
        postNewPass,
    } = props;
    return (
        <div className='container-fluid'>
            <div>
                <div className="card__header">
                    <Link to="/admin/staff-list" style={styles.backBtn}>
                        <IconButton sx={{ marginLeft:'-15px' }}>
                            <img src="/icon/Back.svg" alt="back" />
                        </IconButton>
                    </Link>
                    <h3 className="">Quản lý nhân viên</h3>
                </div>
            </div>
            <UserInformation 
                staffInfo={staff}
                toggleModalPassChange={toggleModalPassChange}
                roles={roles}
                roleInUser={roleInUser}
                postAddRoleToUser={postAddRoleToUser}
                deleteUserRole={deleteUserRole}
                perInUser={perInUser}
                postAddPerToUser={postAddPerToUser}
            />
            <UserRole
                roles={roles}
                
            />
        </div>
    )
}

export default StaffInfoView;

const styles = {
    backBtn: {
        display: 'flex', 
        justifyContent: 'flex-start', 
        alignItems: 'center', 
        cursor: 'pointer', 
        padding: '15px 0px 10px', 
        width: 'fit-content'
    }
}