import { Grid } from '@mui/material';
import { DatePicker, Typography } from 'antd';
import moment from 'moment';
import React from 'react';
import './styles.scss'

const DatePickerFlexComponent = (props) => {
    const { onChange, title, format, value, defaultValue, name, disabled, placeholder } = props;
    return (
        <div className='box-date-picker'>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Typography className='title-input-inline'>{title ?? ''}</Typography>
                </Grid>
                <Grid item xs={8}>
                    <Grid style={{ display: 'flex', paddingTop:10 }} className='container-inline'>
                        <DatePicker 
                            onChange={onChange ? (date) => onChange(name, date) : null}
                            format={format ? format : 'DD/MM/YYYY'}
                            value={value}
                            defaultValue={defaultValue ? moment(defaultValue) : null}
                            style={{width:'100%', border:'1px solid #C0C0C0', height:'35px', borderRadius:'4px'}}
                            disabled={disabled}
                            placeholder={placeholder}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

export default DatePickerFlexComponent;
