import { Grid, TextField, Typography } from '@material-ui/core';
import React from 'react';
import './styles.scss'

function TextAreaComponent(props) {
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
        value, maxRows, minRows,
        name, error, errMessage, disabled, inputProps
    } = props;

    const [textSearch, setTextSearch] = React.useState('');
    React.useEffect(() => {
        setTextSearch(value);
    }, [value]);


    return (
        <>
            <Typography className='title-input-area'>{title ?? ''}</Typography>
            <Grid style={{ display: 'flex', paddingTop:10 }} className='container-area'>
                <TextField
                    onBlur={(val) => {
                        onBlur && onBlur(val);
                    }}
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    className='container-area'
                    onChange={handleChangeText ? (e) => handleChangeText(name, e.target.value) : null}
                    value={textSearch}
                    variant="outlined"
                    error={error}
                    helperText={error === true ? errMessage : ''}
                    disabled={disabled}
                    inputProps={inputProps}
                    minRows={minRows}
                    maxRows={maxRows}
                    multiline={true}
                />
            </Grid>
        </>
    );
}

export default TextAreaComponent;
