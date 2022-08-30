/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { apiAcc } from '../../../api/apiConnect';
import { toastFail, toastSuccess } from '../../../helper/Notification/utils';
import { Box, Grid} from '@mui/material';
import InputFlexComponent from '../../../helper/InputFlexComponent';
import { getAllRole } from '../../../api/actions';
import { convertDataOptions, dataStatusStaffIcon } from '../../../constants/shared';
import SelectFieldFlex from '../../../helper/SelectFieldFlex';
import SearchButton from '../../../helper/GroupButton/SearchButton';
import DatePickerFlexComponent from '../../../helper/DatePickerFlexComponent';
import { Modal } from 'antd';


function DialogAddStaff(props) {
    const { show, toggleAddStaffModal, getAllStaffs } = props;
    const token = localStorage.getItem('token');
    const [roleList, setRoleList] = useState([]);
    const [formAddStaff, setFormAddStaff] = useState({
        fullName: '',
        birthDay: '',
        email: '',
        address: '',
        userType: 'candidate',
        username: '',
        password: '',
        role: 2,
        phone:'',
        company: localStorage.getItem('company'),
        active: true,
    });
    const [disableCreate, setDisableCreate] = React.useState(false);

    const getRoleList = () => {
        getAllRole().then(res => setRoleList(res.data))
    };
    const dataOptionsRole = Array.isArray(roleList) && roleList.length > 0 ? convertDataOptions(roleList) :[];

    useEffect(() =>{
        if(!formAddStaff.username || !formAddStaff.password || !formAddStaff.email) {
            setDisableCreate(true)
        } else {
            setDisableCreate(false)
        }
    },[formAddStaff])

    // POST ADD STAFF
    const postAddStaff = (staff) => {
        apiAcc
            .post('/accounts', staff, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                toastSuccess('Thêm nhân viên thành công');
                getAllStaffs();
                toggleAddStaffModal();
                setFormAddStaff({
                    fullName: '',
                    birthDay: '',
                    email: '',
                    address: '',
                    userType: 'candidate',
                    username: '',
                    password: '',
                    role: 2,
                    phone:'',
                    company: {
                        id: localStorage.getItem('company'),
                    },
                    active: true,
                });
            })
            .catch((err) => {
                toastFail('Thất bại, vui lòng kiểm tra lại');
            });
    };

    const handleChangeStaff = (key, value) => {
        switch (key) {
            case 'full_name':
                setFormAddStaff({ ...formAddStaff, fullName: value });
                break;
            case 'birthday':
                setFormAddStaff({ ...formAddStaff, birthDay: value });
                break;
            case 'email':
                setFormAddStaff({ ...formAddStaff, email: value });
                break;
            case 'username':
                setFormAddStaff({ ...formAddStaff, username: value });
                break;
            case 'password':
                setFormAddStaff({ ...formAddStaff, password: value });
                break;
            case 'phone':
                setFormAddStaff({ ...formAddStaff, phone: value });
                break;
            case 'address':
                setFormAddStaff({ ...formAddStaff, address: value });
                break;
            case 'role':
                setFormAddStaff({ ...formAddStaff, role: value.value });
                break;
            case 'user_type':
                setFormAddStaff({ ...formAddStaff, userType: value.value });
                break;
            default:
                break;
        }
    };

    const handleAddStaff = () => {
        postAddStaff(formAddStaff);
    };

    //Effect
    React.useEffect(() => {
        getRoleList()
    },[token])

    return (
        <Modal
            title="Tạo tài khoản mới"
            centered
            visible={show}
            onCancel={toggleAddStaffModal}
            width='70%'
            footer={null}
        >
                <div className="form_add">
                    <Grid container spacing={2}>
                        <Grid item xs={5} style={{padding: 20}}>
                            <InputFlexComponent
                                type='email'
                                title="Email"
                                name="email"
                                handleChangeText={handleChangeStaff}
                                value={formAddStaff.email ?? ''}
                                required
                            />
                            <InputFlexComponent
                                type='text'
                                title="Tên đăng nhập"
                                name="username"
                                handleChangeText={handleChangeStaff}
                                value={formAddStaff.username ?? ''}
                                required
                                maxLength={30}
                            />
                            <InputFlexComponent
                                type='password'
                                title="Mật khẩu"
                                name="password"
                                handleChangeText={handleChangeStaff}
                                value={formAddStaff.password ?? ''}
                                maxLength={30}
                                required
                            />
                            <InputFlexComponent
                                title="Họ và tên"
                                name="full_name"
                                handleChangeText={handleChangeStaff}
                                value={formAddStaff.fullName ?? ''}
                            />
                            {/* <InputFlexComponent
                                type='date'
                                title="Ngày sinh"
                                name="birthday"
                                handleChangeText={handleChangeStaff}
                                value={formAddStaff.birthDay ?? ''}
                            /> */}
                            <DatePickerFlexComponent 
                                format='DD/MM/YYYY' 
                                placeholder="Chọn / nhập ngày" 
                                title='Ngày sinh'
                                onChange={handleChangeStaff}
                                value={formAddStaff.birthDay ?? ''}
                                name="birthday"
                                
                            />
                        </Grid>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={5} style={{padding: 20}}>
                            <InputFlexComponent
                                type='number'
                                title="Số điện thoại"
                                name="phone"
                                handleChangeText={handleChangeStaff}
                                value={formAddStaff.phone ?? ''}
                                inputProps={{maxLength:10}}
                            />
                            <InputFlexComponent
                                type='text'
                                title="Địa chỉ"
                                name="address"
                                handleChangeText={handleChangeStaff}
                                value={formAddStaff.address ?? ''}
                            />
                            <SelectFieldFlex
                                title="Vai trò"
                                data={dataOptionsRole}
                                handleOnChange={handleChangeStaff}
                                defaultValue={formAddStaff.role || ''}
                                name='role'
                            />
                            <SelectFieldFlex
                                title="Trạng thái"
                                data={dataStatusStaffIcon}
                                handleOnChange={handleChangeStaff}
                                defaultValue={formAddStaff.userType || ''}
                                name='user_type'
                            />
                        </Grid>
                        <Grid item xs={1}></Grid>
                    </Grid>
                    <Box sx={{textAlign:'right', width:'92%'}}>
                        <SearchButton disabled={disableCreate} title="Tạo mới" onClick={handleAddStaff} />
                    </Box>
                </div>
        {/* </BootstrapDialog> */}</Modal>
    );
}

export default DialogAddStaff;
