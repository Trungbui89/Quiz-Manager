import { Box, Button } from '@mui/material';
import React from 'react';

function SearchButton(props) {
    const { title, onClick, quizListStyle, searchQuizBarStyle, createQuizStyle, disabled } = props;
    const mergeStyle = {...styles.button, ...quizListStyle, ...searchQuizBarStyle, ...createQuizStyle}
    return (
        <Box sx={styles.groupButton}>
            <Button sx={mergeStyle} variant="contained" disabled={disabled} onClick={onClick ? onClick : null}>
                {title ?? ''}
            </Button>
        </Box>
    )
}
const styles = {
    button:{
        backgroundColor: '#161E54',
        fontSize: '16px',
        textTransform: 'capitalize',
        padding:'2px 8px 2px 8px',
    },
    groupButton: {
        paddingTop: '30px'
    }
}

export default SearchButton;
