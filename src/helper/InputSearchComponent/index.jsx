import React, { useState, useEffect } from 'react';
import {
    Grid,
    TextField,
    Typography,
} from '@material-ui/core';
import './styles.scss';
import { Box } from '@mui/material';

const InputSearchComponent = (props) => {
    const {
        handleSearch,
        title,
        placeholder,
        onChangeSearch,
        setWordSearch,
        handleChangeText,
        isSetOutSite,
        onBlur,
        defaultValue,
        value, type,
        name,error, errMessage,
        disabled,
        inputProps, required
    } = props;

    const [textSearch, setTextSearch] = useState('');
    useEffect(() => {
        setTextSearch(value);
    }, [value]);



    return (
        <>
            <Typography className='title-input'>{title ?? ''} {required ? '*' : ''}</Typography>
            <Box style={{ display: 'flex', padding: '10px 9px 0 0' }}>
                <TextField
                    type={type ?? ''}
                    sx={{ color: 'text.primary' }}
                    onBlur={(val) => {
                        onBlur && onBlur(val);
                    }}
                    variant="outlined"
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    className='container'
                    onChange={handleChangeText ? (e) => handleChangeText(name, e.target.value) : null}
                    value={textSearch}
                    InputProps={{
                        className: 'search',
                    }}
                    error={error}
                    helperText={error === true ? errMessage : ''}
                    disabled={disabled}
                    inputProps={inputProps}
                />
            </Box>
        </>
    );
};

export default InputSearchComponent;
