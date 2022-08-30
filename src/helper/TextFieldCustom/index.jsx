import React from 'react';
import { TextField, FormHelperText } from '@material-ui/core';
import useStyles from './styles';
import { Box, Grid, Typography } from '@mui/material';

const TextFieldCustom = (props) => {
    const {
        type,
        fullWidth,
        required,
        disabled,
        defaultValue,
        value,
        placeholder,
        title,
        onChange,
        helpText,
        inputProps
    } = props;
    const classes = useStyles();

    return (
        <Box sx={styles.boxInputText}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Typography className="input-title" sx={disabled === true ? styles.titleDisabled : styles.title}>{title}</Typography>
                </Grid>
                <Grid item xs={8}>
                    <TextField
                        // error={helpText !== '' && helpText !== false}
                        type={type}
                        fullWidth={fullWidth}
                        required={required}
                        disabled={disabled}
                        className={classes.contentInput}
                        defaultValue={defaultValue}
                        value={value}
                        placeholder={placeholder}
                        variant="outlined"
                        onChange={onChange}
                        inputProps={inputProps}
                    />
                    <FormHelperText
                        className={classes.textErrorForm}
                    >
                        {helpText??helpText}
                    </FormHelperText>
                </Grid>
            </Grid>
        </Box>
    );
};

const styles = {
    boxInputText: {
        // flexGrow: 1,
        paddingTop:'15px',
        width: '95%',
        margin: 'auto'
    },
    title: {
        fontFamily: '"Quicksand", sans-serif!important',
        fontSize: '16px',
        paddingTop: '10px',
        fontWeight: 'bold',
        textAlign: 'right'
    },
    titleDisabled: {
        fontFamily: '"Quicksand", sans-serif!important',
        fontSize: '16px',
        paddingTop: '10px',
        fontWeight: 'bold',
        textAlign: 'right',
        color:'#C0C0C0'
    },
};

export default TextFieldCustom;
