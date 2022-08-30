import { Box, Grid } from '@mui/material';
import * as React from 'react';
import './styles.scss';


export default function TextFieldInfor(props) {
    const {title, value, disabled} = props;
  return (
    <Grid container spacing={2} className='text-field-infor'>
        <Grid item xs={3}>
            <Box className='text-field-title'>
                {title ? title : ''}
            </Box>
        </Grid>
        <Grid item xs={9}>
            <Box className='text-field-value'>
                <div>
                    {value? value : ''}
                </div>
            </Box>
        </Grid>
    </Grid>
  )
}
