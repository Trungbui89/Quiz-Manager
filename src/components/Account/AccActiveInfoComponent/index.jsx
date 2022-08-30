/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { apiAcc } from '../../../api/apiConnect';
import Box from '@mui/material/Box';
import TextFieldInfor from '../../../helper/TextFieldInfor';
import { toastFail, toastSuccess } from '../../../helper/Notification/utils';
import { getAccountById, postUpdateStaff } from '../../../api/actions';
import DialogChangePass from './DialogChangePass';
import { Button, Grid } from '@mui/material';
import { checkStatusStaff, convertDateToLocal, dataStatusStaffIcon } from '../../../constants/shared';
import InputFlexComponent from '../../../helper/InputFlexComponent';
import SelectFieldFlex from '../../../helper/SelectFieldFlex';
// import from ''

export default function AccActiveInfo() {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id');
    const [isEdit, setIsEdit] = useState(true)
    const [info, setInfo] = useState({
        id: '',
        fullName: '',
        birthDay: '',
        username: '',
        email: '',
        phone:'',
        address: '',
        userType: '',
    });
    const [hasErr, setHasErr] = useState(false)
    const [password, setPassword] = useState({
        username: localStorage.getItem('username'),
        oldPass: '',
        newPass: '',
        reNewPass: '',
    });
    const [errorPassword, setErrorPassword] = useState(false)
    const [errMessage, setErrMessage] = useState('')


    //Modal Notifications

    const [show, setShow] = useState(false);
    const toggleModalChangePass = () => {
        setShow(!show);
    };

    const getAccount = () => {
        getAccountById(id)
            .then((res) => {
                setInfo(res.data);
            })
            .catch((err) => {
                toastFail('Lấy thông tin thất bại');
            });
    };
    useEffect(() => {
        getAccount();
    }, []);
    // POST CHANGE PASS
    
    const handleChangePassword = (key, value) => {
        switch (key) {
            case 'oldPass':
                setPassword({...password, oldPass: value});
                break;
            case 'newPass':
                setPassword({...password, newPass: value});
                break;
            case 'reNewPass':
                setPassword({...password, reNewPass: value});
                break;
            default:
                break;
        }
    }

    const handleValidatePassword = () => {
        const passwordInputValue = password.newPass
        const uppercaseRegExp   = /(?=.*?[A-Z])/;
        const lowercaseRegExp   = /(?=.*?[a-z])/;
        const digitsRegExp      = /(?=.*?[0-9])/;
        const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
        const minLengthRegExp   = /.{8,}/;
        const passwordLength =      passwordInputValue.length;
        const uppercasePassword =   uppercaseRegExp.test(passwordInputValue);
        const lowercasePassword =   lowercaseRegExp.test(passwordInputValue);
        const digitsPassword =      digitsRegExp.test(passwordInputValue);
        const specialCharPassword = specialCharRegExp.test(passwordInputValue);
        const minLengthPassword =   minLengthRegExp.test(passwordInputValue);
        let errMsg ="";
        if(passwordLength===0){
                errMsg="Không được để trống";
                setErrorPassword(true)
        }else if(!uppercasePassword){
                errMsg="Phải chứa ít nhất một kí tự in hoa";
                setErrorPassword(true)
        }else if(!lowercasePassword){
                errMsg="Phải chứa ít nhất một kí tự in thường";
                setErrorPassword(true)
        }else if(!digitsPassword){
                errMsg="Phải chứa ít nhất một số";
                setErrorPassword(true)
        }else if(!specialCharPassword){
                errMsg="Phải chứa ít nhất một kí tự đặc biệt";
                setErrorPassword(true)
        }else if(!minLengthPassword){
                errMsg="Tối thiểu gồm 8 kí tự";
                setErrorPassword(true)
        }else{
            errMsg="";
            setErrorPassword(false)
        }
        setErrMessage(errMsg)
    }

    useEffect(() => {
        handleValidatePassword()
    },[password])

    const postChangePass = () => {
        apiAcc
            .put('/accounts/changepass', password, {
                headers: {
                    authorization: 'Bearer ' + token,
                },
            })
            .then((res) => {
                toastSuccess('Đổi mật khẩu thành công');
                signOut();
            })
            .catch((err) => {
                toastFail('Thất bại, vui lòng thử lại');
            });
    };

    const handleChangeUpdateStaff = (key, value) => {
        switch (key) {
            case 'full_name':
                setInfo({ ...info, fullName: value });
                break;
            case 'birthday':
                setInfo({ ...info, birthDay: value });
                break;
            case 'email':
                setInfo({ ...info, email: value });
                break;
            // case 'username':
            //     setUserInfor({ ...userInfor, username: value });
            //     break;
            // case 'password':
            //     setUserInfor({ ...userInfor, password: value });
            //     break;
            case 'phone':
                setInfo({ ...info, phone: value });
                break;
            case 'address':
                setInfo({ ...info, address: value });
                break;
            // case 'role':
            //     setUserInfor({ ...info, role: value.value });
            //     break;
            case 'user_type':
                setInfo({ ...info, userType: value.value });
                break;
            default:
                break;
        }
    };

    const renderDefaultValue = () => {
        if(info){
            setInfo({
                id: info.id,
                fullName: info.fullName,
                birthDay: info.birthDay,
                username: info.username,
                email: info.email,
                phone:info.phone,
                address: info.address,
                userType: info.userType,
            })
        }
    }

    const handleClickUpdateStaff = () => {
        if(!info.fullName || !info.email || !info.phone || !info.address) {
            return
        } else {
            postUpdateStaff(info)
                .then(res => {
                    toastSuccess('Thông tin được cập nhật thành công');
                    setIsEdit(true)
                })
                .catch(err => {
                    toastFail('Đã có lỗi xảy ra !');
                    setIsEdit(false)
                })
        }
    }

    React.useEffect(() => {
        if(!info.fullName || !info.email || !info.phone || !info.address) {
            setHasErr(true)
        } else {
            setHasErr(false)
        }
    },[info])



    //Sign out
    const history = useHistory();
    const signOut = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('company');
        localStorage.removeItem('id');
        localStorage.removeItem('userType')
        localStorage.removeItem('fullName')
        localStorage.removeItem('roleId')
        history.push('/');
        window.location.reload();
    };
    return (
        <div>
            <div>
                <div className="card__list-test">
                    <div className="card__header">
                        <h3>Thông tin tài khoản</h3>
                    </div>
                    <div>
                    <Box sx={{ paddingTop: '20px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={5}>
                        <InputFlexComponent
                            disabled={isEdit}
                            title="Họ và tên"
                            name="full_name"
                            handleChangeText={handleChangeUpdateStaff}
                            value={info.fullName ?? ''}
                            error={info.fullName === '' ? true : false}
                        />
                        <InputFlexComponent
                            type={isEdit === true ? "text" : "date"}
                            disabled={isEdit}
                            title="Ngày sinh"
                            name="birthday"
                            handleChangeText={handleChangeUpdateStaff}
                            value={isEdit === true && info.birthDay  ? convertDateToLocal(info.birthDay) : info.birthDay ?? ''}
                        />
                        <InputFlexComponent
                            disabled={isEdit}
                            type='email'
                            title="Email"
                            name="email"
                            handleChangeText={handleChangeUpdateStaff}
                            value={info.email ?? ''}
                            error={info.email === '' ? true : false}
                        />
                        <InputFlexComponent
                            disabled={isEdit}
                            type='number'
                            title="Số điện thoại"
                            name="phone"
                            handleChangeText={handleChangeUpdateStaff}
                            error={info.phone === '' ? true : false}
                            value={info.phone ?? ''}
                        />
                        <InputFlexComponent
                            disabled={isEdit}
                            type='text'
                            title="Địa chỉ"
                            name="address"
                            handleChangeText={handleChangeUpdateStaff}
                            value={info.address ?? ''}
                            error={info.address === '' ? true : false}
                        />
                        <SelectFieldFlex
                            isDisable={true}
                            title="Vai trò"
                            data={dataStatusStaffIcon}
                            handleOnChange={handleChangeUpdateStaff}
                            defaultValue={info.userType || ''}
                            name='user_type'
                        />
                        <Grid container>
                            <Grid item xs={7} style={{ textAlign: 'right' }}>
                                {isEdit && isEdit === true ? 
                                (<Button className='button-update-user' sx={{marginTop: '20px'}} onClick={()=> setIsEdit(false)}>
                                    Chỉnh sửa
                                </Button>) : 
                                (<>
                                    <Button className='button-save-update' disabled={hasErr} sx={{margin: '20px 20px 0 0'}} onClick={handleClickUpdateStaff}>
                                        lưu
                                    </Button>
                                    <Button 
                                        className='button-update-user' 
                                        sx={{marginTop: '20px'}} 
                                        onClick={() => {renderDefaultValue(); setIsEdit(true)}}>
                                        Hủy
                                    </Button>
                                </>)}
                            </Grid>
                            <Grid item xs={5} style={{ textAlign: 'center' }}>
                                <Button className='button-save-update' sx={{marginTop: '20px'}} onClick={() => {setShow(true)}} >Đổi mật khẩu</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={5}>
                        <div className="my-1 mx-auto avatar-user"></div>
                        <div className="text-center">
                            <button className="button-user">
                                Chọn ảnh
                            </button>
                        </div>
                    </Grid>
                    <Grid item xs={1}></Grid>
                </Grid>
                
            </Box>
                    </div>
                </div>
            </div>
            {/* MODAL CHANGE PASS */}
            <DialogChangePass
                show={show}
                password={password}
                setPassword={setPassword}
                postChangePass={postChangePass}
                toggleModalChangePass={toggleModalChangePass}
                handleChangePassword={handleChangePassword}
                errorPassword={errorPassword}
                errMessage={errMessage }
            />
        </div>
    );
}
