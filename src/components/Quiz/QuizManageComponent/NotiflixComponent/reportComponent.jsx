import React from 'react'
// import Button from '@mui/material/Button';
// import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import { alpha, styled } from '@mui/material/styles';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function NotiflixReport(props) {

    const { open, handleWarningModal, warningValue } = props
    const {icon, message} = warningValue

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleWarningModal}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle style={styles.title}>
                <img src={icon} alt='' />
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description" sx={styles.text}>
                    {message}
                </DialogContentText>
            </DialogContent>
        </Dialog>
    )
}

const styles = {
    title: {
        display: 'flex',
        justifyContent: 'center',
        margin: '1rem'
    },
    text: {
        fontSize: '1.5rem',
        fontFamily: 'Quicksand, sans-serif',
        fontWeight: 'bold',
        padding: '0 7rem 2rem',
        textAlign: 'center'
    }
}