import { Box } from '@material-ui/core';
import { Grid, Typography, FormHelperText } from '@mui/material';
import React from 'react';
import Select from 'react-select';

export default function SelectCreate(props) {
    const {isDisable, defaultValue, handleOnChange, name, data, control, placeholder, title, helpText} = props;
    const valueOptions =data.filter(option => option.value === defaultValue || option.value === defaultValue?.value);
    return (
        <Box className='box-select'>
            <Grid container>
                <Grid item xs={6}>
                    <div className="select-title">{title}</div>
                </Grid>
                <Grid item xs={6} className='select-field'>
                    <Select
                        // error={helpText !== '' && helpText !== false}
                        fullWidth
                        isDisabled={isDisable}
                        defaultValue={defaultValue || undefined}
                        value={defaultValue?.value ? defaultValue : valueOptions}
                        onChange={
                            handleOnChange ? (val) => handleOnChange(name, val) : null
                        }
                        options={data}
                        classNamePrefix="select"
                        autosize
                        menuShouldBlockScroll
                        menuPosition="fixed"
                        maxMenuHeight={190}
                        noOptionsMessage={() => 'Không tìm thấy kết quả'}
                        placeholder={placeholder}
                        name={name}
                        control={control}
                        className='select-field'
                        styles={customStyles}
                    />
                    <FormHelperText
                        style={{        
                            color: '#F64E60',
                            fontSize: 12,
                            margin: 0,
                        }}
                    >
                        {helpText??helpText}
                    </FormHelperText>
                </Grid>
            </Grid>
        </Box>
    );
}

const customStyles = { 
    control: (provided) => ({
        ...provided,
        padding: '8px'
    }),
}
