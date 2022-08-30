import { Box, Button, Dialog, DialogContent, DialogContentText, SvgIcon } from '@mui/material';
import React from 'react';
import HelpIcon from '@mui/icons-material/Help';

export default function DialogConfirmDelete(props) {

    const {openConfirm, setOpenConfirm, handleClickDeleteSingle, listQuestionDelete, handleClickDeleteMulti} = props;


    const handleClose = () => {
        setOpenConfirm({...openConfirm, open: false});
    };
    
    return (
        <div>
            <Dialog
                open={openConfirm.open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Box sx={{margin: 'auto',textAlign: 'center', width: 70, height:70 }}>
                            <SvgIcon fontSize='large' color='error'>
                                <HelpIcon />
                            </SvgIcon>
                        </Box>
                        Bạn có chắc muốn xóa {listQuestionDelete.length > 0 ? listQuestionDelete.length : null} câu nỏi này ?
                    </DialogContentText>
                    <Box sx={{textAlign: 'center'}}>
                        <Button className='button-save-update' sx={{margin: '20px 20px 0 0'}} onClick={openConfirm.type === 'multi' ? handleClickDeleteMulti : handleClickDeleteSingle}>
                            Xác nhận
                        </Button>
                        <Button 
                            className='button-update-user' 
                            sx={{marginTop: '20px'}} 
                            onClick={handleClose}>
                            Hủy
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </div>
    );
}
