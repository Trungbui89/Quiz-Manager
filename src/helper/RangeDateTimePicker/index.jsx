/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { TextField, FormHelperText } from '@material-ui/core';
import { Box, Grid, Typography } from '@mui/material';
import { DatePicker, Space } from 'antd';
import moment from 'moment';
import { convertDateStringLocalToISOUTC } from '../../constants/shared'

const RangeDateTimePicker = (props) => {
    const {
        type,
        fullWidth,
        required,
        defaultValue,
        valueFrom,
        valueTo,
        placeholder,
        title,
        handleChangeCreateQuiz,
        nameFrom, nameTo,
        nameTime
    } = props;
    const { RangePicker } = DatePicker;
    const [values, setValues] = React.useState(['',''])

    const range = (start, end) => {
        const result = [];

        for (let i = start; i < end; i++) {
            result.push(i);
        }

        return result;
    }; // eslint-disable-next-line arrow-body-style

    const disabledDate = (current) => {
        // Can not select days before today and today
        return current && current < moment().startOf('day');
    };

    //disable range time
    // const disabledRangeTime = (_, type) => {
    //     if (type === 'start') {
    //         return {
    //             disabledHours: () => range(0, 60),
    //             disabledMinutes: () => range(30, 60),
    //             disabledSeconds: () => [55, 56],
    //         };
    //     }

    //     return {
    //         disabledHours: () => range(0, 60),
    //         disabledMinutes: () => range(0, 31),
    //         disabledSeconds: () => [55, 56],
    //     };
    // };

    const handleChangeRangeDate = (value) => {
        setValues(value)
        handleChangeCreateQuiz(nameTime,value)
    }

    return (
        <Box sx={styles.boxInputText}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Typography className="input-title" sx={styles.title}>
                        {title}
                    </Typography>
                </Grid>
                <Grid item xs={8}>
                    <RangePicker
                        disabledDate={disabledDate}
                        showTime={{
                            hideDisabledOptions: true,
                            defaultValue: [
                                moment('00:00', 'HH:mm'),
                                moment('00:00', 'HH:mm'),
                            ],
                        }}
                        format="DD/MM/YYYY HH:mm"
                        onChange={handleChangeRangeDate}
                        style={{padding:'18px 14px', width:'100%', borderRadius:'4px'}}
                        placeholder={['Thời gian mở', 'Thời gian đóng']}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

const styles = {
    boxInputText: {
        // flexGrow: 1,
        paddingTop: '15px',
        width: '95%',
        margin: 'auto',
    },
    title: {
        fontFamily: '"Quicksand", sans-serif!important',
        fontSize: '16px',
        paddingTop: '10px',
        fontWeight: 'bold',
        textAlign: 'right',
    },
};

export default RangeDateTimePicker;
