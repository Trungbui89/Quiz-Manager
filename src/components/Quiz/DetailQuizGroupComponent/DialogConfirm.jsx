import { Box, Dialog, DialogContent, Grid } from '@material-ui/core';
import { Button } from '@mui/material';
import React from 'react';

function DialogConfirm(props) {
    const { open, handleClose, postDeleteGroupQuiz } = props;
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogContent>
                <Box className='box_confirm_dialog'>
                    <div className="confirm_icon">
                        <span>?</span>
                    </div>
                    <div className='title_confirm_dialog'>Bạn có chắc muốn xóa bài kiểm tra này không?</div>
                </Box>
                <Box style={{padding:'0 0 20px 0'}}>
                    <Grid container spacing={2}>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={5} style={{textAlign: 'right'}}>
                            <Button onClick={() => {postDeleteGroupQuiz(); handleClose()}} className='button-save-update'>Xác nhận</Button>
                        </Grid>
                        <Grid item xs={5} style={{textAlign: 'left'}}>
                            <Button onClick={handleClose} className='button-update-user'>Hủy bỏ</Button>
                        </Grid>
                        <Grid item xs={1}></Grid>
                    </Grid>
                </Box>
            </DialogContent>
        </Dialog>
    );
}

export default DialogConfirm;
