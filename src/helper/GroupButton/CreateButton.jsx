import { Button, IconButton } from '@mui/material';
import React from 'react';

function CreateButton(props) {
    const { onClick, title, iconPath, color } = props;
    return (
        <Button onClick={onClick} sx={styles.buttonQuestion}>
            <IconButton sx={{ color: color ?? '', padding: '5px' }}>
                <img src={iconPath ?? ''} alt={title ?? ''} />
            </IconButton>
            {title ?? ''}
        </Button>
    );
}
const styles = {
    buttonQuestion: {
        fontFamily: 'Quicksand',
        textTransform: 'capitalize',
        color: '#000',
        textAlign: 'left',
        marginRight: '15px'
    },
};

export default CreateButton;
