import { Modal } from 'react-bootstrap';
import React from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import { Box, Button, IconButton } from '@mui/material';
import InputSearchComponent from '../../../helper/InputSearchComponent';

export default function DialogChangePass(props) {
    const {password, setPassword, toggleModalChangePass, show, handleChangePassword, errMessage, errorPassword, postChangePass, validateForm} = props;

    

    return (
        <Modal centered show={show} onHide={toggleModalChangePass}>
            <Modal.Header>
                <b className="change-password">Đổi mật khẩu</b>
                <IconButton onClick={toggleModalChangePass} className="btn">
                    <ClearIcon />
                </IconButton>
            </Modal.Header>
            <Modal.Body>
                <Box sx={{padding:'5px'}}>
                    <InputSearchComponent
                        type='password'
                        title='Mật khẩu cũ'
                        value={password.oldPass}
                        handleChangeText={handleChangePassword}
                        name='oldPass'
                    />
                </Box>
                <Box sx={{padding:'5px'}}>
                    <InputSearchComponent
                        type='password' 
                        title='Mật khẩu mới'
                        value={password.newPass}
                        handleChangeText={handleChangePassword}
                        name='newPass'
                        error={errorPassword}
                        errMessage={errMessage}
                    />
                </Box>
                <Box sx={{padding:'5px'}}>
                    <InputSearchComponent
                        type='password'
                        title='Nhập lại mật khẩu mới' 
                        value={password.reNewPass}
                        handleChangeText={handleChangePassword}
                        name='reNewPass'
                        error={password.newPass === password.reNewPass ? false : true}
                        errMessage={password.newPass === password.reNewPass ? '' : 'Mật khẩu không trùng khớp'}
                    />
                </Box>
                    <div className="row pt-3">
                        <div className="col-9"></div>
                        <Button disabled={errorPassword === true ? true : false} onClick={validateForm ? validateForm : postChangePass} className="col-2 button-save-update px-4">
                            Lưu
                        </Button>
                    </div>
                {/* </form> */}
            </Modal.Body>
        </Modal>
    );
}
