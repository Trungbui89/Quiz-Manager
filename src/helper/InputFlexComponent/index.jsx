import React, { useState, useEffect } from 'react';
import {
    Grid,
    TextField,
    Typography,
} from '@material-ui/core';
import './styles.scss';
import { Input } from 'antd';

const InputFlexComponent = (props) => {
    const {
        disabled,
        title,
        placeholder,
        handleChangeText,
        defaultValue,
        value, type,
        name, error, errMessage,
        inputProps, required=false, maxLength
    } = props;

    const [textSearch, setTextSearch] = useState('');
    useEffect(() => {
        setTextSearch(value);
    }, [value]);

    const HelperText = (props) => {
        const {subtext} = props
        return(
            <>
                <div style={{ fontSize:'12px', marginTop:'2px'}}>{subtext}</div>
            </>
        )
    }

    return (
        <Grid container spacing={2} style={{padding: '8px 0'}}>
            <Grid item xs={4}>
                <Typography className='title-input-inline'>{`${title ?? ''} ${required === true ? '*' : ''}`}</Typography>
            </Grid>
            <Grid item xs={8}>
                <Grid style={{ display: 'flex',flexDirection: 'column', paddingTop:10 }} className='container-inline'>
                    {type === 'password' ?
                        <Input.Password 
                            disabled={disabled}
                            type={type ?? ''}
                            defaultValue={defaultValue}
                            placeholder={placeholder}
                            className='container'
                            onChange={handleChangeText ? (e) => handleChangeText(name, e.target.value) : null}
                            value={textSearch}
                            inputProps={inputProps}
                            style={{height: '35px', borderRadius: '4px'}}
                            maxLength={maxLength}
                            status={error === true ? 'error' : ''}
                        />
                        :
                        <Input
                            disabled={disabled}
                            type={type ?? ''}
                            defaultValue={defaultValue}
                            placeholder={placeholder}
                            className='container'
                            onChange={handleChangeText ? (e) => handleChangeText(name, e.target.value) : null}
                            value={textSearch}
                            inputProps={inputProps}
                            style={{height: '35px', borderRadius: '4px'}}
                            maxLength={maxLength}
                            status={error === true ? 'error' : ''}
                        />
                    }
                    {error === true ? <HelperText subtext={errMessage} /> : ''}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default InputFlexComponent;
