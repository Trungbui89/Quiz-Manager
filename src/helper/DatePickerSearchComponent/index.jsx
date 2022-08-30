import { Box, Grid , Typography} from '@mui/material';
import { DatePicker } from 'antd';
import moment from 'moment';
import React from 'react';
import './styles.scss'

const DatePickerSearchComponent = (props) => {
    const { onChange, title, format, value, defaultValue, name, disabled, placeholder } = props;
    return (
        <>
            <Typography className='title-input'>{title ?? ''}</Typography>
            <Box style={{ display: 'flex', padding: '11px 9px 0 0' }}>
                <DatePicker 
                    onChange={onChange ? (date) => onChange(name, date) : null}
                    format={format ? format : 'DD/MM/YYYY'}
                    value={value}
                    defaultValue={defaultValue ? moment(defaultValue) : null}
                    style={{width:'100%', border:'1px solid #C0C0C0', height:'31px', borderRadius:'4px'}}
                    disabled={disabled}
                    placeholder={placeholder}
                />
            </Box>
        </>
    );
};

export default DatePickerSearchComponent;
