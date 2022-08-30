import { Box, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useState } from 'react';
import {
    convertDateToApi,
    convertDateToLocal,
} from '../../../constants/shared';
import TextFieldCustom from '../../../helper/TextFieldCustom';
import CardHeader from './CardHeader';

export default function TestWithUser(props) {
    const { staffInfo } = props;
    const [userInfor, setUserInfor] = useState({});
    useEffect(() => {
        if (staffInfo) {
            setUserInfor(staffInfo);
        }
    }, [staffInfo]);
    return (
        <>
            <CardHeader
                icon="/icon/User-profile.svg"
                title="Danh sách bài Test"
            />
            <Box sx={{ paddingTop: '20px' }}>
                No Data !
            </Box>
        </>
    );
}
