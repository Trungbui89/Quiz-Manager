import { Box, Icon, Typography } from '@mui/material';
import React from 'react';

export default function CardHeader(props) {
    const { icon, title } = props;
    return (
        <Box sx={styles.cardHeader}>
            <Icon>
                <img src={icon} alt="icon" weight='25' height="25" />
            </Icon>
            <Typography sx={styles.title}>{title}</Typography>
        </Box>
    );
}

const styles = {
    cardHeader: {
        width: '100%',
        height: '40px',
        textAlign: 'left',
        backgroundColor: '#DAEBF7',
        display: 'flex',
        paddingLeft: '20px',
        marginTop: '30px',
        borderBottom: '1px solid #000'
    },
    title: {
        fontSize: '20px',
        paddingTop: '3px',
        paddingLeft: '10px',
        fontFamily: 'Quicksand',
    },
};
