import React from 'react';
import {
    Dialog, DialogTitle as MuiDialogTitle, DialogActions,DialogContent ,
    Button, Typography , IconButton
} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { Close as CloseIcon } from '@material-ui/icons';

import useStyles from './styles';
import { TextField } from '@mui/material';

const DialogTitle = (props) => {
    const { title, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography className={classes.titleStyle}>{title}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
};

const DialogCustom = (props) => {
    const {openDialog, closeDialog, dialogTitle, handleChange, value, titleInput } = props;
    const classes = useStyles();
  
    return (
        <Dialog
            onClose={closeDialog}
            aria-labelledby="customized-dialog-title"
            open={openDialog}
            fullWidth
        >
            <DialogTitle id="customized-dialog-title"
                onClose={closeDialog} title={dialogTitle}
                classes={classes}
            />
            <DialogContent>
                <Typography>{titleInput}</Typography>
                <TextField variant="outlined" value={value} onChange={(e) => handleChange(e.target.value)} />
                <Button>Lưu</Button>
            </DialogContent>
        </Dialog>
    );
};
export default DialogCustom;
